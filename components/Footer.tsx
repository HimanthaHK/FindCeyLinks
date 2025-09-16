"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Linkedin, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#0D1E4C] via-[#26415E] to-[#0B1B32] border-t border-white/10 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

          {/* Left - Text + Logo */}
          <div className="flex flex-col items-center md:items-start">
            <p className="text-sm text-gray-300 mb-4 text-center md:text-left">
              Helping you connect with the right opportunities.
            </p>
            <Link href="/" aria-label="CEYLinks Home" className="flex items-center justify-center md:justify-start">
              <Image
                src="/ceylogo.png"  // ✅ make sure logo is in /public
                alt="CEYLinks Logo"
                width={80}          // larger width
                height={80}         // larger height
                className="w-auto"
              />
            </Link>
          </div>

          {/* Middle - Navigation Links */}
          <div className="flex flex-col space-y-2">
            <h3 className="text-sm font-medium text-gray-200">Quick Links</h3>
            <Link href="/jobs" className="text-sm text-gray-300 hover:text-white transition">Jobs</Link>
            <Link href="/courses" className="text-sm text-gray-300 hover:text-white transition">Courses</Link>
            <Link href="/ask_job" className="text-sm text-gray-300 hover:text-white transition">Ask a Job</Link>
            <Link href="/admin" className="text-sm text-gray-300 hover:text-white transition">Post a Job</Link>
          </div>

          {/* Right - Contact & Socials */}
          <div>
            <h3 className="text-sm font-medium text-gray-200">Contact</h3>
            <p className="text-sm text-gray-300 mt-2">
              Email: <a href="mailto:support@ceylinks.com" className="hover:text-white">support@ceylinks.com</a>
            </p>
            <p className="text-sm text-gray-300">
              Phone: <a href="tel:+94771234567" className="hover:text-white">+94 77 123 4567</a>
            </p>

            <div className="flex space-x-4 mt-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="w-5 h-5 text-gray-300 hover:text-white transition" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5 text-gray-300 hover:text-white transition" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="w-5 h-5 text-gray-300 hover:text-white transition" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="w-5 h-5 text-gray-300 hover:text-white transition" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom - Copyright */}
        <div className="mt-8 border-t border-white/10 pt-4 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} CEYLINKS. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
