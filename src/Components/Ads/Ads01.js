import React, { useEffect } from "react";


export default function Ads01() {
  const loadAds = () => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.log("adsense error", error.message);
    }
  };

  useEffect(() => {
    loadAds();  
  }, []);

  return (
     (
      <div className="mt-2 mb-3 rounded">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-5790649900681714"
          data-ad-slot="5746098113"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    )
  );
}
