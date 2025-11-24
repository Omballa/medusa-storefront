"use client";
import { title } from 'process';
import { Toaster, toast } from "@medusajs/ui"
import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', phone: ''});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // The endpoint points to your Medusa backend's custom API route
    const MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_URL || "http://localhost:9000";

    try {
      const response = await fetch(`${MEDUSA_BACKEND_URL}/store/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'x-publishable-api-key': process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || '' },
        body: new URLSearchParams(formData as any).toString(),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        toast.success("Success", {
            description: "Your message has been sent successfully.",
          })
        setFormData({ name: '', email: '', message: '', phone: ''}); // Clear form
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit form.');
      }
    } catch (error) {
        toast.error("Error", {
          description: "There was an error sending your message. Please try again.",
        });
      setStatus('error');
    }
  };

  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 p-2 rounded-md" />
        </div>

        <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 p-2 rounded-md" />
        </div>

        <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 p-2 rounded-md" />
        </div>
        
        <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4} required className="mt-1 block w-full border border-gray-300 p-2 rounded-md"></textarea>
        </div>

        <button
                type="submit"
                disabled={status === 'loading'}
                className="px-4 py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-800 disabled:bg-gray-500"
            >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
        </form>
    </>
  );
};

export default ContactForm;