// app/banner.js
'use client';
import { FC, useEffect, useState } from "react";

const CookieBanner: FC = () =>{
  const [consentGiven, setConsentGiven] = useState('');

  useEffect(() => {
    // We want this to only run once the client loads
    // or else it causes a hydration error
    setConsentGiven('undecided');
  }, []);

  return (
    <div>
      {consentGiven === 'undecided' && (
        <div>
          <p>
            We use tracking cookies to understand how you use 
            the product and help us improve it.
            Please accept cookies to help us improve.
          </p>
          <button type="button">Accept cookies</button>
          <span> </span>
          <button type="button">Decline cookies</button>
        </div>
      )}
    </div>
  )
}

export default CookieBanner;