import dayjs from "dayjs";

export const dateJpYMD = (date: string): string => {
  return dayjs(date).format("YYYY月MM年DD日(ddd)");
};
// 表示用。24時間表記
export const returnDatetimeString = (
  date?: Date | string | null
): string | undefined => {
  return date ? dayjs(date).format("YYYY/MM/DD H:mm") : "";
};

export const returnDatetimeSecondString = (
  date?: Date | string | null
): string | undefined => {
  return date ? dayjs(date).format("YYYY/MM/DD H:mm:ss") : "";
};

export const returnDateString = (date?: Date | string | null): string => {
  return date ? dayjs(date).format("YYYY/MM/DD") : "";
};
