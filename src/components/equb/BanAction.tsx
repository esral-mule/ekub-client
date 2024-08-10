import * as React from 'react'
import { DropdownMenuItem } from "../ui/dropdown-menu"


import { useToast } from "../ui/use-toast";
import API from "../../api/axios";
import { useNavigate } from "react-router";

export default function BanAction({ id, equb, setData }) {
  // console.log("state",state);

  let navigate = useNavigate();
  const { toast } = useToast()
  const handleBan = () => {
    API.delete(`/membership/${id}/`).then(data => {

      setData(prevData => prevData.filter(member => {
        if (member._id == id) {
          console.log("yeah");

        }
        return member._id !== id
      }));
      toast({
        title: "Member Delete",
        description: "Member deleted successfuly",
      })
      navigate(`/equbdetail/${equb._id}`)

    }).catch(e => {
      toast({
        title: "Member Delete",
        description: "Member Delete failed",
      })
    })

  }

  return (
    <DropdownMenuItem onClick={handleBan} style={{ background: "#d92929", color: "white" }}>Delete User</DropdownMenuItem>
  )
}
