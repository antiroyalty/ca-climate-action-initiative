// import React, { useState } from "react";
// import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";

// const CapitalCostsInput: React.FC<{ onSubmit: (cost: number) => void }> = ({ onSubmit }) => {
//   const [capitalCost, setCapitalCost] = useState<string>("");

//   const handleSubmit = () => {
//     const cost = parseFloat(capitalCost);
//     if (!isNaN(cost) && onSubmit) {
//       onSubmit(cost);
//     }
//   };

//   return (
//     <Box>
//       <Text fontSize="xl" mb="4">Enter Capital Costs for Installation</Text>
//       <Flex mb="4">
//         <Input
//           placeholder="Capital Cost in USD"
//           value={capitalCost}
//           onChange={(e) => setCapitalCost(e.target.value)}
//           type="number"
//         />
//       </Flex>
//     </Box>
//   );
// };

// export default CapitalCostsInput;
