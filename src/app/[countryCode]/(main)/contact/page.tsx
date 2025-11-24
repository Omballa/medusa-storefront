import ContactForm from '../components/ContactForm';
import { Metadata } from "next";

import React from 'react';

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with our team.",
}

const ContactPage = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4"> {/* Changed classes */}
    <div className="w-full max-w-lg"> {/* Added new wrapper to constrain form width */}
        <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
        {/* The form will go here */}
        <ContactForm />
    </div>
</div>
  );
};

export default ContactPage;