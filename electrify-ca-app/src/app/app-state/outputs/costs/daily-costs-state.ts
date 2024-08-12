import { atom } from "jotai";
import { peakPriceAtom, partPeakPriceAtom, offPeakPriceAtom, peakHoursAtom, partPeakHoursAtom, offPeakHoursAtom, selectedPlanAtom } from "../../outputs/electricity-prices-state";
import { getCumulativeLoadProfileAtom, loadToPriceCategories } from "../profiles/shared-load-state";
import { seasonAtom } from "../../inputs/input-state";

export const calculateDailyCosts = (season: string, selectedPlan: any, peakLoad: number, partPeakLoad: number, offPeakLoad: number): number => {
    const peakPrice = selectedPlan[season].peak || 0;
    const partPeakPrice = selectedPlan[season].partPeak || 0;
    const offPeakPrice = selectedPlan[season].offPeak || 0;

    console.log("peakPrice, partPeakPrice, offPeakPrice")
    console.log(peakPrice, partPeakPrice, offPeakPrice)

    return (peakPrice * peakLoad) + (partPeakPrice * partPeakLoad) + (offPeakPrice * offPeakLoad);
};

export const dailyCostsAtom = atom((get) => {
    const season = get(seasonAtom) || "summer";
    const selectedPlan = get(selectedPlanAtom);

    // Hours
    const peakHours = selectedPlan[season].peakHours || [];
    const partPeakHours = selectedPlan[season].partPeakHours || [];
    const offPeakHours = selectedPlan[season].offPeakHours || [];
    
    // Load
    const cumulativeLoadProfile = get(getCumulativeLoadProfileAtom);
    const { peakLoad: peakLoadTotal, partPeakLoad: partPeakLoadTotal, offPeakLoad: offPeakLoadTotal } = loadToPriceCategories(cumulativeLoadProfile, peakHours, partPeakHours, offPeakHours);

    // Costs
    const dailyCosts = calculateDailyCosts(season, selectedPlan, peakLoadTotal, partPeakLoadTotal, offPeakLoadTotal);
    return dailyCosts;
});
