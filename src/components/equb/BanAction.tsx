import * as React from 'react'
import {  DropdownMenuItem} from "../ui/dropdown-menu"


import { useToast } from "../ui/use-toast";
import API from "../../api/axios";
import { useNavigate } from "react-router";

export default function BanAction(state) {
  let navigate = useNavigate();
  const { toast } = useToast()
  const handleBan = () => {
    API.patch(`/users/${state.id}/`, {
      isActive: !state.isActive
    }).then(e => {
      toast({
        title: "User ban",
        description: "user baned successfuly",
      })
      navigate(`/housedetail/${state.id}`)

    }).catch(e => {
      toast({
        title: "User ban",
        description: "user ban failed",
      })
    })

  }

  return (
    <DropdownMenuItem onClick={handleBan} style={{ background: state.isActive ? "#d92929" : "#2fad53", color:"white" }}>{state.isActive ? <div>Ban House</div> : <div>unBan House</div>}</DropdownMenuItem>
  )
}
