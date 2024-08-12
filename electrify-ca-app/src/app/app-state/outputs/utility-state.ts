import { atom, useSetAtom } from "jotai";
// import { useEffect } from "react";

export const zipCodeToUtilityAtom = atom<{ [key: string]: string }>({});
export const utilityAtom = atom<string>("Unknown");

// export const zipCodeToUtility = () => {
//   const setZipCodeToUtility = useSetAtom(zipCodeToUtilityAtom);

//   useEffect(() => {
//     const loadZipCodeToUtility = async () => {
//       try {
//         const response = await fetch("/data/zip-to-utility.json");
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         zipCodeToUtility(data);
//       } catch (error) {
//         console.error("Failed to load zip code to utility data:", error);
//       }
//     };

//     loadZipCodeToUtility();
//   }, [setZipCodeToUtility]);
// };

