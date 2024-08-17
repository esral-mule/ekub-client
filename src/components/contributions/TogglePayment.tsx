import * as React from 'react'
import { Button } from "../ui/button"


import { useToast } from "../ui/use-toast";
import API from "../../api/axios";
import { useNavigate } from "react-router";

export default function TogglePayment({ id, status, RoundId, setContributions }) {
  let navigate = useNavigate();
  const { toast } = useToast()
  const handlePaymentStatusChange = () => {

    API.put(`/contribution/${id}/`, {
      "isPaid": !status
    }).then(data => {
      toast({
        title: "Payment status Update",
        description: "Payment status Updated successfuly",
      })

    }).then(() => {

      API.get(`/contribution/round/${RoundId}`).then(data => {

        setContributions(data.data.data)
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
