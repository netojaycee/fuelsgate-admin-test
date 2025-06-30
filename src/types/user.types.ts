import { Roles } from "./authentication.types";

export type UserType = {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Roles;
  token: string;
  status: string;
  lastSeen: Date;
};

export type UpdatePasswordDto = {
  currentPassword: string;
  password: string;
};
