import * as React from 'react'
import {  DropdownMenuItem} from "../ui/dropdown-menu"


import { useToast } from "../ui/use-toast";
import API from "../../api/axios";
import { useNavigate } from "react-router";

export default function BanAction(state) {
  let navigate = useNavigate();
  const { toast } = useToast()
  const handleBan = () => {
    API.delete(`/member/${state.id}/`).then(data => {
      console.log("state.id",state.id);
      console.log(data);
      
      toast({
        title: "Member Delete",
        description: "Member deleted successfuly",
      })
      navigate(`/equbdetail/${state.equbId}`)

    }).catch(e => {
      toast({
        title: "Member Delete",
        description: "Member Delete failed",
      })
    })

  }

  return (
    <DropdownMenuItem onClick={handleBan} style={{ background: "#d92929" ,color:"white" }}>Delete User</DropdownMenuItem>
  )
}
