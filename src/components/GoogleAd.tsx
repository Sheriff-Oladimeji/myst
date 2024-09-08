"use client"; // Required for client-side components in Next.js App Router

import React, { useEffect, useState } from "react";

interface GoogleAdProps {
  adSlot: string;
  adClient?: string;
}

const GoogleAd: React.FC<GoogleAdProps> = ({ adSlot, adClient = "ca-pub-6855656947142398" }) => {
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
      setAdLoaded(true);
    } catch (e) {
      console.error("Google Ads error:", e);
      setAdLoaded(false);
    }
  }, []);

  if (!adLoaded) {
    return <div>Ad loading...</div>; // Or any loading state you prefer
  }

  return (
    <div>
      <ins
        className="adsbygoogle"
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default GoogleAd;
