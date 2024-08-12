import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { zipCodeToClimateZoneAtom } from "../app-state/outputs/climatezone-state";

export const useLoadZipCodeToClimateZone = () => {
  const setZipCodeToClimateZone = useSetAtom(zipCodeToClimateZoneAtom);

  useEffect(() => {
    const loadZipCodeToClimateZone = async () => {
      try {
        const response = await fetch("/data/zip-to-climatezone.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setZipCodeToClimateZone(data);
      } catch (error) {
        console.error("Failed to load zip code to climate zone data:", error);
      }
    };

    loadZipCodeToClimateZone();
  }, [setZipCodeToClimateZone]);
};
