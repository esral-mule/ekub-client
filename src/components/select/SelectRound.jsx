import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";

// eslint-disable-next-line react/prop-types
export default function SelectRound({
  options,
  selectedOption,
  setSelectedOption,
}) {

  const { t } = useTranslation("global");

  return (
    <Select
      value={selectedOption ? `${selectedOption.round}` : ""}
      onValueChange={(value) => {
        const selected = options.find((option) => `${option.round}` === value);
        setSelectedOption(selected);
      }}
    >
      <SelectTrigger className="w-[180px] mb-3 ml-1">
        <SelectValue placeholder={t("selectRound.placeholder")}/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t("selectRound.roundes")}</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option._id} value={`${option.round}`}>
              {`${t("selectRound.round")} ${option.round}`}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
