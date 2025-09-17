"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Linkedin, Twitter, Instagram, Mail, Phone, MapPin, Heart, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <footer className="bg-gradient-to-r from-[#1A2F5F] via-[#2A4B8C] to-[#1A2F5F] border-t border-white/20 text-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
          
          {/* Brand Section - Always visible on mobile */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" aria-label="CEYLinks Home" className="flex items-center mb-4">
              <Image
                src="/ceylogo.png"
                alt="CEYLinks Logo"
                width={80}
                height={80}
                className="w-auto"
              />
            </Link>
            <p className="text-sm text-gray-200 mb-4 text-center md:text-left max-w-xs">
              Connecting talented professionals with the right opportunities across Sri Lanka.
            </p>
            <div className="flex space-x-3 mb-6 md:mb-0">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                 className="bg-white/10 p-2 rounded-full hover:bg-[#4A72D0] transition-all duration-300">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                 className="bg-white/10 p-2 rounded-full hover:bg-[#4A72D0] transition-all duration-300">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                 className="bg-white/10 p-2 rounded-full hover:bg-[#4A72D0] transition-all duration-300">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                 className="bg-white/10 p-2 rounded-full hover:bg-[#4A72D0] transition-all duration-300">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links - Collapsible on mobile */}
          <div className="md:flex flex-col">
            <button 
              className="md:hidden flex items-center justify-between w-full py-3 text-lg font-semibold text-white"
              onClick={() => toggleSection('quick-links')}
            >
              <span className="flex items-center">
                <span className="w-2 h-2 bg-[#4A72D0] rounded-full mr-2"></span>
                Quick Links
              </span>
              <ChevronRight className={`w-4 h-4 transition-transform ${expandedSection === 'quick-links' ? 'rotate-90' : ''}`} />
            </button>
            <h3 className="hidden md:block text-lg font-semibold mb-4 text-white flex items-center">
              <span className="w-2 h-2 bg-[#4A72D0] rounded-full mr-2"></span>
              Quick Links
            </h3>
            <div className={`${expandedSection === 'quick-links' ? 'block' : 'hidden'} md:block space-y-3 pb-3 md:pb-0`}>
              <Link href="/jobs" className="text-gray-200 hover:text-[#4A72D0] transition-colors flex items-center group">
                <span className="w-1 h-1 bg-gray-400 rounded-full mr-2 group-hover:bg-[#4A72D0]"></span>
                Jobs
              </Link>
              <Link href="/courses" className="text-gray-200 hover:text-[#4A72D0] transition-colors flex items-center group">
                <span className="w-1 h-1 bg-gray-400 rounded-full mr-2 group-hover:bg-[#4A72D0]"></span>
                Courses
              </Link>
              <Link href="/askjob" className="text-gray-200 hover:text-[#4A72D0] transition-colors flex items-center group">
                <span className="w-1 h-1 bg-gray-400 rounded-full mr-2 group-hover:bg-[#4A72D0]"></span>
                Ask a Job
              </Link>
              <Link href="/postjob" className="text-gray-200 hover:text-[#4A72D0] transition-colors flex items-center group">
                <span className="w-1 h-1 bg-gray-400 rounded-full mr-2 group-hover:bg-[#4A72D0]"></span>
                Post a Job
              </Link>
            </div>
          </div>

          {/* Resources - Collapsible on mobile */}
          <div className="md:flex flex-col">
            <button 
              className="md:hidden flex items-center justify-between w-full py-3 text-lg font-semibold text-white"
              onClick={() => toggleSection('resources')}
            >
              <span className="flex items-center">
                <span className="w-2 h-2 bg-[#4A72D0] rounded-full mr-2"></span>
                Resources
              </span>
              <ChevronRight className={`w-4 h-4 transition-transform ${expandedSection === 'resources' ? 'rotate-90' : ''}`} />
            </button>
            <h3 className="hidden md:block text-lg font-semibold mb-4 text-white flex items-center">
              <span className="w-2 h-2 bg-[#4A72D0] rounded-full mr-2"></span>
              Resources
            </h3>
            <div className={`${expandedSection === 'resources' ? 'block' : 'hidden'} md:block space-y-3 pb-3 md:pb-0`}>
              <Link href="/blog" className="text-gray-200 hover:text-[#4A72D0] transition-colors flex items-center group">
                <span className="w-1 h-1 bg-gray-400 rounded-full mr-2 group-hover:bg-[#4A72D0]"></span>
                Career Blog
              </Link>
              <Link href="/resume-tips" className="text-gray-200 hover:text-[#4A72D0] transition-colors flex items-center group">
                <span className="w-1 h-1 bg-gray-400 rounded-full mr-2 group-hover:bg-[#4A72D0]"></span>
                Resume Tips
              </Link>
              <Link href="/interview-advice" className="text-gray-200 hover:text-[#4A72D0] transition-colors flex items-center group">
                <span className="w-1 h-1 bg-gray-400 rounded-full mr-2 group-hover:bg-[#4A72D0]"></span>
                Interview Advice
              </Link>
              <Link href="/faq" className="text-gray-200 hover:text-[#4A72D0] transition-colors flex items-center group">
                <span className="w-1 h-1 bg-gray-400 rounded-full mr-2 group-hover:bg-[#4A72D0]"></span>
                FAQ
              </Link>
            </div>
          </div>

          {/* Contact Info - Collapsible on mobile */}
          <div className="md:flex flex-col">
            <button 
              className="md:hidden flex items-center justify-between w-full py-3 text-lg font-semibold text-white"
              onClick={() => toggleSection('contact')}
            >
              <span className="flex items-center">
                <span className="w-2 h-2 bg-[#4A72D0] rounded-full mr-2"></span>
                Contact Us
              </span>
              <ChevronRight className={`w-4 h-4 transition-transform ${expandedSection === 'contact' ? 'rotate-90' : ''}`} />
            </button>
            <h3 className="hidden md:block text-lg font-semibold mb-4 text-white flex items-center">
              <span className="w-2 h-2 bg-[#4A72D0] rounded-full mr-2"></span>
              Contact Us
            </h3>
            <div className={`${expandedSection === 'contact' ? 'block' : 'hidden'} md:block space-y-3 pb-3 md:pb-0`}>
              <div className="flex items-start">
                <Mail className="w-4 h-4 text-[#4A72D0] mt-0.5 mr-3 flex-shrink-0" />
                <a href="mailto:support@ceylinks.com" className="text-gray-200 hover:text-white transition-colors text-sm">
                  support@ceylinks.com
                </a>
              </div>
              <div className="flex items-start">
                <Phone className="w-4 h-4 text-[#4A72D0] mt-0.5 mr-3 flex-shrink-0" />
                <a href="tel:+94771234567" className="text-gray-200 hover:text-white transition-colors text-sm">
                  +94 77 123 4567
                </a>
              </div>
              <div className="flex items-start">
                <MapPin className="w-4 h-4 text-[#4A72D0] mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-gray-200 text-sm">
                  Colombo, Sri Lanka
                </span>
              </div>
              
              {/* Newsletter Signup - Hidden on mobile to reduce clutter */}
              <div className="mt-4 hidden md:block">
                <h4 className="text-sm font-medium text-white mb-2">Stay Updated</h4>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="bg-white/10 border border-white/20 text-white text-sm rounded-l-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#4A72D0] w-full"
                  />
                  <button className="bg-[#4A72D0] hover:bg-[#3A5BB0] text-white text-sm font-medium px-3 py-2 rounded-r-md transition-colors">
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter for mobile */}
        <div className="mt-6 md:hidden">
          <h4 className="text-sm font-medium text-white mb-2">Stay Updated</h4>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-white/10 border border-white/20 text-white text-sm rounded-l-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#4A72D0] w-full"
            />
            <button className="bg-[#4A72D0] hover:bg-[#3A5BB0] text-white text-sm font-medium px-3 py-2 rounded-r-md transition-colors">
              Join
            </button>
          </div>
        </div>

        {/* Bottom - Copyright */}
        <div className="mt-8 pt-6 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-300 mb-3 md:mb-0 text-center md:text-left">
            © {new Date().getFullYear()} CEYLINKS. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 md:space-x-6 text-xs text-gray-300 flex-wrap justify-center">
            <Link href="/privacy" className="hover:text-[#4A72D0] transition-colors py-1">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#4A72D0] transition-colors py-1">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-[#4A72D0] transition-colors py-1">
              Cookie Policy
            </Link>
          </div>
        </div>
        
        {/* Made with love */}
        <div className="text-center mt-4">
          <p className="text-xs text-gray-400 flex items-center justify-center">
            Made with <Heart className="w-3 h-3 mx-1 text-red-500 fill-current" /> in Sri Lanka
          </p>
        </div>
      </div>
    </footer>
  );
}