import * as React from 'react'
import { useToast } from "../../ui/use-toast";
import UpdatePaymentStatus  from "../../dialogs/UpdatePaymentStatus";
import API from "../../../api/axios";

export default function TogglePayment({ id, status, RoundId, setContributions }) {
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
        console.log(data);
        
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

<UpdatePaymentStatus UpdatePaymentStatus={handlePaymentStatusChange}/>
  )
}
