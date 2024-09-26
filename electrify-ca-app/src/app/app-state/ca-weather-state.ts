import { atom } from "jotai";
import { zipCodeAtom } from "../app-state/inputs/input-state";
import { fetchJSON } from "../fetch";
import { BinnedTemperatures, JSONBackedHourlyWeatherSource, WeatherSource } from "../../lib/weather";
import { asyncAtomOrNull } from "./utils";
import { metersToFeet } from "../../lib/units";

interface LocationInfo {
  zipCode: string;
  placeName: string;
  stateCode: string;
  utility: string;
}

export interface WeatherInfo {
  timezoneName: string;
  elevationMeters: number;
  weatherSource: WeatherSource;
  binnedTemperatures: BinnedTemperatures;
}

type ZipCodesJson = { [zipCode: string]: LocationInfo };

const usZipCodesJsonAtom = asyncAtomOrNull<ZipCodesJson>(
  async (get, { signal }) => {
    return await fetchJSON<ZipCodesJson>("/data/us-zip-codes.json", { signal });
  }
);

export const simplePlaceNameAtom = atom<string | null>((get) => {
  const locationInfo = get(locationInfoAtom);
  if (locationInfo == null) {
    return null;
  }

  // Replace parentheticals to present a simpler place name TOOD(jlfwong):
  // Consider doing this change in the postal codes JSON.
  return locationInfo.placeName.replace(/\([^)]*\)/g, "");
});

export const locationInfoAtom = atom<LocationInfo | null>((get) => {
  const zipCode = get(zipCodeAtom);
  console.log(`locationInfoAtom: Retrieved zipCode: ${zipCode}`);
  const usZipCodesJson = get(usZipCodesJsonAtom);

  if (!zipCode || !usZipCodesJson || !/^\d{5}(-\d{4})?$/.exec(zipCode)) {
    return null;
  }

  const locationInfo = usZipCodesJson[zipCode] || null;
  console.log(`locationInfoAtom: Retrieved locationInfo: ${JSON.stringify(locationInfo)}`);
  return locationInfo;
});

export const weatherInfoAtom = asyncAtomOrNull<WeatherInfo>(
  async (get, { signal }) => {
    const locationInfo = get(locationInfoAtom);

    if (!locationInfo) {
      return null;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${locationInfo.zipCode},us&appid=${apiKey}`;

    try {
      console.log(`ZIP Code: ${locationInfo.zipCode}`);
      console.log(`Fetching weather data from URL: ${url}`);

      const json = await fetchJSON<any>(url, { signal });

      if (json.cod !== 200) {
        throw new Error(`Error fetching initial weather data: ${json.message}`);
      }

      console.log("Full API Response (Initial):", json);

      const latitude = json.coord.lat;
      const longitude = json.coord.lon;

      // Mock data for detailed weather response
      const mockedDetailedWeatherData = {
        hourly: Array.from({ length: 24 }, (_, i) => ({
          dt: Date.now() / 1000 + i * 3600,
          temp: 293.15 + Math.sin((i / 24) * Math.PI * 2) * 10,
          weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
        })),
        daily: Array.from({ length: 7 }, (_, i) => ({
          dt: Date.now() / 1000 + i * 86400,
          temp: {
            day: 293.15 + Math.sin((i / 7) * Math.PI * 2) * 10,
            min: 283.15,
            max: 303.15,
          },
          weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
        })),
      };

      console.log("Using mocked detailed weather data:", mockedDetailedWeatherData);

      const timezoneOffsetInSeconds = json.timezone;

      const weatherSource = new JSONBackedHourlyWeatherSource(mockedDetailedWeatherData.hourly);
      const binnedTemperatures = new BinnedTemperatures(mockedDetailedWeatherData.daily);

      return {
        timezoneName: `UTC${timezoneOffsetInSeconds / 3600}`, // Convert seconds to hours for timezone
        elevationMeters: json.main.elevation || 0, // Elevation is not provided, placeholder value
        weatherSource: weatherSource,
        binnedTemperatures: binnedTemperatures,
      };
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw new Error("Unable to fetch weather data. Please check the API key and permissions.");
    }
  }
);

export const elevationFeetAtom = atom<number | null>((get) => {
  const weatherInfo = get(weatherInfoAtom);
  if (weatherInfo == null) return null;
  return metersToFeet(weatherInfo.elevationMeters);
});
