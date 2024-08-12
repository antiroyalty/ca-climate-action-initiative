import React, { useMemo } from "react";
import { useAtomValue } from "jotai";
import { Text, Box, Heading } from "@chakra-ui/react";
import { dailyCostsAtom } from "../../app-state/outputs/costs/daily-costs-state";
import { ChartGroup, ChartHeader } from "../../chart";
import { scaleLinear, scaleTime } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { LinePath } from "@visx/shape";
import { Group } from "@visx/group";
import { GridRows } from "@visx/grid";
import { DateTime } from "luxon";
import { InfoCardView } from "../cards";

const DailyCostsCardView: React.FC = () => {
  console.log("Daily Costs Card View is loaded");
  const dailyCosts = useAtomValue(dailyCostsAtom);

  const margin = { top: 10, right: 30, bottom: 40, left: 60 },
    width = 430 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

  const dailyCostsSeries = useMemo(() => {
    const series: [Date, number][] = [];
    const startYear = DateTime.utc().year;
    const dailyCostsValue = dailyCosts;
    for (let i = 0; i <= 10; i++) {
      series.push([DateTime.utc(startYear + i).toJSDate(), dailyCostsValue]);
    }
    return series;
  }, [dailyCosts]);

  const x = scaleTime({
    domain: [
      DateTime.utc(DateTime.utc().year, 1, 1).toJSDate(),
      DateTime.utc(DateTime.utc().year + 10, 1, 1).toJSDate(),
    ],
    range: [0, width],
  });

  const y = scaleLinear<number>({
    domain: [0, dailyCosts],
    range: [height, 0],
  }).nice();

  return (
    <InfoCardView title={"Daily Electricity Costs"}>
      <Heading>Daily Costs: ${dailyCosts.toLocaleString(undefined,  {minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Heading>
      {/* <ChartGroup>
        <ChartHeader>Daily Costs Over Time</ChartHeader>
        <svg
          viewBox={`0 0 ${width + margin.left + margin.right} ${
            height + margin.top + margin.bottom
          }`}
          style={{ width: "100%", height: "auto", background: "white" }}
        >
          <Group left={margin.left} top={margin.top}>
            <GridRows scale={y} width={width} />
            <LinePath
              data={dailyCostsSeries}
              x={(d) => x(d[0])}
              y={(d) => y(d[1])}
              stroke="red"
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

export default DailyCostsCardView;
