import * as React from "react";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./../ui/popover";

// eslint-disable-next-line react/prop-types
export default function SelectEqubLevel({ data, name, setEqubLevel,equbLevel}) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const filteredData = data.filter((element) =>
    element.label.toLowerCase().includes(search.toLowerCase())
  );

  // useEffect(() => {
  //   action(selectedValue);
  // }, [selectedValue, action]);

  const handleSelect = (value) => {
    setEqubLevel(value);
    setOpen(false);
    setSearch("");
  };

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="col-span-2 justify-between"
        >
          <div className="max-w-[100%] truncate">
          {equbLevel ? `${equbLevel.label} / ${equbLevel.contribution}` : name}

          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <CommandEmpty>Not found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {filteredData.map((element) => (
                <CommandItem
                  className="text-ellipsis"
                  key={element.value}
                  onSelect={() => handleSelect(element)}
                >
                  {`${element.label} / ${element.contribution}`}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      equbLevel.value === element.value
                        ? "opacity-100"
                        : "opacity-0"
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
