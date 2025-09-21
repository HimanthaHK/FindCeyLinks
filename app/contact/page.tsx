"use client";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, Linkedin, Twitter, Facebook, MessageCircle, HelpCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1A2F5F] to-[#4A72D0] mb-4">
            Get In Touch
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Have questions about career opportunities or need support? Reach out to our team - we are here to help you navigate your professional journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 h-full border border-gray-100">
              <h2 className="text-2xl font-semibold text-[#1A2F5F] mb-8 flex items-center">
                <MessageCircle className="mr-2 w-6 h-6" />
                Contact Information
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-3 rounded-full mr-4 shadow-sm">
                    <Mail className="w-5 h-5 text-[#4A72D0]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Email Us</h3>
                    <p className="text-gray-600">info@careersrilanka.com</p>
                    <p className="text-gray-600">support@careersrilanka.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-3 rounded-full mr-4 shadow-sm">
                    <Phone className="w-5 h-5 text-[#4A72D0]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Call Us</h3>
                    <p className="text-gray-600">+94 11 234 5678</p>
                    <p className="text-gray-600">+94 77 123 4567</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-3 rounded-full mr-4 shadow-sm">
                    <MapPin className="w-5 h-5 text-[#4A72D0]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Visit Us</h3>
                    <p className="text-gray-600">123 Career Lane, Colombo 03</p>
                    <p className="text-gray-600">Sri Lanka</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-3 rounded-full mr-4 shadow-sm">
                    <Clock className="w-5 h-5 text-[#4A72D0]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Office Hours</h3>
                    <p className="text-gray-600">Mon - Fri: 8:30 AM - 5:30 PM</p>
                    <p className="text-gray-600">Sat: 9:00 AM - 1:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mt-10 pt-8 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-gradient-to-br from-blue-100 to-purple-100 p-3 rounded-full text-[#4A72D0] hover:from-[#4A72D0] hover:to-[#3A5BB0] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="bg-gradient-to-br from-blue-100 to-purple-100 p-3 rounded-full text-[#4A72D0] hover:from-[#4A72D0] hover:to-[#3A5BB0] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="bg-gradient-to-br from-blue-100 to-purple-100 p-3 rounded-full text-[#4A72D0] hover:from-[#4A72D0] hover:to-[#3A5BB0] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-10 h-full border border-gray-100">
              <h2 className="text-2xl font-semibold text-[#1A2F5F] mb-8 flex items-center">
                <Send className="mr-2 w-6 h-6" />
                Send us a Message
              </h2>
              
              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-green-800 mb-2">Message Sent Successfully!</h3>
                  <p className="text-green-600">We will get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A72D0] focus:border-[#4A72D0] outline-none transition shadow-sm focus:shadow-md"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A72D0] focus:border-[#4A72D0] outline-none transition shadow-sm focus:shadow-md"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A72D0] focus:border-[#4A72D0] outline-none transition shadow-sm focus:shadow-md"
                      placeholder="What is this regarding?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A72D0] focus:border-[#4A72D0] outline-none transition shadow-sm focus:shadow-md"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#4A72D0] to-[#3A5BB0] hover:from-[#3A5BB0] hover:to-[#2A4B8C] text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    <Send className="mr-2 w-5 h-5" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-[#1A2F5F] mb-12 flex justify-center items-center">
            <HelpCircle className="mr-3 w-8 h-8" />
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-semibold text-[#4A72D0] mb-3">How do I apply for a job?</h3>
              <p className="text-gray-600">
                Browse our job listings, click on a position that interests you, and use the Apply Now button to submit your application directly through our platform.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-semibold text-[#4A72D0] mb-3">Can I update my application after submitting?</h3>
              <p className="text-gray-600">
                Yes, you can update your application by logging into your account and accessing your application history within 24 hours of submission.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-semibold text-[#4A72D0] mb-3">How long does the hiring process take?</h3>
              <p className="text-gray-600">
                The hiring process typically takes 2-4 weeks, but this can vary depending on the company and the number of applicants.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-semibold text-[#4A72D0] mb-3">Do you offer career counseling?</h3>
              <p className="text-gray-600">
                Yes, we provide career counseling services. Please contact us to schedule an appointment with one of our career advisors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}