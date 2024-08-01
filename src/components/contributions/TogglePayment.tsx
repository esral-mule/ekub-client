import * as React from 'react'
import { Button } from "../ui/button"


import { useToast } from "../ui/use-toast";
import API from "../../api/axios";
import { useNavigate } from "react-router";

export default function TogglePayment({id,status}) {
  let navigate = useNavigate();
  const { toast } = useToast()
  const handlePaymentStatusChange = () => {

    console.log("state",!status);
    console.log("id",id);
    
    API.put(`/contribution/${id}/`,{
              "isPaid": !status
    }).then(data => {
      console.log("state.id",id);
      console.log(data);
      
      toast({
        title: "Payment status Update",
        description: "Payment status Updated successfuly",
      })

    }).catch(e => {
      toast({
        title: "Payment status Update",
        description: "Payment status Update failed",
      })
    })

  }

  return (

    <Button onClick={handlePaymentStatusChange}>
    Update
  </Button>
  )
}
