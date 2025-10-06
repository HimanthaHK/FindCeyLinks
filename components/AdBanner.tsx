"use client"; // Needed if using Next.js App Router

import Script from "next/script";
import React from "react";

const AdBanner: React.FC = () => {
  return (
    <div className="flex justify-center items-center my-4">
      {/* Desktop / Tablet Banner */}
      <div className="hidden sm:block">
        <Script
          id="adsterra-300x250"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              atOptions = {
                'key' : '7b68a22ec773a99f7ad663114d9be956',
                'format' : 'iframe',
                'height' : 250,
                'width' : 300,
                'params' : {}
              };
            `,
          }}
        />
        <Script
          strategy="afterInteractive"
          src="//www.highperformanceformat.com/7b68a22ec773a99f7ad663114d9be956/invoke.js"
        />
      </div>

      {/* Mobile Banner (Optional: use 320x50) */}
      <div className="block sm:hidden">
        <Script
          id="adsterra-320x50"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              atOptions = {
                'key' : '7b68a22ec773a99f7ad663114d9be956',
                'format' : 'iframe',
                'height' : 50,
                'width' : 320,
                'params' : {}
              };
            `,
          }}
        />
        <Script
          strategy="afterInteractive"
          src="//www.highperformanceformat.com/7b68a22ec773a99f7ad663114d9be956/invoke.js"
        />
      </div>
    </div>
  );
};

export default AdBanner;
