import * as React from 'react'
import { useToast } from "../../ui/hooks/use-toast";
import UpdatePaymentStatus from "../../dialogs/UpdatePaymentStatus";
import API from "../../../api/axios";

export default function TogglePayment({ contribution, status, getContributions }) {
  const { toast } = useToast()
  const [isloading, setIsloading] = React.useState(false)

  const handlePaymentStatusChange = (punishment) => {
    setIsloading(true)
    API.put(`/contribution/${contribution._id}/`, {
      "isPaid": !status,
      punishment: punishment === "" ? 0 : punishment
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
      console.log(e);
      
      setIsloading(false)
      toast({
        title: "Payment status Update",
        variant: "destructive",
        description: "Payment status Update failed",
      })
    })

  }

  return (

    <UpdatePaymentStatus contribution={contribution} UpdatePaymentStatus={handlePaymentStatusChange} isloading={isloading} />
  )
}
