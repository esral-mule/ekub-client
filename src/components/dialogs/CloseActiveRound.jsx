import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import SelectData from "../select/SelectData";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import API from "../../api/axios";
import { Combine, Paperclip } from "lucide-react";
import UniqueIdDetail from "../tables/UniqueIdDetail";
import Winner from "../icons/winner";

export default function CloseActiveRound({
  selectedOption,
  setSelectedOption,
}) {
  const { id: equbId } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [uniqueId, setUniqueId] = useState("");
  const [uniqueIds, setUniqueIds] = useState([]);
  const [selectedUniqueIdValue, setSelectedUniqueIdValue] = useState("");
  const [selectedUniqueIdLabel, setSelectedUniqueIdLabel] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const uniqueIdResponse = await API.get(`/uniqueid/etype/${equbId}`);
        setUniqueIds(
          uniqueIdResponse.data.data.map(({ uniqueId, _id }) => ({
            label: uniqueId.toString(),
            value: _id,
          }))
        );
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = () => {
    API.post("/beneficiary", {
      uniqueId: selectedUniqueIdValue,
    })
      .then((data) => {
        setOpenModal(false);

        return data.data.data;
      })
      .then(() => {
        API.put(`/round/${selectedOption._id}`, { closed: true }).then(() => {
          console.log("round closed");
        });
      })
      .then((data) => {
        API.get(`/round/etype/${equbId}`).then((resp) => {
          console.log("updated rounds", resp.data.data);
          setSelectedOption(resp.data.data);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button
          size="xs"
          onClick={() => {
            setOpenModal(true);
          }}
          className="mr-1 print:hidden bg-primary"
        >
          <Combine size={18} className="pr-1"/>
          Close Round
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Winner /> <p className="pl-1">Lottory day</p>
          </DialogTitle>
          <DialogDescription>Select winner unique Id</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="uniqueId" className="text-right">
              Unique Id
            </Label>
            <SelectData
              id="uniqueId"
              data={uniqueIds}
              name="Unique Id"
              action={setUniqueId}
              setSelectedValue={setSelectedUniqueIdValue}
              selectedValue={selectedUniqueIdValue}
              selectedLabel={selectedUniqueIdLabel}
              setSelectedLabel={setSelectedUniqueIdLabel}
            />
          </div>
          {selectedUniqueIdValue && (
            <div>
              <UniqueIdDetail uniqueID={selectedUniqueIdValue} />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            size="sm"
            className="h-8 gap-1"
            onClick={handleSubmit}
            type="submit"
          >
            <span>Close round</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
