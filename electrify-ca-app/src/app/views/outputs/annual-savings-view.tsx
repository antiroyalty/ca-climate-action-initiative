import React, { useMemo } from "react";
import { useAtomValue } from "jotai";
import { Text, Box, Heading } from "@chakra-ui/react";
import { annualSavingsAtom } from "../../app-state/annual-savings-state";
import { ChartGroup, ChartHeader } from "../../chart";
import { scaleLinear, scaleTime } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { LinePath } from "@visx/shape";
import { Group } from "@visx/group";
import { GridRows } from "@visx/grid";
import { DateTime } from "luxon";
import { InfoCardView } from "../cards";

const AnnualSavingsCardView: React.FC = () => {
  console.log("Annual Savings Card View is loaded");
  const annualSavings = useAtomValue(annualSavingsAtom);

  const margin = { top: 10, right: 30, bottom: 40, left: 60 },
    width = 430 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

  const annualSavingsSeries = useMemo(() => {
    const series: [Date, number][] = [];
    const startYear = DateTime.utc().year;
    const annualSavingsValue = annualSavings;
    for (let i = 0; i <= 10; i++) {
      series.push([DateTime.utc(startYear + i).toJSDate(), annualSavingsValue]);
    }
    return series;
  }, [annualSavings]);

  const x = scaleTime({
    domain: [
      DateTime.utc(DateTime.utc().year, 1, 1).toJSDate(),
      DateTime.utc(DateTime.utc().year + 10, 1, 1).toJSDate(),
    ],
    range: [0, width],
  });

  const y = scaleLinear<number>({
    domain: [0, Math.max(...annualSavingsSeries.map(s => s[1]))],
    range: [height, 0],
  }).nice();

  return (
    <InfoCardView title={"Annual Electricity Savings"}>
      <Heading>Annual Savings: ${annualSavings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Heading>
      {/* <ChartGroup>
        <ChartHeader>Annual Savings Over Time</ChartHeader>
        <svg
          viewBox={`0 0 ${width + margin.left + margin.right} ${
            height + margin.top + margin.bottom
          }`}
          style={{ width: "100%", height: "auto", background: "white" }}
        >
          <Group left={margin.left} top={margin.top}>
            <GridRows scale={y} width={width} />
            <LinePath
              data={annualSavingsSeries}
              x={(d) => x(d[0])}
              y={(d) => y(d[1])}
              stroke="green"
              strokeWidth={2}
            />
            <AxisBottom
              top={height}
              scale={x}
              tickFormat={(n) => DateTime.fromJSDate(n).year.toString()}
            />
            <AxisLeft
              numTicks={4}
              scale={y}
              tickFormat={(t) => `\$${t.toLocaleString()}`}
            />
          </Group>
        </svg>
      </ChartGroup> */}
    </InfoCardView>
  );
};

export default AnnualSavingsCardView;
