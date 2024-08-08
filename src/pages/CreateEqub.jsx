import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";

import { Button } from "../components/ui/button";
import API from "../api/axios";
import { useNavigate } from "react-router";
import Transition from "../components/Transition";
import { useToast } from "../components/ui/use-toast";

const CreateEqub = () => {
  let navigate = useNavigate();
  const { toast } = useToast()
  const [name, setName] = useState("");
  const [contributionDay,setContributionDay] = useState("");
  const [lotteryDay, setLotteryDay] = useState("");
  const [contribution, setContribution] = useState("");
  const [maxUniqueIds, setMaxUniqueIds] = useState("");

  const [errors, setErrors] = useState({});
  const [isLoading,setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)
    API.post("/equb-type/", {
      name,
      contributionDay,
      lotteryDay,
      contribution,
      maxUniqueIds
    })
      .then(() => {
        setErrors({});
        toast({
          title: "Equb Create ",
          description: "Equb Created successfuly",
        })
        setIsLoading(false)
        navigate("/equbes");
      })
      .catch((err) => {
        const responseErrors = err.response?.data?.errors || [];
        const global =
          err.response?.data?.code === 500 ? "Validation Error" : "";
        let tempErrors = {};
        responseErrors.forEach((error) => {
          tempErrors[error.field] = error.messages;
        });
        setErrors({ ...tempErrors, global });
        setIsLoading(false)
      });
  };

  return (
    <Transition>
      <form className="max-w-lg mx-auto mt-5" onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Add New Equb To House</CardTitle>
          </CardHeader>
          {errors.global && (
            <div className="text-red-600 mb-[10px]">{errors.global}</div>
          )}
          <CardContent className="space-y-2">
            <div className="space-y-1 text-left">
              {errors.name && (
                <div className="text-red-600 mb-[10px]">{errors.name}</div>
              )}
              <Label htmlFor="name">Equb-Name</Label>
              <Input
                id="name"
                placeholder="Equb Name ..."
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>

            <div className="space-y-1 text-left">
              {errors.contributionDay && (
                <div className="text-red-600 mb-[10px]">{errors.contributionDay}</div>
              )}
              <Label htmlFor="contributionDay">Contribution Day</Label>
              <Input
                id="contributionDay"
                placeholder="ContributionDay ..."
                onChange={(e) => setContributionDay(e.target.value)}
                value={contributionDay}
              />
            </div>


            <div className="space-y-1 text-left">
              {errors.lotteryDay && (
                <div className="text-red-600 mb-[10px]">{errors.lotteryDay}</div>
              )}
              <Label htmlFor="lotteryDay">Lottery Day</Label>
              <Input
                id="lotteryDay"
                placeholder="LotteryDay ..."
                onChange={(e) => setLotteryDay(e.target.value)}
                value={lotteryDay}
              />
            </div>

            <div className="space-y-1 text-left">
              {errors.contribution && (
                <div className="text-red-600 mb-[10px]">{errors.contribution}</div>
              )}
              <Label htmlFor="contribution">Contribution</Label>
              <Input
                id="contribution"
                placeholder="Contribution ..."
                onChange={(e) => setContribution(e.target.value)}
                value={contribution}
              />
            </div>

            <div className="space-y-1 text-left">
              {errors.maxUniqueIds && (
                <div className="text-red-600 mb-[10px]">{errors.maxUniqueIds}</div>
              )}
              <Label htmlFor="maxUniqueIds">Maximum UniqueIds</Label>
              <Input
                id="maxUniqueIds"
                placeholder="maxUniqueIds ..."
                onChange={(e) => setMaxUniqueIds(e.target.value)}
                value={maxUniqueIds}
              />
            </div>

          </CardContent>
          <CardFooter>
            <Button disabled={isLoading}> {isLoading?"loading":"Create Equber"}</Button>
          </CardFooter>
        </Card>
      </form>
    </Transition>
  );
};

export default CreateEqub;