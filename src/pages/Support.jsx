import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import Transition from "../components/Transition";

export default function Support() {
  const [isLoading,setIsLoading] = useState(false);
  const form = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let formErrors = {};
    
    // Name validation
    if (!formData.name) {
      formErrors.name = "Name is required";
    }

    // Email validation
    if (!formData.email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email address is invalid";
    }

    // Message validation
    if (!formData.message) {
      formErrors.message = "Message is required";
    }

    return formErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    // Validate before submitting
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      // No validation errors, send email
    setIsLoading(true)

      emailjs
        .sendForm(
          "service_tirfu78",
          "template_8bmo1e7",
          form.current,
          "VW4wdWE-aTFNYn3Qs"
        )
        .then(
          () => {
            setIsLoading(false)
            console.log("SUCCESS!");
          },
          (error) => {
            setIsLoading(false)
            console.log("FAILED...", error.text);
          }
        );
    } else {
      setErrors(formErrors);
      setIsLoading(false)
    }
  };

  return (
    <Transition>

    <form
      ref={form}
      onSubmit={sendEmail}
      className="max-w-lg mx-auto mt-5"
    >
      <div className="space-y-1 text-left">
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        <Label htmlFor="name" className="w-16">
          Name
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Your name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-1 text-left">
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        <Label htmlFor="email" className="w-16">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Your email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-1 text-left">
        {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
        <Label htmlFor="message" className="w-16">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Type your message here..."
          className="min-h-12 p-3 focus-visible:ring-0"
          value={formData.message}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="mx-1 mt-3"> {isLoading?"Sending":"Send Email"}</Button>
      </div>
    </form>
    </Transition>
  );
}
