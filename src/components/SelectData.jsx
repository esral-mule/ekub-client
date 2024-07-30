import * as React from "react";
import { CheckIcon, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect } from "react";
// eslint-disable-next-line react/prop-types
export default function SelectData({data, name,action}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [search, setSearch] = React.useState("");

  const filteredUsers = data.filter(element =>
    element.label.toLowerCase().includes(search.toLowerCase())
  );
  
  useEffect(()=>{
      action(value)
  },[value,action])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? value : `Select ${name}...`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search user..."
            onChange={(input) => setSearch(input)}
          />
          <CommandEmpty>No {`${name}`} found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {filteredUsers.map((element) => (
                <CommandItem
                  key={element.value}
                  onSelect={() => {
                    setValue(element.value);
                    setOpen(false);
                    setSearch("")
                  }}
                >
                  {element.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === element.label ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
