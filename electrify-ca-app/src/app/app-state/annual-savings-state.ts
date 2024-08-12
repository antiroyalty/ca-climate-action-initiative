import { atom } from "jotai";
// import { peakPriceAtom, offPeakPriceAtom, peakHoursAtom, offPeakHoursAtom, partPeakHoursAtom } from "./outputs/electricity-prices-state";
// import { reduceLoadProfile, baseLoadProfileAtom } from "./outputs/profiles/base-load-state";
// import { batteryCapacityAtom }
// import {} solarPanelCapacityAtom } from "./config-state";


// import { climateZoneAtom } from "./outputs/climatezone-state";
// import { solarLoadProfiles, ClimateZone } from "./outputs/profiles/solar-load-state";
// import { annualCostsAtom } from "./costs/annual-costs-state"

type LoadProfile = { [hour: number]: number };

type EnergySystem = {
    type: 'solar' | 'battery' | 'heat_pump';
    capacity: number; // Solar capacity in kW, battery capacity in kWh, heat pump efficiency or capacity
};

const calculateAnnualSavings = (peakPrice: number, partPeakPrice: number, offPeakPrice: number, peakLoad: number, partPeakLoad: number, offPeakLoad: number, system: EnergySystem): number => {
    let savings = 0;
    
    if (system.type == 'solar') {
        savings += annualCostsAtom - (peakLoad * peakPrice) + (partPeakLoad * partPeakPrice) + (offPeakLoad * offPeakPrice);
    }

    if (system.type == 'battery') {
        const energyShifted = Math.min(peakLoad, system.capacity); // Shift only as much as the battery capacity
        savings += energyShifted * (peakPrice - offPeakPrice);
    }

    if (system.type == 'heat_pump') {
        savings += ((peakLoad + partPeakLoad + offPeakLoad) * (1 - (system.capacity / 100))) * ((peakPrice + partPeakPrice + offPeakPrice) / 3);
    }
        
    console.log("savings before 365: ", savings)
    return savings * 365; // Convert to annual savings
};

export const annualSavingsAtom = atom((get) => {
    // const peakPrice = get(peakPriceAtom) || 0;
    // const partPeakPrice = get(partPeakHoursAtom) || 0;
    // const offPeakPrice = get(offPeakPriceAtom) || 0;

    // const peakHours = get(peakHoursAtom) || [];
    // const partPeakHours = get(partPeakHoursAtom) || [];
    // const offPeakHours = get(offPeakHoursAtom) || [];

    // const baseLoadProfile = get(baseLoadProfileAtom) || {};
    // const batteryCapacity = get(batteryCapacityAtom) || 0;

    // const solarPanelCapacity = get(solarPanelCapacityAtom) || 0;

    // const climateZone = get(climateZoneAtom); // Default zone if not set
    // const season = 'summer'; // Placeholder, adjust based on actual season logic
    // console.log("climate zone ---", climateZone)
    // console.log(solarLoadProfiles)
    // const solarLoadProfile = solarLoadProfiles['marine']['summer'];

    // const { peakLoad: peakLoadSolar, partPeakLoad: partPeakLoadSolar, offPeakLoad: offPeakLoadSolar } = reduceLoadProfile(solarLoadProfile, peakHours, partPeakHours, offPeakHours);
    // const { peakLoad: peakLoadBase, partPeakLoad: partPeakLoadBase, offPeakLoad: offPeakLoadBase } = reduceLoadProfile(baseLoadProfile, peakHours, partPeakHours, offPeakHours);

    // console.log("peak load solar: ", peakLoadSolar)
    // console.log("part peak load solar: ", partPeakLoadSolar)
    // console.log("off peak load solar: ", offPeakLoadSolar)

    // console.log("peak load base: ", peakLoadBase)
    // console.log("part peak load base: ", partPeakLoadBase)
    // console.log("off peak load base: ", offPeakLoadBase)

    // const peakLoad = peakLoadBase + peakLoadSolar 
    // const partPeakLoad = partPeakLoadBase + partPeakLoadSolar
    // const offPeakLoad = offPeakLoadBase + offPeakLoadSolar

    // console.log("annual savings state --")
    // console.log("peak load: ", peakLoad)
    // console.log("part peak load: ", partPeakLoad)
    // console.log("off peak load: ", offPeakLoad)

    // console.log("solarPanelCapacity ", solarPanelCapacity)

    // const energySystem = { type: 'solar', capacity: solarPanelCapacity };

    // const annualSavings = calculateAnnualSavings(peakPrice, partPeakPrice, offPeakPrice, peakLoad, partPeakLoad, offPeakLoad, energySystem);
    // console.log("Annual Savings is: ")
    // console.log(annualSavings)
    return 0;
    return annualSavings;
});
