"use client"

import { useEffect } from "react";

export default function ResponsiveAdBanner() {
  useEffect(() => {
    const AD_KEY = process.env.NEXT_PUBLIC_ADSTERRA_KEY;

    if (!AD_KEY) {
      console.warn("Adsterra key is missing. Please set NEXT_PUBLIC_ADSTERRA_KEY in .env.local");
      return;
    }

    // Create script element
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `//www.highperformanceformat.com/${AD_KEY}/invoke.js`;
    script.async = true;

    // Inject atOptions before the script
    const atOptionsScript = document.createElement("script");
    atOptionsScript.type = "text/javascript";
    atOptionsScript.innerHTML = `
      atOptions = {
        key: "${AD_KEY}",
        format: "iframe",
        height: 250,
        width: 300,
        params: {}
      };
    `;

    // Append scripts to document body
    document.body.appendChild(atOptionsScript);
    document.body.appendChild(script);

    // Cleanup on unmount
    return () => {
      document.body.removeChild(script);
      document.body.removeChild(atOptionsScript);
    };
  }, []);

  return (
    <div className="w-full flex justify-center my-4">
      {/* The ad iframe will be injected here by Adsterra */}
    </div>
  );
}
