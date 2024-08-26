"use client"; // Required for client-side components in Next.js App Router

import React, { useEffect } from "react";

interface GoogleAdProps {
  adSlot: string;
}

const GoogleAd: React.FC<GoogleAdProps> = ({ adSlot }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Google Ads error:", e);
    }
  }, []);

  return (
    <div
      
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-6855656947142398" 
        data-ad-slot={adSlot} 
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default GoogleAd;
