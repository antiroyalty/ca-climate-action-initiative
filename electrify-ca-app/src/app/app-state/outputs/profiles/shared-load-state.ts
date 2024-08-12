import { atom } from "jotai";

// Primary
import { 
  seasonAtom,
  housingAtom,
  solarEnabledAtom,
  storageEnabledAtom,
  heatpumpEnabledAtom,
  stoveEnabledAtom,
  electrifiedHouseholdEnabledAtom
} from "../../inputs/input-state"

// Derived
import { climateZoneAtom } from "../climatezone-state";

import { baseLoadProfile } from "./base-load-state";
import { solarLoadProfile } from "./solar-load-state";
import { storageLoadProfile } from "./storage-load-state";
import { heatpumpLoadProfile } from "./heatpump-load-state";
import { stoveLoadProfile } from "./stove-state";

const load_profiles_mapping = {
  base: baseLoadProfile,
  solar: solarLoadProfile,
  storage: storageLoadProfile,
  heatpump: heatpumpLoadProfile,
  stove: stoveLoadProfile,
};

// used to be reduceLoadProfile
export const loadToPriceCategories = (loadProfile: number[], peakHours: number[], partPeakHours: number[], offPeakHours: number[]): { peakLoad: number, partPeakLoad: number, offPeakLoad: number } => {
  let peakLoad = 0;
  let partPeakLoad = 0;
  let offPeakLoad = 0;

  for (let hour in loadProfile) {
    const hourInt = parseInt(hour);
    if (peakHours.includes(hourInt)) {
      peakLoad += loadProfile[hourInt];
    } else if (partPeakHours.includes(hourInt)) {
      partPeakLoad += loadProfile[hourInt];
    } else if (offPeakHours.includes(hourInt)) {
      offPeakLoad += loadProfile[hourInt];
    }
  }

  console.log(`Load Profile Analysis - Peak: ${peakLoad}, Part-Peak: ${partPeakLoad}, Off-Peak: ${offPeakLoad}`);
  return { peakLoad, partPeakLoad, offPeakLoad };
};

export const getLoadProfileAtom = (type: string) => atom((get) => {
  const climateZone = get(climateZoneAtom).toLowerCase();
  const season = get(seasonAtom).toLowerCase();
  const housing = get(housingAtom).toLowerCase();
  
  return load_profiles_mapping[type][housing][climateZone][season];
});

export const getCumulativeLoadProfileAtom = atom((get) => {
  console.log("Calling cumulative load profile atom");
  const climateZone = get(climateZoneAtom).toLowerCase();
  const season = get(seasonAtom).toLowerCase();
  const housing = get(housingAtom).toLowerCase();

  const isElectrifiedHouseholdEnabled = get(storageEnabledAtom);
  const isSolarEnabled = get(solarEnabledAtom);
  const isHeatPumpEnabled = get(heatpumpEnabledAtom);
  const isStorageEnabled = get(storageEnabledAtom);
  const isStoveEnabled = get(stoveEnabledAtom);

  const baseProfile = load_profiles_mapping["base"][housing][climateZone][season];
  let cumulativeLoadProfile = [...baseProfile];

  if (isSolarEnabled) {
    console.log("Solar is enabled")
    const solarProfile = load_profiles_mapping["solar"][housing][climateZone][season];
    for (let i = 0; i < cumulativeLoadProfile.length; i++) {
      cumulativeLoadProfile[i] += solarProfile[i];
    }
  }

  if (isStorageEnabled) {
    const storageProfile = load_profiles_mapping["storage"][housing][climateZone][season];
    for (let i = 0; i < cumulativeLoadProfile.length; i++) {
      cumulativeLoadProfile[i] += storageProfile[i];
    }
  }

  if (isHeatPumpEnabled) {
    const heatpumpProfile = load_profiles_mapping["heatpump"][housing][climateZone][season];
    for (let i = 0; i < cumulativeLoadProfile.length; i++) {
      cumulativeLoadProfile[i] += heatpumpProfile[i];
    }
  }

  if (isStoveEnabled) {
    const stoveProfile = load_profiles_mapping["stove"][housing][climateZone][season];
    for (let i = 0; i < cumulativeLoadProfile.length; i++) {
      cumulativeLoadProfile[i] += stoveProfile[i];
    }
  }

  return cumulativeLoadProfile;
});

// TODO: Ana - combine these into one function with less duplication
export const cumulativeLoadProfileSummerAtom = atom((get) => {
  const climateZone = get(climateZoneAtom).toLowerCase();
  const housing = get(housingAtom).toLowerCase();

  const isElectrifiedHouseholdEnabled = get(storageEnabledAtom);
  const isSolarEnabled = get(solarEnabledAtom);
  const isHeatPumpEnabled = get(heatpumpEnabledAtom);
  const isStorageEnabled = get(storageEnabledAtom);
  const isStoveEnabled = get(stoveEnabledAtom);

  // Summer
  const baseProfileSummer = load_profiles_mapping["base"][housing][climateZone]["summer"];
  let cumulativeLoadProfileSummer = [...baseProfileSummer];

  if (isSolarEnabled) {
    const solarProfile = load_profiles_mapping["solar"][housing][climateZone]["summer"];
    for (let i = 0; i < cumulativeLoadProfileSummer.length; i++) {
      cumulativeLoadProfileSummer[i] += solarProfile[i];
    }
  }

  if (isStorageEnabled) {
    const storageProfile = load_profiles_mapping["storage"][housing][climateZone]["summer"];
    for (let i = 0; i < cumulativeLoadProfileSummer.length; i++) {
      cumulativeLoadProfileSummer[i] += storageProfile[i];
    }
  }

  if (isHeatPumpEnabled) {
    const heatpumpProfile = load_profiles_mapping["heatpump"][housing][climateZone]["summer"];
    for (let i = 0; i < cumulativeLoadProfileSummer.length; i++) {
      cumulativeLoadProfileSummer[i] += heatpumpProfile[i];
    }
  }

  if (isStoveEnabled) {
    const stoveProfile = load_profiles_mapping["stove"][housing][climateZone]["summer"];
    for (let i = 0; i < cumulativeLoadProfileSummer.length; i++) {
      cumulativeLoadProfileSummer[i] += stoveProfile[i];
    }
  }

  console.log(cumulativeLoadProfileSummer);

  return cumulativeLoadProfileSummer;
});

export const cumulativeLoadProfileWinterAtom = atom((get) => {
  const climateZone = get(climateZoneAtom).toLowerCase();
  const housing = get(housingAtom).toLowerCase();

  const isElectrifiedHouseholdEnabled = get(storageEnabledAtom);
  const isSolarEnabled = get(solarEnabledAtom);
  const isHeatPumpEnabled = get(heatpumpEnabledAtom);
  const isStorageEnabled = get(storageEnabledAtom);
  const isStoveEnabled = get(stoveEnabledAtom);

  // Summer
  const baseProfileWinter = load_profiles_mapping["base"][housing][climateZone]["winter"];
  let cumulativeLoadProfileWinter = [...baseProfileWinter];

  if (isSolarEnabled) {
    const solarProfile = load_profiles_mapping["solar"][housing][climateZone]["winter"];
    for (let i = 0; i < cumulativeLoadProfileWinter.length; i++) {
      cumulativeLoadProfileWinter[i] += solarProfile[i];
    }
  }

  if (isStorageEnabled) {
    const storageProfile = load_profiles_mapping["storage"][housing][climateZone]["winter"];
    for (let i = 0; i < cumulativeLoadProfileWinter.length; i++) {
      cumulativeLoadProfileWinter[i] += storageProfile[i];
    }
  }

  if (isHeatPumpEnabled) {
    const heatpumpProfile = load_profiles_mapping["heatpump"][housing][climateZone]["summer"];
    for (let i = 0; i < cumulativeLoadProfileWinter.length; i++) {
      cumulativeLoadProfileWinter[i] += heatpumpProfile[i];
    }
  }

  if (isStoveEnabled) {
    const stoveProfile = load_profiles_mapping["stove"][housing][climateZone]["winter"];
    for (let i = 0; i < cumulativeLoadProfileWinter.length; i++) {
      cumulativeLoadProfileWinter[i] += stoveProfile[i];
    }
  }

  console.log(cumulativeLoadProfileWinter);

  return cumulativeLoadProfileWinter;
});