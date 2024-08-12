import React, { useEffect, useMemo } from "react";
import { useAtom } from "jotai";
import { Stack, Select, Box, Text, Flex } from "@chakra-ui/react";
import { FormRow, FormSectionView } from "../forms";
import { seasonAtom } from "../../app-state/inputs/input-state"
import {
  electricityProviderAtom,
  ratePlanAtom,
  peakPriceAtom,
  offPeakPriceAtom,
  partPeakPriceAtom,
  peakHoursAtom,
  partPeakHoursAtom,
  offPeakHoursAtom,
  setRatePlanAtom,
  ratePlans, // Import ratePlans from electricity-prices-state
} from "../../app-state/outputs/electricity-prices-state";
import { getLoadProfileAtom } from "../../app-state/outputs/profiles/shared-load-state";
import { Line } from "react-chartjs-2";
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import annotationPlugin from 'chartjs-plugin-annotation';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

export const ElectricityPricesView: React.FC = () => {
  const [electricityProvider, setElectricityProvider] = useAtom(electricityProviderAtom);
  const [ratePlan, setRatePlan] = useAtom(ratePlanAtom);
  const [season] = useAtom(seasonAtom);
  const [, setPeakPrice] = useAtom(peakPriceAtom);
  const [, setOffPeakPrice] = useAtom(offPeakPriceAtom);
  const [, setPartPeakPrice] = useAtom(partPeakPriceAtom);
  const [estimatedLoadProfile] = useAtom(getLoadProfileAtom('base'));
  const [, setPeakHours] = useAtom(peakHoursAtom);
  const [, setPartPeakHours] = useAtom(partPeakHoursAtom);
  const [, setOffPeakHours] = useAtom(offPeakHoursAtom);
  const updateRatePlan = useAtom(setRatePlanAtom)[1];

  const handleRatePlanChange = (plan: string) => {
    setRatePlan(plan);
    updateRatePlan(plan);
  };

  useEffect(() => {
    const selectedPlan = ratePlans[electricityProvider][ratePlan][season];
    if (selectedPlan) {
      setPeakPrice(selectedPlan.peak);
      setOffPeakPrice(selectedPlan.offPeak);
      setPartPeakPrice(selectedPlan.partPeak || 0);
      setPeakHours(selectedPlan.peakHours);
      setPartPeakHours(selectedPlan.partPeakHours || []);
      setOffPeakHours(selectedPlan.offPeakHours || []);
    }
  }, [electricityProvider, ratePlan, setPeakPrice, setOffPeakPrice, setPartPeakPrice, setPeakHours, setPartPeakHours, setOffPeakHours]);

  const chartData = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    datasets: [
      {
        label: 'Estimated Load Profile',
        data: estimatedLoadProfile,
        borderColor: 'blue',
        fill: false,
      },
    ],
  };

  const chartOptions = useMemo(() => {
    const selectedPlan = ratePlans[electricityProvider][ratePlan][season];
    const annotations = [
      ...selectedPlan.offPeakHours.map(hour => ({
        type: 'box',
        xMin: hour,
        xMax: hour + 1,
        backgroundColor: 'rgba(0, 255, 0, 0.2)',
        borderColor: 'rgba(255, 255, 0, 0)',
        borderWidth: 0,
      })),
      ...selectedPlan.peakHours.map(hour => ({
        type: 'box',
        xMin: hour,
        xMax: hour + 1,
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        borderColor: 'rgba(255, 255, 0, 0)',
        borderWidth: 0,
      })),
      ...(selectedPlan.partPeakHours || []).map(hour => ({
        type: 'box',
        xMin: hour,
        xMax: hour + 1,
        backgroundColor: 'rgba(255, 255, 0, 0.2)',
        borderColor: 'rgba(255, 255, 0, 0)',
        borderWidth: 0,
      })),
    ];

    return {
      scales: {
        x: {
          type: 'category',
          labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
        },
      },
      plugins: {
        annotation: {
          annotations,
        },
      },
    };
  }, [electricityProvider, ratePlan]);

  return (
    <Box mt="5" width="100%">
      <FormSectionView title="Electricity Prices">
        <FormRow>
          <Flex justifyContent="space-between" width="100%">
            <Box width="45%">
              <Text>Electricity Provider</Text>
              <Select value={electricityProvider} onChange={(e) => setElectricityProvider(e.target.value)}>
                <option value="PG&E">PGE</option>
                {/* <option value="SCE">SCE</option> */}
                <option value="SDG&E">SDG&E</option>
              </Select>
            </Box>
            <Box width="45%">
              <Text>Rate Plan</Text>
              <Select value={ratePlan} onChange={(e) => handleRatePlanChange(e.target.value)}>
                {Object.keys(ratePlans[electricityProvider]).map(plan => (
                  <option key={plan} value={plan}>{plan}</option>
                ))}
              </Select>
            </Box>
          </Flex>
        </FormRow>
        <FormRow>
          <Flex justifyContent="space-between" width="100%">
            <Text style={{ backgroundColor: 'rgba(255, 0, 0, 0.2)' }}>Peak Price:</Text>
            <Text style={{ backgroundColor: 'rgba(255, 0, 0, 0.2)' }}>${ratePlans[electricityProvider][ratePlan][season].peak.toFixed(2)} / kWh</Text>
          </Flex>
        </FormRow>
        {ratePlans[electricityProvider][ratePlan].summer.partPeak && (
          <FormRow>
            <Flex justifyContent="space-between" width="100%">
              <Text style={{ backgroundColor: 'rgba(255, 255, 0, 0.2)' }}>Part-Peak Price:</Text>
              <Text style={{ backgroundColor: 'rgba(255, 255, 0, 0.2)' }}>${ratePlans[electricityProvider][ratePlan][season].partPeak.toFixed(2)} / kWh</Text>
            </Flex>
          </FormRow>
        )}
        <FormRow>
          <Flex justifyContent="space-between" width="100%">
            <Text style={{ backgroundColor: 'rgba(0, 255, 0, 0.2)' }}>Off-Peak Price:</Text>
            <Text style={{ backgroundColor: 'rgba(0, 255, 0, 0.2)' }}>${ratePlans[electricityProvider][ratePlan][season].offPeak.toFixed(2)} / kWh</Text>
          </Flex>
        </FormRow>
        <Box>
          <Text>Estimated Load Profile</Text>
          <Line data={chartData} options={chartOptions} />
        </Box>
      </FormSectionView>
    </Box>
  );
};

export default ElectricityPricesView;