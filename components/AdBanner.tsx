"use client";

import { useEffect, useRef } from "react";

export default function ResponsiveAdBanner() {
  const adRootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const AD_KEY = process.env.NEXT_PUBLIC_ADSTERRA_KEY;
    if (!AD_KEY) return;

    const adContainer = document.createElement("div");
    adContainer.style.width = "100%";
    adContainer.style.height = "0";
    adContainer.style.paddingBottom = "83.33%"; // 250 / 300 ratio
    adContainer.style.position = "relative";
    adContainer.style.overflow = "hidden";
    adContainer.style.borderRadius = "8px";

    if (adRootRef.current) adRootRef.current.appendChild(adContainer);

    (window as any).atOptions = {
      key: AD_KEY,
      format: "iframe",
      height: 250,
      width: 300,
      params: {},
      container: adContainer.id,
      node: adContainer,
    };

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = `//www.highperformanceformat.com/${AD_KEY}/invoke.js`;

    adContainer.appendChild(script);

    return () => {
      try {
        script.remove();
        if (adRootRef.current?.contains(adContainer)) {
          adRootRef.current.removeChild(adContainer);
        }
      } catch {}
      delete (window as any).atOptions;
    };
  }, []);

  return (
    <div className="w-full flex justify-center my-4 px-2">
      <div
        ref={adRootRef}
        className="relative w-full max-w-[300px] bg-gray-100 border border-gray-300 rounded-lg overflow-hidden"
      />
    </div>
  );
}
