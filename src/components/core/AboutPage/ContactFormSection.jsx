import React from "react";
import ContactUsForm from "../../ContactPage/ContactUsForm";

const ContactFormSection = () => {
  return (
    <div className="mx-auto form">
      <h1 className="text-center text-3xl font-semibold text-richblack-5 sm:text-4xl">
        Get in Touch
      </h1>
      <p className="text-center text-richblack-300 mt-3">
        We&apos;d love to hear from you. Please fill out this form.
      </p>
      <div className="glass-card mx-auto mt-8 max-w-2xl p-6 sm:p-8">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactFormSection;
