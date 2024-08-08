import React, { useRef, useState, useEffect } from 'react';

const Payment = ({ setShowModal }) => {
  const iframeRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const getBlobURL = (code, type) => {
    const blob = new Blob([code], { type });
    return URL.createObjectURL(blob);
  }

  useEffect(() => {
    const handlePaymentSuccess = (event) => {
      if (event.data.type === 'PAYMENT_SUCCESS') {
        console.log('Payment successful:', event.data);
        setShowModal(false);
        // Handle payment success (e.g., update state, show a success message)
      }
    };

    window.addEventListener('message', handlePaymentSuccess);

    return () => {
      window.removeEventListener('message', handlePaymentSuccess);
    };
  }, [setShowModal]);

  const initializePayment = () => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.contentWindow.postMessage({ type: 'INITIATE_PAYMENT', amount: 1000 });
    }
  };

  const handleIframeLoad = () => {
    setLoading(false);
  };

  return (
    <div className="fixed bg-black/25 h-screen w-screen flex justify-center items-center z-30">
      <main className="z-20 bg-transparent">
        <button onClick={initializePayment} className="">Pay Now</button>
        {loading && (
          <div className="flex justify-center items-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          </div>
        )}
        <iframe
          className={`border rounded-3xl ${loading ? 'hidden' : 'block'}`}
          ref={iframeRef}
          src="https://depay-gateway.netlify.app"
          width={400}
          height={400}
          title="Payment Gateway"
          onLoad={handleIframeLoad}
        ></iframe>
      </main>
    </div>
  );
}

export default Payment;
