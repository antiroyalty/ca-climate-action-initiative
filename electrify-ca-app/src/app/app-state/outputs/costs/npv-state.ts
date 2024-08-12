import { atom } from "jotai";
// Tech specs
import { storageEquimentCostAtom, storageLaborCostAtom, storageReturnPeriodAtom, discountRateAtom } from "../../inputs/storage-specs-state"


export const totalUpfrontCostAtom = atom((get) => {
  // const storageEquipmentCost = get(storageEquipmentCostAtom) || 0;
  // const storageLaborCost = get(storageLaborCostAtom) || 0;
  // const solarEquipmentCost = get(solarEquipmentCostAtom) || 0;
  // const solarLaborCost = get(solarLaborCostAtom) || 0;
  return 0;
  return storageEquipmentCost + storageLaborCost + solarEquipmentCost + solarLaborCost;
});

export const npvAtom = atom((get) => {
  // const upfrontCost = get(totalUpfrontCostAtom);
  // const discountRate = get(discountRateAtom) || 0.0;
  // const timeHorizon = Math.max(get(solarReturnPeriodAtom) || 0, get(storageReturnPeriodAtom) || 0);  // Use the longer of the two periods
  // const annualSavings = get(annualSavingsAtom);
  // const annualCosts = get(annualCostsAtom);

  // let npv = -upfrontCost;  // Start with the negative upfront cost
  // console.log(`Initial NPV (Upfront Cost): ${npv}`);

  // for (let year = 1; year <= timeHorizon; year++) {
  //     const discountedSavings = (annualSavings - annualCosts) / Math.pow(1 + discountRate, year);
  //     npv += discountedSavings;
  //     console.log(`Year ${year}: Discounted Savings = ${discountedSavings}, Cumulative NPV = ${npv}`);
  // }

  return 0;
});

