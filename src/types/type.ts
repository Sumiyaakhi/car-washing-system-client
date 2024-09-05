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
  _id: string;
  name: string;
  img: string;
  description: string;
  price: number;
  duration: number;
};
export type TReview = {
  review: string;
  rating?: number;
};

export type TSlot = {
  _id: string;
  service: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: "available" | "booked" | "canceled";
  createdAt?: Date;
  updatedAt?: Date;
};

export type TBooking = {
  _id: string;
  serviceId: string;
  slotId: string;
  customer: object;
  service: object;
  slot: object;
  vehicleType: string;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
  tran_id: string;
  paymentStatus: string;
};
