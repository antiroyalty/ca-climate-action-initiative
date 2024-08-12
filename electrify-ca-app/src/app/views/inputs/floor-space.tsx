import React from "react";
import { NumericFormInputView } from "../forms";
import { floorSpaceSqFtAtom } from "../../app-state/config-state";
import { useAtomAndTrack } from "../../analytics";

const FloorSpaceInput: React.FC = () => {
  const [floorSpaceSqFt, setFloorSpaceSqFt, track] = useAtomAndTrack(
    floorSpaceSqFtAtom,
    "floorSpaceSqFt"
  );

  return (
    <NumericFormInputView
      label="Square footage"
      placeholder="2500"
      minValue={100}
      maxValue={100000}
      value={floorSpaceSqFt}
      setValue={setFloorSpaceSqFt}
      textAlign={"right"}
      tooltip={
        <>
          The square footage of your house is used to better estimate heating
          and cooling costs. Larger homes tend to require more energy to heat
          and cool.
        </>
      }
      suffix={
        <>
          ft<sup>2</sup>
        </>
      }
      onBlur={track}
    />
  );
};

export default FloorSpaceInput;
