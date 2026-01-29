import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React from "react";

export function SearchInput({
  setIsSearch,
}: {
  setIsSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Field>
      <FieldLabel htmlFor='input-button-group'>Search</FieldLabel>
      <ButtonGroup>
        <Input
          onChange={(e) => setIsSearch(e.target.value)}
          id='input-button-group'
          placeholder='Type to search...'
        />
        <Button variant='outline'>Search</Button>
      </ButtonGroup>
    </Field>
  );
}
