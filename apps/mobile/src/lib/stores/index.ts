import { writable } from "svelte/store";
import { capacitorStorageStore } from "./capacitor-storage";
import type { Record } from "pocketbase";
import { Preferences } from "@capacitor/preferences";

export const navigationStack = capacitorStorageStore("history-length", window.history.length);
// @unocss-include
export const iconType = {
  info: "i-material-symbols-info-rounded bg-primaryBlue",
  warning: "i-carbon-warning-filled bg-amber",
  error: "i-icon-park-outline-error bg-red",
  success: "i-ep-success-filled bg-secondaryGreen",
};

interface btn {
  text: string;
  color: string;
  handler: () => void;
}
type PartiallyOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type btnWithOptionalColor = PartiallyOptional<btn, "color">;

let btn: btnWithOptionalColor = {
  text: "",
  color: "",
  handler: () => {},
};

export const modalState = writable({
  title: "",
  msg: "",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  buttons: [btn],
  icon: "",
});

export const currentUser = capacitorStorageStore<{
  email: string;
  password: string;
  model: Record;
} | null>("creds", null);

const { value } = (await Preferences.get({ key: "RoadheroSearchHistory" })) || {};

// export const searchHistory = writable(value ?? []);
export const searchHistory = writable(value ? JSON.parse(value) : []);

if (!value) await Preferences.set({ key: "RoadheroSearchHistory", value: JSON.stringify([]) });
