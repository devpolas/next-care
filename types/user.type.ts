export type UserType = {
  provider: "google" | "credentials";
  username: string;
  email: string;
  password: string;
  profileImage: string;
  role: "Admin" | "Doctor" | "Nurse" | "Receptionist" | "Patient";
};
