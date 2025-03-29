
export type UserRole = "farmer" | "distributor" | "financial" | "regulator" | null;

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}
