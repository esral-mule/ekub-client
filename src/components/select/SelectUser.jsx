import { CheckIcon, ChevronsUpDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/popover";
import { useState, useEffect, useCallback } from "react";
import API from "../../api/axios";
import { useTranslation } from "react-i18next";

export default function SelectUser({
  action,
  user,
}) {
  const { t } = useTranslation("global");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(""); // Controlled input state
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch filtered data based on search query
  const fetchFilteredData = useCallback(async (query) => {
    try {
      setLoading(true);
      const response = await API.get("/member/", {
        params: { searchQuery: query,queryName:"username" },
      });
      setFilteredData(response.data.data);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounce fetching to avoid frequent API requests
  const debounceFetch = useCallback(
    (query) => {
      const handler = setTimeout(() => {
        fetchFilteredData(query);
      }, 300); // 300ms debounce delay
      return () => clearTimeout(handler);
    },
    [fetchFilteredData]
  );

  // Effect to handle search input change
  useEffect(() => {
    if (search) {
      debounceFetch(search);
    } else {
      setFilteredData([]); // Clear data when no input
    }
  }, [search, debounceFetch]);

  // // Update selected value when it changes
  // useEffect(() => {
  //   action(selectedValue);
  // }, [selectedValue, action]);

  // Handle item selection
  const handleSelect = (value) => {
    action(value)
    setOpen(false);
    setSearch("");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="col-span-2 justify-between"
        >
          {user.username || t("addMember.selectUser")}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              value={search}
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)} // Update search state on change
              type="text"
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <CommandEmpty>
            {loading ? "Loading..." : `No ${t("addMember.selectUser")} found.`}
          </CommandEmpty>
          <CommandList>
            <CommandGroup>
              {filteredData.map((element) => {
                return (
                  <CommandItem
                    key={element._id}
                    onSelect={() => handleSelect(element)}
                  >
                    {element.username}
                    <CheckIcon
                      className={`ml-auto h-4 w-4 ${
                        user === element._id
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
