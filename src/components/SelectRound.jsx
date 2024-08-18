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
export default function SelectRound({
  options,
  selectedOption,
  setSelectedOption,
}) {
  return (
    <Select
      value={selectedOption ? `${selectedOption.round}` : ""}
      onValueChange={(value) => {
        const selected = options.find((option) => `${option.round}` === value);
        setSelectedOption(selected);
      }}
    >
      <SelectTrigger className="w-[180px] mb-3 ml-1">
        <SelectValue placeholder="Select a cycle and round" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Rounds</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option._id} value={`${option.round}`}>
              {`Round ${option.round}`}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
