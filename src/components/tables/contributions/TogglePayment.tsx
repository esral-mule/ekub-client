import * as React from 'react'
import { useToast } from "../../ui/use-toast";
import UpdatePaymentStatus from "../../dialogs/UpdatePaymentStatus";
import API from "../../../api/axios";

export default function TogglePayment({ id, status, RoundId, getContributions }) {
  const { toast } = useToast()
  const [isloading, setIsloading] = React.useState(false)
  const handlePaymentStatusChange = () => {
    setIsloading(true)
    API.put(`/contribution/${id}/`, {
      "isPaid": !status
    }).then(() => {
      getContributions()
    }).then(
      () => {
        toast({
          title: "Payment status Update",
          description: "Payment status Updated successfuly",
        })

        setIsloading(false)
      }
    ).catch(e => {
      setIsloading(false)
      toast({
        title: "Payment status Update",
        variant: "destructive",
        description: "Payment status Update failed",
      })
    })

  }

  return (

    <UpdatePaymentStatus UpdatePaymentStatus={handlePaymentStatusChange} isloading={isloading} />
  )
}
