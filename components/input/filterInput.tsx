"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "../ui/field";
import { Checkbox } from "../ui/checkbox";

type CategoryType = {
  baby: boolean;
  elderly: boolean;
  emergency: boolean;
};

const CATEGORY_TO_SLUG = {
  baby: "baby-care",
  elderly: "elderly-care",
  emergency: "emergency-care",
} as const;

export function DropDownFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filterParams = searchParams.get("services") ?? "";

  // ✅ derived state
  const category: CategoryType = {
    baby: filterParams.includes("baby-care"),
    elderly: filterParams.includes("elderly-care"),
    emergency: filterParams.includes("emergency-care"),
  };

  function applyFilter(next: CategoryType) {
    const services = Object.entries(next)
      .filter(([, checked]) => checked)
      .map(([key]) => CATEGORY_TO_SLUG[key as keyof CategoryType]);

    const params = new URLSearchParams(searchParams.toString());

    if (services.length > 0) {
      params.set("services", services.join(","));
    } else {
      params.delete("services");
    }

    router.push(`/cares?${params.toString()}`);
  }

  function toggle(key: keyof CategoryType, checked: boolean) {
    applyFilter({ ...category, [key]: checked });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>Filter</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='w-3xs'>
        <DropdownMenuGroup>
          <FieldSet className='p-2'>
            <FieldLegend>Services</FieldLegend>
            <FieldGroup className='gap-3 ml-4'>
              <Field orientation='horizontal'>
                <Checkbox
                  checked={category.baby}
                  onCheckedChange={(v) => toggle("baby", Boolean(v))}
                />
                <FieldLabel className='font-normal'>Baby Care</FieldLabel>
              </Field>

              <Field orientation='horizontal'>
                <Checkbox
                  checked={category.elderly}
                  onCheckedChange={(v) => toggle("elderly", Boolean(v))}
                />
                <FieldLabel className='font-normal'>Elderly Care</FieldLabel>
              </Field>

              <Field orientation='horizontal'>
                <Checkbox
                  checked={category.emergency}
                  onCheckedChange={(v) => toggle("emergency", Boolean(v))}
                />
                <FieldLabel className='font-normal'>Emergency Care</FieldLabel>
              </Field>
            </FieldGroup>
          </FieldSet>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
