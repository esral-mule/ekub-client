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
} from "../components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function SelectUser(data) {
  const users = data.users;

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [search, setSearch] = React.useState("");

  const filteredUsers = users.filter(user =>
    user.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? value : "Select user..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search user..."
            onValueChange={(input) => setSearch(input)}
          />
          <CommandEmpty>No User found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {filteredUsers.map((user) => (
                <CommandItem
                  key={user.value}
                  onSelect={() => {
                    setValue(user.label);
                    setOpen(false);
                    setSearch("")
                  }}
                >
                  {user.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === user.label ? "opacity-100" : "opacity-0"
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
