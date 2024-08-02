import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  
  // eslint-disable-next-line react/prop-types
  export default function SelectRound({ options, selectedOption, setSelectedOption }) {
    return (
      <Select
        value={selectedOption ? `${selectedOption.cycle} ${selectedOption.round}` : ""}
        onValueChange={(value) => {
          const selected = options.find(
            (option) => `${option.cycle} ${option.round}` === value
          );
          setSelectedOption(selected);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a cycle and round" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Cycles and Rounds</SelectLabel>
            {options.map((option) => (
              <SelectItem
                key={`${option.cycle} ${option.round}`}
                value={`${option.cycle} ${option.round}`}
              >{`${option.cycle} ${option.round}`}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }
  