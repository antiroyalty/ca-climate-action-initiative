import { atom } from "jotai";
import { seasonAtom } from "../inputs/input-state";

export const electricityProviderAtom = atom<string>("PGE");
export const ratePlanAtom = atom<string>("E-TOU-D");

// https://www.pge.com/assets/pge/docs/account/rate-plans/residential-electric-rate-plan-pricing.pdf
export const ratePlans = {
  "PGE": {
    "E-TOU-C": {
      summer: { peak: 0.49, offPeak: 0.39, peakHours: [16, 17, 18, 19, 20], offPeakHours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 21, 22, 23] },
      winter: { peak: 0.38, offPeak: 0.35, peakHours: [16, 17, 18, 19, 20], offPeakHours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 21, 22, 23] }
    },
    "E-TOU-D": {
      summer: { peak: 0.55, offPeak: 0.42, peakHours: [17, 18, 19], offPeakHours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 20, 21, 22, 23] },
      winter: { peak: 0.46, offPeak: 0.42, peakHours: [17, 18, 19], offPeakHours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 20, 21, 22, 23] }
    },
    "EV2-A": {
      summer: { peak: 0.62, offPeak: 0.31, partPeak: 0.51, peakHours: [16, 17, 18, 19, 20], partPeakHours: [15, 21, 22, 23], offPeakHours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] },
      winter: { peak: 0.49, offPeak: 0.31, partPeak: 0.48, peakHours: [16, 17, 18, 19, 20], partPeakHours: [15, 21, 22, 23], offPeakHours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] }
    },
    "EV-B": {
      summer: { peak: 0.69, offPeak: 0.33, partPeak: 0.44, peakHours: [14, 15, 16, 17, 18, 19, 20], partPeakHours: [7, 8, 9, 10, 11, 12, 13, 21, 22], offPeakHours: [0, 1, 2, 3, 4, 5, 6, 23] },
      winter: { peak: 0.50, offPeak: 0.30, partPeak: 0.37, peakHours: [14, 15, 16, 17, 18, 19, 20], partPeakHours: [7, 8, 9, 10, 11, 12, 13, 21, 22], offPeakHours: [0, 1, 2, 3, 4, 5, 6, 23] }
    },
    "E-ELEC": {
      summer: { peak: 0.60, offPeak: 0.38, partPeak: 0.44, peakHours: [16, 17, 18, 19, 20], partPeakHours: [15, 21, 22, 23], offPeakHours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] },
      winter: { peak: 0.37, offPeak: 0.33, partPeak: 0.35, peakHours: [16, 17, 18, 19, 20], partPeakHours: [15, 21, 22, 23], offPeakHours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] }
    }
  }
};

export const peakPriceAtom = atom<number>(ratePlans["PGE"]["E-TOU-D"].summer.peak);
export const offPeakPriceAtom = atom<number>(ratePlans["PGE"]["E-TOU-D"].summer.offPeak);
export const partPeakPriceAtom = atom<number>(ratePlans["PGE"]["EV2-A"].summer.partPeak || 0);
export const peakHoursAtom = atom<number[]>(ratePlans["PGE"]["E-TOU-D"].summer.peakHours);
export const partPeakHoursAtom = atom<number[]>(ratePlans["PGE"]["EV2-A"].summer.partPeakHours || []);
export const offPeakHoursAtom = atom<number[]>(ratePlans["PGE"]["E-TOU-D"].summer.offPeakHours);

export const selectedPlanAtom = atom((get) => {
  const season = get(seasonAtom);
  const provider = get(electricityProviderAtom);
  const ratePlan = get(ratePlanAtom);
  return ratePlans[provider][ratePlan];
});

export const setRatePlanAtom = atom(
  null,
  (get, set, newRatePlan: string) => {
    const season = get(seasonAtom);
    const provider = get(electricityProviderAtom);
    const selectedPlan = ratePlans[provider][newRatePlan][season];
    set(ratePlanAtom, newRatePlan);
    set(peakPriceAtom, selectedPlan.season.peak);
    set(offPeakPriceAtom, selectedPlan.season.offPeak);
    set(partPeakPriceAtom, selectedPlan.season.partPeak || 0);
    set(peakHoursAtom, selectedPlan.season.peakHours);
    set(partPeakHoursAtom, selectedPlan.season.partPeakHours || []);
    set(offPeakHoursAtom, selectedPlan.season.offPeakHours || []);
  }
);
