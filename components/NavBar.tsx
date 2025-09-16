"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/jobs", key: "jobs", label: "Jobs" },
    { href: "/courses", key: "courses", label: "Courses" },
    { href: "/askjob", key: "ask_job", label: "Ask a Job" },
    { href: "/postjob", key: "post_job", label: "Recruiting? Post a job" },
  ];

  const getActive = (key: string, href: string) =>
    pathname === href || pathname.startsWith(href);

  return (
    <nav
      role="navigation"
      className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#0D1E4C] via-[#26415E] to-[#0B1B32] border-b border-white/10 transition-all duration-300 ${
        isScrolled ? "shadow-lg" : "shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Logo / Brand */}
        <div className="flex-shrink-0">
  <Link href="/" aria-label="JobAds Home" className="flex items-center">
    <Image
      src="/ceylogo.png"   // ✅ make sure it's in /public
      alt="CEYLinks Logo"
      width={70}           // adjust width
      height={50}          // adjust height
      className="h-9 w-auto" // responsive Tailwind sizing
    />
  </Link>
</div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-[#C48CB3] focus:outline-none p-2"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={`px-3 py-1 text-sm font-medium transition-colors duration-200 border-b-2 ${
                  getActive(link.key, link.href)
                    ? "text-[#C48CB3] border-[#C48CB3]"
                    : "text-white border-transparent hover:text-[#C48CB3] hover:border-[#C48CB3]"
                }`}
                aria-current={getActive(link.key, link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-12">
            <Link
              href="/contact"
              className="px-4 py-1 border border-[#C48CB3] text-[#C48CB3] rounded-md text-sm font-medium hover:bg-[#C48CB3] hover:text-white transition-colors duration-200"
            >
              Contact Us
            </Link>
            <Link
              href="/saved_job"
              className="flex items-center text-white hover:text-[#C48CB3] text-sm font-medium transition-colors duration-200"
              aria-label="View saved jobs"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <title>Saved jobs</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              Saved jobs
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out transform origin-top ${
            isMenuOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
          }`}
        >
          <div className="px-2 pt-2 pb-4 space-y-1 bg-gradient-to-r from-[#0D1E4C] via-[#26415E] to-[#0B1B32] border-t border-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-1 text-base font-medium rounded-md ${
                  getActive(link.key, link.href)
                    ? "text-[#C48CB3] bg-[#1a2d5c]"
                    : "text-white hover:text-[#C48CB3] hover:bg-[#1a2d5c]"
                }`}
                aria-current={getActive(link.key, link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact_us"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-1 text-base font-medium text-white hover:text-[#C48CB3] hover:bg-[#1a2d5c] rounded-md"
            >
              Contact Us
            </Link>
            <Link
              href="/saved_job"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center px-3 py-1 text-base font-medium text-white hover:text-[#C48CB3] hover:bg-[#1a2d5c] rounded-md"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <title>Saved jobs</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              Saved jobs
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
