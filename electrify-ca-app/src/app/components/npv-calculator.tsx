// import React from "react";
// import { Box, Input, Button, Text } from "@chakra-ui/react";

// const NPVCalculator: React.FC<{ capitalCost: number, cashFlows: number[], discountRate: number }> = ({ capitalCost, cashFlows, discountRate }) => {
//   const calculateNPV = () => {
//     const npv = cashFlows.reduce((acc, cashFlow, year) => {
//       return acc + (cashFlow / Math.pow(1 + discountRate, year + 1));
//     }, -capitalCost);
//     return npv;
//   };

//   const npv = calculateNPV();

//   return (
//     <Box>
//       <Text fontSize="xl">Net Present Value: ${npv.toFixed(2)}</Text>
//     </Box>
//   );
// };

// export default NPVCalculator;
