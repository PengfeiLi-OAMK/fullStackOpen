import type { Weather, Visibility } from "./types";

export const isWeather = (param: string): param is Weather => {
  return ["sunny", "rainy", "cloudy", "stormy", "windy"].includes(param);
}
export const isVisibility = (param: string): param is Visibility => {
  return ["great", "good", "ok", "poor"].includes(param);
}