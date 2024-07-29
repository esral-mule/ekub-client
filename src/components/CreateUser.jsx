import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import API from "../api/axios"
import { useToast } from "./ui/use-toast"

export default function CreateUser() {
  const { toast } = useToast()

    const [fullName,setFullName] = useState("")
    const [phoneNumber,setPhoneNumber] = useState("")
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [isLoading,setIsLoading] = useState(false);

    const handleSubmit = ()=>{
        setIsLoading(true)
      API.post("/member", {
        fullName,
        phoneNumber,
        username,
        password
      }).then(()=>{
        setIsLoading(false)
        toast({
            description: "User created Successfuly",
          })
      }).catch(()=>{
        setIsLoading(false)
        toast({
            description: "User creat failed",
          })
    })
        
    }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Create User</DialogTitle>
          <DialogDescription className="text-center">
            Add Equb User
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Full Name
            </Label>
            <Input
              id="fullName"
              vlaue={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
            Phone Number
            </Label>
            <Input
              id="phoneNumber"
              display="none"
              vlaue={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="col-span-3 dis"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
            Username
            </Label>
            <Input
              id="username"
              vlaue={username}
              onChange={(e) => setUsername(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              vlaue={password}
              onChange={(e) => setPassword(e.target.value)}
              className="col-span-3"
            />
          </div>

        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} type="submit" disable={isLoading}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
