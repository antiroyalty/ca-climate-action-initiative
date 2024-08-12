// import React, { useState } from "react";
// import { Box } from "@chakra-ui/react";
// import { useAtom } from "jotai";
// import { discountRateAtom } from "../../app-state/config-state";
// import CapitalCostsInput from "../components/capital-costs-input";
// import UtilityRatesInput from "../components/utility-rates-input";
// import HourlyCostCalculator from "../components/hourly-cost-calculator";
// import NPVCalculator from "../components/npv-calculator";
// import PaybackPeriodCalculator from "../components/payback-period-calculator";

// const InstallationCostPage: React.FC = () => {
//   console.log("A")
//   const [capitalCost, setCapitalCost] = useState<number | null>(null);
//   const [rates, setRates] = useState<any | null>(null);
//   const loadProfile = Array.from({ length: 24 }, (_, i) => 0.5); // Example load profile
//   const [discountRate] = useAtom(discountRateAtom); // Get the user-specified discount rate from state

//   const handleCapitalCostSubmit = (cost: number) => {
//     setCapitalCost(cost);
//   };

//   const handleRatesSubmit = (rates: any) => {
//     setRates(rates);
//   };

//   const annualSavings = 500; // Example annual savings

//   console.log("discount rate: ", discountRate)

//   return (
//     <Box p="4">
//       <CapitalCostsInput onSubmit={handleCapitalCostSubmit} />
//       <UtilityRatesInput onSubmit={handleRatesSubmit} />
//       {capitalCost !== null && rates !== null && discountRate !== null && (
//         <>
//           <HourlyCostCalculator rates={rates} loadProfile={loadProfile} />
//           <NPVCalculator capitalCost={capitalCost} cashFlows={Array(10).fill(annualSavings)} discountRate={discountRate} />
//           <PaybackPeriodCalculator capitalCost={capitalCost} annualSavings={annualSavings} />
//         </>
//       )}
//     </Box>
//   );
// };

// export default InstallationCostPage;
