import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { init, sendForm } from "emailjs-com";
import "./Contact.css";

init("user_ACIlhK9PWLR24gNpYF5wC");

function Contact() {
  const [contactNumber, setContactNumber] = useState("000000");
  const [statusMessage, setStatusMessage] = useState("Message");

  const generateContactNumber = () => {
    const numStr = "000000" + ((Math.random() * 1000000) | 0);
    setContactNumber(numStr.substring(numStr.length - 6));
  };

  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    const form = document.querySelector("#form");
    const statusMessage = document.querySelector(".status-message");
    const messageCharsLeft = document.querySelector(".message-chars-left");

    generateContactNumber();
    sendForm("default_service", "template_h9d7i89", "#form").then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
        form.reset();
        messageCharsLeft.textContent = 2000;
        setStatusMessage("Message sent!");
        statusMessage.className = "status-message success";
        setTimeout(() => {
          statusMessage.className = "status-message";
        }, 5000);
      },
      function (error) {
        console.log("FAILED...", error);
        setStatusMessage("Failed to send message! Please try again later.");
        statusMessage.className = "status-message failure";
        setTimeout(() => {
          statusMessage.className = "status-message";
        }, 5000);
      }
    );
    // console.log(data)
  };

  const message = watch("message") || "";
  const messageCharsLeft = 2000 - message.length;

  return (
    <div className="contact">
      <h1 className="contact-me">Contact Me</h1>
      <p className="status-message">{statusMessage}</p>
      <form id="form" className="topBefore" onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" name="contact_number" value={contactNumber} />
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          {...register("name", { required: true })}
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        <textarea
          name="message"
          id="email"
          placeholder="Message"
          maxLength="2000"
          {...register("message", { required: true })}
        />
        <p className="message-chars-left">{messageCharsLeft}</p>
        <input type="submit" id="submit" value="Send" />
      </form>
    </div>
  );
}
export default Contact;
