import React, { useEffect, useRef } from 'react';

const Checkout = () => {
  const iframeRef = useRef(null);

  const getBlobURL = (code, type) => {
    const blob = new Blob([code], { type })
    return URL.createObjectURL(blob)
  }
  
  console.log(getBlobURL('https://depay-gateway.netlify.app', 'text/html'))

  useEffect(() => {
    const handlePaymentSuccess = (event) => {
      // if (event.origin !== 'https://depay-gateway.netlify.app') return; // Replace with your Netlify domain for security
      if (event.data.type === 'PAYMENT_SUCCESS') {
        console.log('Payment successful:', event.data);
        // Handle payment success (e.g., update state, show a success message)
      }
    };

    window.addEventListener('message', handlePaymentSuccess);

    return () => {
      window.removeEventListener('message', handlePaymentSuccess);
    };
  }, []);

  const initializePayment = () => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.contentWindow.postMessage({ type: 'INITIATE_PAYMENT', amount: 1000 });
    }
  };
  return (
    <div>
    <h1>Welcome to the Seller's App</h1>
    <button onClick={initializePayment}>Pay Now</button>
    <iframe
      ref={iframeRef}
      src="https://depay-gateway.netlify.app"
      width={1600}
      height={400}
      title="Payment Gateway"
    ></iframe>
  </div>
  )
}

export default Checkout;