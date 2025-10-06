"use client";

import { useEffect, useRef } from "react";

export default function ResponsiveAdBanner() {
  const adRootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const AD_KEY = process.env.NEXT_PUBLIC_ADSTERRA_KEY;
    if (!AD_KEY) return;

    // Create ad container
    const adContainer = document.createElement("div");
    adContainer.style.width = "300px";
    adContainer.style.height = "250px";
    adContainer.style.display = "flex";
    adContainer.style.justifyContent = "center";
    adContainer.style.alignItems = "center";
    adContainer.style.overflow = "hidden";
    adContainer.style.borderRadius = "8px";

    // Save the current root to avoid React ref issues
    const currentRoot = adRootRef.current;
    if (currentRoot) currentRoot.appendChild(adContainer);

    // Properly type window.atOptions
    (window as Window & { atOptions?: Record<string, unknown> }).atOptions = {
      key: AD_KEY,
      format: "iframe",
      height: 250,
      width: 300,
      params: {},
      container: adContainer.id,
      node: adContainer,
    };

    // Load Adsterra script
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = `//www.highperformanceformat.com/${AD_KEY}/invoke.js`;

    adContainer.appendChild(script);

    // Cleanup function
    return () => {
      script.remove();
      if (currentRoot?.contains(adContainer)) {
        currentRoot.removeChild(adContainer);
      }
      delete (window as Window & { atOptions?: Record<string, unknown> }).atOptions;
    };
  }, []);

  return (
    <div className="w-full flex justify-center my-4 px-2">
      <div
        ref={adRootRef}
        className="relative bg-gray-100 border border-gray-300 rounded-lg w-[300px] min-h-[250px] flex items-center justify-center overflow-hidden"
      />
    </div>
  );
}
