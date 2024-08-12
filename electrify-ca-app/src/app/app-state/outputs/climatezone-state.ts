import { atom, useSetAtom } from "jotai";
// import { useEffect } from "react";

export const zipCodeToClimateZoneAtom = atom<{ [key: string]: string }>({});
export const climateZoneAtom = atom<string>("Unknown");

// export const zipCodeToClimateZone = () => {
//   const setZipCodeToClimateZone = useSetAtom(zipCodeToClimateZoneAtom);

//   useEffect(() => {
//     const loadZipCodeToClimateZone = async () => {
//       try {
//         const response = await fetch("/data/zip-to-climatezone.json");
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         setZipCodeToClimateZone(data);
//       } catch (error) {
//         console.error("Failed to load zip code to climate zone data:", error);
//       }
//     };

//     loadZipCodeToClimateZone();
//   }, [setZipCodeToClimateZone]);
// };

