import { atom } from "jotai";
import { dailyCostsAtom, calculateDailyCosts } from "./daily-costs-state";
import { selectedPlanAtom } from "../../outputs/electricity-prices-state";
import { getCumulativeLoadProfileAtom, cumulativeLoadProfileSummerAtom, cumulativeLoadProfileWinterAtom, loadToPriceCategories } from "../profiles/shared-load-state";

const daysInYear = 365; // Assuming non-leap year for simplicity
const daysInSummer = 184; // Approximate number of summer days
const daysInWinter = daysInYear - daysInSummer; // Remaining days are winter

export const annualCostsAtom = atom((get) => {
  const summerTotalCosts = get(summerCostsAtom);
  const winterTotalCosts = get(winterCostsAtom);

  return summerTotalCosts + winterTotalCosts;;
});

export const summerCostsAtom = atom((get) => {
    const selectedPlan = get(selectedPlanAtom);

    const peakHours = selectedPlan["summer"].peakHours || [];
    const partPeakHours = selectedPlan["summer"].partPeakHours || [];
    const offPeakHours = selectedPlan["summer"].offPeakHours || [];

    const summerLoadProfile = get(cumulativeLoadProfileSummerAtom);
    const summerLoad = loadToPriceCategories(summerLoadProfile, peakHours, partPeakHours, offPeakHours);
    const summerCosts = calculateDailyCosts("summer", selectedPlan, summerLoad.peakLoad, summerLoad.partPeakLoad, summerLoad.offPeakLoad);

    return summerCosts * daysInSummer;
});

export const winterCostsAtom = atom((get) => {
    const selectedPlan = get(selectedPlanAtom);

    const peakHours = selectedPlan["winter"].peakHours || [];
    const partPeakHours = selectedPlan["winter"].partPeakHours || [];
    const offPeakHours = selectedPlan["winter"].offPeakHours || [];
  
    const winterLoadProfile = get(cumulativeLoadProfileWinterAtom);
    const winterLoad = loadToPriceCategories(winterLoadProfile, peakHours, partPeakHours, offPeakHours);
    const winterCosts = calculateDailyCosts("winter", selectedPlan, winterLoad.peakLoad, winterLoad.partPeakLoad, winterLoad.offPeakLoad);

    return winterCosts * daysInWinter
})
