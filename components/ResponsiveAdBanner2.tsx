"use client";

import { useEffect, useRef } from "react";

export default function ResponsiveAdBanner2() {
  const adRootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const AD_KEY = process.env.NEXT_PUBLIC_ADSTERRA_KEY_2;
    if (!AD_KEY) {
      console.warn("Adsterra key not found in environment variables.");
      return;
    }

    // Create ad container
    const adContainer = document.createElement("div");
    adContainer.style.width = "320px";
    adContainer.style.height = "50px";
    adContainer.style.display = "flex";
    adContainer.style.justifyContent = "center";
    adContainer.style.alignItems = "center";
    adContainer.style.overflow = "hidden";
    adContainer.style.borderRadius = "8px";

    const currentRoot = adRootRef.current;
    if (currentRoot) currentRoot.appendChild(adContainer);

    // Adsterra setup
    (window as Window & { atOptions?: Record<string, unknown> }).atOptions = {
      key: AD_KEY,
      format: "iframe",
      height: 50,
      width: 320,
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

    // Cleanup
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
        className="relative bg-gray-100 border border-gray-300 rounded-lg w-[320px] min-h-[50px] flex items-center justify-center overflow-hidden"
      />
    </div>
  );
}
