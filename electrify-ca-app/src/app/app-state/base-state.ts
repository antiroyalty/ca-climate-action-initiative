import { atom } from "jotai";
import { peakPriceAtom, offPeakPriceAtom, peakHoursAtom, offPeakHoursAtom } from "./outputs/electricity-prices-state";
import { baseLoadProfileAtom } from "./outputs/profiles/base-load-state";

type LoadProfile = { [hour: number]: number };

const calculateDailyCosts = (peakPrice: number, offPeakPrice: number, peakLoad: number, offPeakLoad: number): number => {
    return ((peakPrice * peakLoad) + (offPeakPrice * offPeakLoad));
};

const reduceLoadProfile = (loadProfile: LoadProfile, peakHours: number[], offPeakHours: number[]): { peakLoad: number, offPeakLoad: number } => {
    let peakLoad = 0;
    let offPeakLoad = 0;

    for (let hour in loadProfile) {
        if (peakHours.includes(parseInt(hour))) {
            peakLoad += loadProfile[hour];
        } else if (offPeakHours.includes(parseInt(hour))) {
            offPeakLoad += loadProfile[hour];
        }
    }

    return { peakLoad, offPeakLoad };
};

export const baseCostsAtom = atom((get) => {
    const peakPrice = get(peakPriceAtom) || 0;
    const offPeakPrice = get(offPeakPriceAtom) || 0;
    const peakHours = get(peakHoursAtom) || [];
    const offPeakHours = get(offPeakHoursAtom) || [];
    const loadProfile = get(baseLoadProfileAtom) || {};

    const { peakLoad, offPeakLoad } = reduceLoadProfile(loadProfile, peakHours, offPeakHours);

    const dailyCosts = calculateDailyCosts(peakPrice, offPeakPrice, peakLoad, offPeakLoad);

    return dailyCosts;
});
