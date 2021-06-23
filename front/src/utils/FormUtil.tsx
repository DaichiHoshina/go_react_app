import moment from "moment";

export const setFormString = (value: any): string => {
  return value == null ? "" : value;
};

export const setFormDateString = (value: any, format: string): string => {
  return value == null ? "" : moment(value).format(format);
};

export const setFormBoolean = (value: boolean | null | undefined): boolean => {
  return value === null || value === undefined ? false : value;
};
