export type CareCategory = "Baby Care" | "Elderly Care" | "Emergency Care";

export interface CareInterface {
  _id: string;
  name: string;
  shortDescription: string;
  description: string;
  image: string;
  features: string[];
  category: CareCategory;
  pricePerHour?: number | null;
  pricePerDay?: number | null;
  pricePerTrip?: number | null;
}
