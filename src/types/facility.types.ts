export type TFacility = {
  _id: string;
  image?: string;
  name: string;
  description: string;
  pricePerHour: number;
  location: string;
  isDeleted: boolean;
};

export type TBooking = {
  _id: string;
  facility: TFacility;
  date: string;
  startTime: string;
  endTime: string;
  user?: TUser;
  payableAmount: number;
  paymentStatus: string;
  transactionId: string;
  isBooked: string;
};

export type TUser = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  address: string;
};
