import React from "react";
import { Box, Text } from "@chakra-ui/react";

const HourlyCostCalculator: React.FC<{ rates: any, loadProfile: number[] }> = ({ rates, loadProfile }) => {
  const calculateHourlyCosts = () => {
    return loadProfile.map((load, hour) => {
      if (rates.peakHours.includes(hour)) {
        return load * rates.peak;
      } else if (rates.partPeakHours && rates.partPeakHours.includes(hour)) {
        return load * rates.partPeak;
      } else {
        return load * rates.offPeak;
      }
    });
  };

  const hourlyCosts = calculateHourlyCosts();
  const totalCost = hourlyCosts.reduce((acc, cost) => acc + cost, 0);

  return (
    <Box>
      <Text fontSize="xl">Total Hourly Costs: ${totalCost.toFixed(2)}</Text>
      <Text>Hourly Costs: {hourlyCosts.map((cost, index) => (
        <Text key={index}>{index}:00 - ${cost.toFixed(2)}</Text>
      ))}</Text>
    </Box>
  );
};

export default HourlyCostCalculator;
