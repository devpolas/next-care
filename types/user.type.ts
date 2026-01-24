export interface UserInterface {
  id: string;
  provider: "google" | "credentials";
  username: string;
  email: string;
  password: string;
  image: string;
  role: "Admin" | "Doctor" | "Nurse" | "Receptionist" | "Patient";
}
