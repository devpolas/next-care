export type CareCategory = "Baby Care" | "Elderly Care" | "Emergency Care";

export interface Service {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  image: string;
  features: string[];
  pricePerHour?: number | null;
  pricePerDay?: number | null;
  pricePerTrip?: number | null;
}

export interface CategoryServices {
  category: CareCategory;
  services: Service[];
}
