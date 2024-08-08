import React, { useRef, useState, useEffect } from 'react';

const apiKey = import.meta.env.VITE_API_KEY;
const sellerBTCAddress = import.meta.env.VITE_SELLER_BTC_ADDRESS;

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
      iframe.contentWindow.postMessage({
        type: 'INITIATE_PAYMENT',
        amount: 2.750,
        apiKey,
        sellerBTCAddress
    }
    );
    }
    setShowModal(false);
  };

  const handleIframeLoad = () => {
    setLoading(false);
  };

  return (
    <div className="fixed bg-black/10 backdrop-blur-lg h-screen w-screen flex justify-center items-center z-30">
      <main className="z-20 bg-transparent flex flex-col">
        {loading && (
            <div className="flex justify-center items-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          </div>
        )}
        <iframe
          className={`border rounded-3xl ${loading ? 'hidden' : 'block'}`}
          ref={iframeRef}
          src="https://depay-gateway.netlify.app"
          width={600}
          height={600}
          title="Payment Gateway"
          onLoad={handleIframeLoad}
        ></iframe>
        {!loading && <button onClick={initializePayment} className=" mt-4 px-1.5 py-1 text-lg border-2 border-[#6A6A6A] text-[#6A6A6A] rounded-full hover:text-white hover:bg-[#6A6A6A] transition-all ease-linear">close</button>}
      </main>
    </div>
  );
}

export default Payment;
