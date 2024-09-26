import React, { useMemo } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import { InfoCardView } from "../cards";
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
import { useAtom } from 'jotai';
import { solarEnabledAtom, storageEnabledAtom, heatpumpEnabledAtom, stoveEnabledAtom } from "../../app-state/inputs/input-state"
import { getCumulativeLoadProfileAtom, getLoadProfileAtom } from "../../app-state/outputs/profiles/shared-load-state";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LoadProfileOutputCardView: React.FC = () => {
  // baseload
  const [baseLoadProfile] = useAtom(getLoadProfileAtom("base"));
  // cumulative
  const [cumulativeLoadProfile] = useAtom(getCumulativeLoadProfileAtom);
  // solar
  const [solarLoadProfile] = useAtom(getLoadProfileAtom("solar"));
  const [solarEnabled] = useAtom(solarEnabledAtom);
  // storage
  const [storageLoadProfile] = useAtom(getLoadProfileAtom("storage"));
  const [storageEnabled] = useAtom(storageEnabledAtom);
  // heatpump
  const [heatpumpLoadProfile] = useAtom(getLoadProfileAtom("heatpump"));
  const [heatpumpEnabled] = useAtom(heatpumpEnabledAtom);
  // stove
  const [stoveLoadProfile] = useAtom(getLoadProfileAtom("stove"));
  const [stoveEnabled] = useAtom(stoveEnabledAtom);

  const chartData = useMemo(() => {
    const datasets = [
      // Add baseload
      {
        label: 'Base Load Profile',
        data: baseLoadProfile,
        borderColor: 'black',
        fill: false
      },
      {
        label: 'Cumulative Load Profile',
        data: cumulativeLoadProfile,
        borderColor: 'green',
        fill: false,
      }
    ];

    if (solarEnabled) {
      datasets.push({
        label: 'Solar Load Profile',
        data: solarLoadProfile,
        borderColor: 'orange',
        fill: false,
      });
    }

    if (storageEnabled) {
      datasets.push({
        label: 'Storage Load Profile',
        data: storageLoadProfile,
        borderColor: 'blue',
        fill: false,
      });
    }

    if (heatpumpEnabled) {
      datasets.push({
        label: 'Heat Pump Load Profile',
        data: heatpumpLoadProfile,
        borderColor: 'red',
        fill: false,
      });
    }

    if (stoveEnabled) {
      datasets.push({
        label: 'Stove Load Profile',
        data: stoveLoadProfile,
        borderColor: 'pink',
        fill: false,
      });
    }

    return {
      labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
      datasets,
    };
  }, [cumulativeLoadProfile, solarLoadProfile, solarEnabled, storageLoadProfile, storageEnabled]);

  const chartOptions = useMemo(() => ({
    scales: {
      x: {
        type: 'category',
        labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  }), []);

  return (
    <InfoCardView title={"Annual Electricity Costs"}>
      <Box width="100%">
        <Heading mb="5">Load Profile</Heading>
          <Box>
            <Line data={chartData} options={chartOptions} />
          </Box>
      </Box>
    </InfoCardView>
  );
};

export default LoadProfileOutputCardView;
