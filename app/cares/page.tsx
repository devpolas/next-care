import { use } from "react";
import { CareInterface } from "../../types/services.type";
import CareCard from "@/components/care/care-card";

export default function CareServices() {
  const fetchCares = async () => {
    const res = await fetch("http://localhost:3000/api/services");
    const data = await res.json();
    return data;
  };

  const data: { cares: CareInterface[] } = use(fetchCares());

  return (
    <div className='gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-8'>
      {data.cares.map((care: CareInterface) => (
        <CareCard key={care._id} care={care} />
      ))}
    </div>
  );
}
