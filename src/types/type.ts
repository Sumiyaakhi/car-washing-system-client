import { ReactNode } from "react";

export type TRoute = {
  path: string;
  element: ReactNode;
};

export type TUserPath = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TUserPath[];
};
export type TSidebarItem = {
  key: string;
  label: ReactNode;
  children?: TSidebarItem[];
};

export type TUser = {
  name: string;
  email: string;
  phone: string;
  img: string;
  role: string;
  password: string;
  address: string;
};

export type TAutState = {
  user: null | object;
  token: null | string;
};

export type TService = {
  id: number;
  img: string;
  name: string;
  description: string;
};
export type TReview = {
  review: string;
  rating?: number;
};
