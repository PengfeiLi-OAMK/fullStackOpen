
export type Weather = "sunny" | "rainy" | "cloudy" | "stormy"| "windy";
export type Visibility = "great" | "good" | "ok" | "poor";

export type DiaryEntry = {
  id: number;
  date: string; // ISO string from API
  weather: Weather;
  visibility: Visibility;
  comment: string;
};
export type NewDiaryPayload = {
  date: string;
  visibility: string;
  weather: string;
  comment: string;
};