import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function Support() {
  const form = useRef();
  const [formData, setFormData] = useState({
    from_name: "",
    user_name: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let formErrors = {};

    if (!formData.user_name) {
      formErrors.user_name = "Name is required";
    }

    if (!formData.from_name) {
      formErrors.from_name = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.from_name)) {
      formErrors.from_name = "Email address is invalid";
    }

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

    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      emailjs
        .sendForm(
          "service_tirfu78",
          "template_8bmo1e7",
          form.current,
          "VW4wdWE-aTFNYn3Qs"
        )
        .then(
          () => {
            console.log("SUCCESS!");
          },
          (error) => {
            console.log("FAILED...", error.text);
          }
        );
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <form
      ref={form}
      onSubmit={sendEmail}
      className="rounded-lg border p-3 w-full sm:w-[500px] mx-auto mt-2"
    >
      <div className="flex items-center gap-2 my-1">
        <Label htmlFor="user_name" className="w-16">
          Name
        </Label>
        <Input
          id="user_name"
          type="text"
          placeholder="Your name"
          name="user_name"
          value={formData.user_name}
          onChange={handleInputChange}
        />
        {errors.user_name && (
          <p className="text-red-500 text-sm">{errors.user_name}</p>
        )}
      </div>

      <div className="flex items-center gap-2 my-1">
        <Label htmlFor="from_name" className="w-16">
          Email
        </Label>
        <Input
          id="from_name"
          type="email"
          placeholder="Your email"
          name="from_name"
          value={formData.from_name}
          onChange={handleInputChange}
        />
        {errors.from_name && (
          <p className="text-red-500 text-sm">{errors.from_name}</p>
        )}
      </div>

      <div className="flex items-center gap-2 my-1">
        <Label htmlFor="message" className="w-16">
          Message
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Type your message here..."
          className="min-h-12 p-3 focus-visible:ring-0"
          value={formData.message}
          onChange={handleInputChange}
        />
        {errors.message && (
          <p className="text-red-500 text-sm">{errors.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="m-1">
          Send Email
        </Button>
      </div>
    </form>
  );
}
