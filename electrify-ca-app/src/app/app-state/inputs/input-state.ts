import { atom } from "jotai";

// Primary inputs
export const zipCodeAtom = atom<string | null>(null);
export const seasonAtom = atom<string>("summer");
export const housingAtom = atom<string>("single_family_detatched");

// Technology inputs state
export const solarEnabledAtom = atom<boolean>(false);
export const electrifiedHouseholdEnabledAtom = atom<boolean>(false);
export const storageEnabledAtom = atom<boolean>(false);
export const heatpumpEnabledAtom = atom<boolean>(false);
export const stoveEnabledAtom = atom<boolean>(false);