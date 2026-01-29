"use client";
import { useEffect, useMemo, useState } from "react";
import { CareInterface } from "../../types/services.type";
import CareCard from "@/components/care/care-card";
import Paginating from "@/components/pagination/pagination";
import { useSearchParams } from "next/navigation";
import { SearchInput } from "@/components/input/searchInput";
import { DropDownFilter } from "@/components/input/filterInput";

type ResponseType = {
  success: boolean;
  totalPae: number;
  page: number;
  limit: number;
  cares: CareInterface[];
};

export default function CareServices() {
  const [loading, setLoading] = useState(true);
  const [isSearch, setIsSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalServices, setTotalServices] = useState<ResponseType | null>(null);
  const [isError, setIsError] = useState<string>("");
  const searchParams = useSearchParams();
  const servicesParam = searchParams.get("services");

  useEffect(() => {
    setCurrentPage(1);
  }, [servicesParam]);

  useEffect(() => {
    async function fetchServices() {
      setLoading(true);
      setIsError("");
      try {
        const res = await fetch(
          `http://localhost:3000/api/services?page=${currentPage}&filter=${servicesParam || ""}&search=${isSearch || ""}`,
        );

        if (!res.ok) {
          throw new Error("failed to fetch services");
        }

        const data: ResponseType = await res.json();

        setTotalServices(data);
      } catch (error) {
        if (error instanceof Error) {
          setIsError(error.message);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, [currentPage, servicesParam, isSearch]);

  return (
    <div className='flex flex-col justify-between py-4 w-full'>
      <div className='flex flex-row justify-between items-center w-full'>
        <div className='max-w-2xs md:max-w-sm'>
          <SearchInput setIsSearch={setIsSearch} />
        </div>
        <div className='max-w-3xs'>
          <DropDownFilter />
        </div>
      </div>
      {isError && (
        <p className='text-red-500 text-2xl text-center'>{isError}</p>
      )}

      {loading && (
        <p className='text-muted-foreground text-center'>Loading services...</p>
      )}

      {!loading && totalServices?.cares.length === 0 && <p>No care found!</p>}

      <div className='gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-4'>
        {totalServices?.cares.map((care) => (
          <CareCard key={care._id} care={care} />
        ))}
      </div>

      {totalServices && totalServices?.totalPae > 1 && (
        <Paginating
          setCurrentPag={setCurrentPage}
          currentPage={currentPage}
          totalPage={totalServices?.totalPae || 1}
        />
      )}
    </div>
  );
}
