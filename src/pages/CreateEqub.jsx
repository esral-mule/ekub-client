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
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

const CreateEqub = () => {
  const { t } = useTranslation("global");

  let navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [contribution, setContribution] = useState("");
  const [maxUniqueIds, setMaxUniqueIds] = useState("");
  const [contributionDay, setContributionDay] = useState("");
  const [lotteryDay, setLotteryDay] = useState("");

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {    
    e.preventDefault();
    setIsLoading(true);
    API.post("/equb-type/", {
      name,
      contribution,
      maxUniqueIds,
      contributionDay:contributionDay ? Number(contributionDay) : undefined,
      lotteryDay: lotteryDay ? Number(lotteryDay) : undefined,
    })
      .then(() => {
        setErrors({});
        toast({
          title: "Equb Create ",
          description: "Equb Created successfuly",
        });
        setIsLoading(false);
        navigate("/equbes");
      })
      .catch((err) => {
        const responseErrors = err.response?.data.errors || [];
        const global = err.response?.data?.message;
        let tempErrors = {};       
        responseErrors.forEach((errorObj) => {
          let errorMessage = errorObj.messages;
      
          tempErrors[errorObj.field] = errorMessage;
        });
        setErrors({ ...tempErrors, global });
        setIsLoading(false);
      });
  };

  return (
    <Transition>
      <form className="max-w-lg mx-auto mt-5" onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>{t("createeqube.title")}</CardTitle>
          </CardHeader>
          {errors.global && (
            <div className="text-red-600 mb-[10px]">{errors.global}</div>
          )}
          <CardContent className="space-y-2">
            <div className="space-y-1 text-left">
              {errors.name && (
                <div className="text-red-600 text-xs">{errors.name}</div>
              )}
              <Label htmlFor="name">{t("createeqube.equbName")}</Label>
              <Input
                id="name"
                placeholder={t("createeqube.placeHolder.equbName")}
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>

            <div className="space-y-1 text-left">
              {errors.contribution && (
                <div className="text-red-600 text-xs">
                  {errors.contribution}
                </div>
              )}
              <Label htmlFor="contribution">
                {t("createeqube.contribution")}
              </Label>
              <Input
                id="contribution"
                placeholder={t("createeqube.placeHolder.contribution")}
                onChange={(e) => setContribution(e.target.value)}
                value={contribution}
              />
            </div>

            <div className="space-y-1 text-left">
              {errors.maxUniqueIds && (
                <div className="text-red-600 text-xs">
                  {errors.maxUniqueIds}
                </div>
              )}
              <Label htmlFor="maxUniqueIds">
                {t("createeqube.maxUniqueIds")}
              </Label>
              <Input
                id="maxUniqueIds"
                placeholder={t("createeqube.placeHolder.maxUniqueIds")}
                onChange={(e) => setMaxUniqueIds(e.target.value)}
                value={maxUniqueIds}
              />
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>{t("createeqube.more")}</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-1 text-left mx-2">
                    {errors.contributionDay && (
                      <div className="text-red-600 text-xs">
                        {errors.contributionDay}
                      </div>
                    )}
                    <Label htmlFor="contributionDay">
                      {t("createeqube.contributionDay")}
                    </Label>
                    <Input
                      id="contributionDay"
                      placeholder={t("createeqube.placeHolder.contributionDay")}
                      onChange={(e) => setContributionDay(e.target.value)}
                      value={contributionDay}
                    />
                    <div className="flex justify-end gap-1">
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => {
                          setContributionDay(1);
                        }}
                        size="xs"
                      >
                        {t("createeqube.daily")}
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => {
                          setContributionDay(7);
                        }}
                        size="xs"
                      >
                        {t("createeqube.weekly")}
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => {
                          setContributionDay(30);
                        }}
                        size="xs"
                      >
                        {t("createeqube.monthly")}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-1 text-left mt-2 mx-2">
                    {errors.lotteryDay && (
                      <div className="text-red-600 text-xs">
                        {errors.lotteryDay}
                      </div>
                    )}
                    <Label htmlFor="lotteryDay">
                      {t("createeqube.lotteryDay")}
                    </Label>
                    <Input
                      id="lotteryDay"
                      placeholder={t("createeqube.placeHolder.lotteryDay")}
                      onChange={(e) => setLotteryDay(e.target.value)}
                      value={lotteryDay}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              disabled={
                isLoading ||
                name == "" ||
                contribution == "" ||
                maxUniqueIds == "wew"
              }
            >
              {isLoading ? t("createeqube.loading") : t("createeqube.create")}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Transition>
  );
};

export default CreateEqub;
