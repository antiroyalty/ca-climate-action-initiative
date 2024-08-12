import React, { useMemo } from "react";
import { useAtomValue } from "jotai";
import { Text, Box, Heading } from "@chakra-ui/react";
import { ChartGroup, ChartHeader } from "../../chart";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { InfoCardView } from "../cards";

import { annualCostsAtom } from "../../app-state/outputs/costs/annual-costs-state";
import { annualSavingsAtom } from "../../app-state/annual-savings-state";
import { npvAtom } from "../../app-state/outputs/costs/npv-state";

const NPVCardView: React.FC = () => {
  console.log("NPV Card View is loaded");
  const annualSavings = useAtomValue(annualSavingsAtom);
  const annualCosts = useAtomValue(annualCostsAtom);
  const npv = useAtomValue(npvAtom);

  // Data for the bar graph, re-computed when NPV, annual savings, or annual costs update
  const data = useMemo(() => [
    { label: 'Annual Savings', value: annualSavings },
    { label: 'Annual Costs', value: annualCosts }
  ], [annualSavings, annualCosts, npv]); // Include NPV as a dependency to re-trigger graph update

  const margin = { top: 20, right: 30, bottom: 40, left: 80 },
    width = 430 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

  // Scales
  const xScale = scaleBand({
    range: [0, width],
    round: true,
    domain: data.map(d => d.label),
    padding: 0.4,
  });

  const yScale = scaleLinear({
    range: [height, 0],
    round: true,
    domain: [0, Math.max(...data.map(d => d.value))]
  });

  return (
    <InfoCardView title={"Financial Overview"}>
      <Heading as="h3" size="lg" mt={4}>Net Present Value (NPV): ${npv.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Heading>
      {/* <Heading as="h4" size="md" mt={4}>Annual Costs vs. Savings</Heading>
      <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
        <Group left={margin.left} top={margin.top}>
          {data.map((d, i) => (
            <Bar
              key={i}
              x={xScale(d.label)}
              y={yScale(d.value)}
              width={xScale.bandwidth()}
              height={height - yScale(d.value)}
              fill={i % 2 === 0 ? 'green' : 'red'}
            />
          ))}
          <AxisLeft scale={yScale} />
          <AxisBottom top={height} scale={xScale} />
        </Group>
      </svg> */}
    </InfoCardView>
  );
};

export default NPVCardView;
