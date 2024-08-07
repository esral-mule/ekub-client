import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import API from "../api/axios";
import { useToast } from "./ui/use-toast";
import { useParams } from "react-router";

export default function CreateEqubLevel() {
  let { id } = useParams();

  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [contribution, setContribution] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    API.post("/equb-level", {
      equbType: id,
      title,
      contribution,
    })
      .then(() => {
        setIsLoading(false);
        setOpen(false);
        toast({
          description: "Equb level Added Successfully",
        });
      })
      .catch((error) => {
        setIsLoading(false);
        toast({
          description:
            error.response?.data?.message || "Equb Level creation failed",
        });
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="self-end">
          Add Equb Level
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Add Equb Level</DialogTitle>
          <DialogDescription className="text-center">
            Create and add new Equb Level
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="contribution" className="text-right">
              Contribution
            </Label>
            <Input
              id="contribution"
              value={contribution}
              onChange={(e) => setContribution(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
