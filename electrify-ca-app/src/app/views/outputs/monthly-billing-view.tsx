import React from "react";
import { Group } from "@visx/group";
import { Bar } from "@visx/shape";
import { PatternLines } from "@visx/pattern";
import { useTooltip, useTooltipInPortal } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { LegendOrdinal } from "@visx/legend";

import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { GridRows } from "@visx/grid";
import { DateTime } from "luxon";
import { EnergyBill } from "../../../lib/billing";
import { ChartGroup, ChartHeader } from "../../chart";
import { useAtomValue } from "jotai";
import { Colors } from "../colors";
import { CUBIC_METER_PER_CCF } from "../../../lib/units";
import { Stack, Text } from "@chakra-ui/react";

interface BillViewProps {
  bill: EnergyBill;
}

function capitalizeWord(word: string): string {
  return word.replace(/^./, (x) => x.toUpperCase());
}

function formatUsage(bill: EnergyBill): React.ReactNode {
  let usage = bill.getFuelUsage();
  let unit: React.ReactNode = bill.getFuelUnit();

  if (unit === "ccf") {
    usage = usage * CUBIC_METER_PER_CCF;
    unit = (
      <>
        m<sup>3</sup>
      </>
    );
  }

  const formattedUsage = usage.toLocaleString("en-CA", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  return (
    <>
      {formattedUsage} {unit}
    </>
  );
}

const BillView: React.FC<BillViewProps> = ({ bill }) => {
  return (
    <>
      <Stack key={bill.getFuelType()} gap={0}>
        <Text>
          <u>{capitalizeWord(bill.getFuelType())} bill</u>
        </Text>
        <Text>
          <strong>Usage</strong>: {formatUsage(bill)}
        </Text>
        <Text>
          <strong>Total</strong>: ${bill.getTotalCost().toFixed(2)}
        </Text>
      </Stack>
    </>
  );
};

interface MonthlyBillingTooltipViewProps {
  name: string;
  bills: EnergyBill[];
}

const MonthlyBillingTooltipView: React.FC<MonthlyBillingTooltipViewProps> = (
  props
) => {
  const filteredBills = props.bills.filter((b) => b.getTotalCost() != 0);
  const grandTotal = props.bills.reduce((acc, b) => acc + b.getTotalCost(), 0);

  return (
    <Stack gap={"10px"}>
      <Text>{props.name}</Text>

      {filteredBills.map((bill, i) => (
        <BillView bill={bill} key={i} />
      ))}

      {filteredBills.length > 1 && (
        <Text>
          <strong>Grand total</strong>: ${grandTotal.toFixed(2)}
        </Text>
      )}
    </Stack>
  );
};
