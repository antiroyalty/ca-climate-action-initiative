import React from "react";
import { useAtomValue } from "jotai";
import { Heading } from "@chakra-ui/react";
import { ChartHeader, ChartGroup } from "../../chart"
import { annualCostsAtom, summerCostsAtom, winterCostsAtom } from "../../app-state/outputs/costs/annual-costs-state";
import { InfoCardView } from "../cards";
import { scaleLinear } from "@visx/scale";
import { Group } from "@visx/group";
import { Bar } from "@visx/shape";
import { AxisBottom, AxisLeft } from "@visx/axis";

const AnnualCostsCardView: React.FC = () => {
  const winterCosts = useAtomValue(winterCostsAtom);
  const summerCosts = useAtomValue(summerCostsAtom);
  const annualCosts = useAtomValue(annualCostsAtom);

  const summerPercentage = (summerCosts / annualCosts) * 100;
  const winterPercentage = (winterCosts / annualCosts) * 100;

  const data = [
    { label: "Summer", value: summerPercentage, color: "#fcba03" },
    { label: "Winter", value: winterPercentage, color: "#10a7c9" },
  ];

  const margin = { top: 10, right: 30, bottom: 10, left: 30 };
  const width = 430 - margin.left - margin.right;
  const height = 50; // 200 - margin.top - margin.bottom;

  const x = scaleLinear({
    domain: [0, 100],
    range: [0, width],
  });

  console.log("Annual costs view updated")

  return (
    <InfoCardView title={"Annual Electricity Costs"}>
      <Heading>Annual Costs: ${(summerCosts + winterCosts).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Heading>
      <ChartGroup>
        <svg
          viewBox={`0 0 ${width + margin.left + margin.right} ${
            height + margin.top + margin.bottom
          }`}
          style={{ width: "100%", height: "200", background: "white" }}
        >
          <Group left={margin.left} top={margin.top}>
            <Bar
              x={0}
              y={0}
              width={x(data[0].value)}
              height={height}
              fill={data[0].color}
            />
            <Bar
              x={x(data[0].value)}
              y={0}
              width={x(data[1].value)}
              height={height}
              fill={data[1].color}
            />
            <text
              x={x(data[0].value) / 2}
              y={height / 2}
              dy=".35em"
              fill="white"
              fontSize={12}
              textAnchor="middle"
            >
              {data[0].label}
            </text>
            <text
              x={x(data[0].value) + x(data[1].value) / 2}
              y={height / 2}
              dy=".35em"
              fill="white"
              fontSize={12}
              textAnchor="middle"
            >
              {data[1].label}
            </text>
            <text
              x={x(data[0].value)}
              y={-10}
              fill="black"
              fontSize={12}
              textAnchor="middle"
            >
              {summerPercentage.toFixed(2)}%
            </text>
          </Group>
        </svg>
      </ChartGroup>
    </InfoCardView>
  );
};

export default AnnualCostsCardView;
