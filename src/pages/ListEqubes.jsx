import { useTranslation } from "react-i18next";

import API from "../api/axios";
import { useState, useEffect } from "react";

import { BellRing, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";


export default function ListEqubes() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    API.get("/equb-type/", {})
      .then((data) => {
        setData(data.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="pt-2">
      {/* <h1>{t("coming.message")}</h1> */}
      <div className="flex justify-center">
      {isLoading && <div>loading</div>}
      {data &&
        data.map((equb) => (
          <Card key={equb._id} className={cn("w-[380px]")}>
            <CardHeader>
              <CardTitle>{equb.name}</CardTitle>
              <CardDescription>{equb.period}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">

              <div className="mb-2 flex justify-center gap-5">
                <p className="text-sm font-medium leading-none">Cycle - {equb.cycle}</p>
                <p className="text-sm font-medium leading-none">Round - {equb.round}</p>
              </div>

              <div className="mb-2">
                <p className="text-sm font-medium leading-none">Lottery-Day : {equb.lotteryDay}</p>
              </div>

              <div className="mb-2">
                <p className="text-sm font-medium leading-none">Max-UniqueIds : {equb.maxUniqueIds}</p>
              </div>

              <div className="mb-2">
                <p className="text-sm font-medium leading-none">Contribution-Day : {equb.contributionDay}</p>
              </div>
              <div className="mb-2">
                <p className="text-sm font-medium leading-none">Created-At : {new Date(equb.createdAt).getFullYear()} {new Date(equb.createdAt).getMonth()} {new Date(equb.createdAt).getDate()}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Link className="w-full" to="/equbdetail">Detail</Link>
              </Button>
            </CardFooter>
          </Card>
          
        ))}
      </div>
    </div>
  );
}
