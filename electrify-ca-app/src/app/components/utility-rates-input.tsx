// import React, { useState } from "react";
// import { Box, Button, Flex, Input, Text, Select } from "@chakra-ui/react";

// const UtilityRatesInput: React.FC<{ onSubmit: (rates: any) => void }> = ({ onSubmit }) => {
//   const [peakPrice, setPeakPrice] = useState<string>("");
//   const [offPeakPrice, setOffPeakPrice] = useState<string>("");
//   const [partPeakPrice, setPartPeakPrice] = useState<string>("");

//   const handleSubmit = () => {
//     const rates = {
//       peak: parseFloat(peakPrice),
//       offPeak: parseFloat(offPeakPrice),
//       partPeak: partPeakPrice ? parseFloat(partPeakPrice) : null,
//     };
//     if (!isNaN(rates.peak) && !isNaN(rates.offPeak) && (!partPeakPrice || !isNaN(rates.partPeak))) {
//       onSubmit(rates);
//     }
//   };

//   return (
//     <Box>
//       <Text fontSize="xl" mb="4">Enter Utility Rates</Text>
//       <Flex mb="4">
//         <Input
//           placeholder="Peak Price in USD/kWh"
//           value={peakPrice}
//           onChange={(e) => setPeakPrice(e.target.value)}
//           type="number"
//         />
//       </Flex>
//       <Flex mb="4">
//         <Input
//           placeholder="Off-Peak Price in USD/kWh"
//           value={offPeakPrice}
//           onChange={(e) => setOffPeakPrice(e.target.value)}
//           type="number"
//         />
//       </Flex>
//       <Flex mb="4">
//         <Input
//           placeholder="Part-Peak Price in USD/kWh (optional)"
//           value={partPeakPrice}
//           onChange={(e) => setPartPeakPrice(e.target.value)}
//           type="number"
//         />
//       </Flex>
//       <Button colorScheme="blue" onClick={handleSubmit}>Submit</Button>
//     </Box>
//   );
// };

// export default UtilityRatesInput;
