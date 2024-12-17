import React, { useEffect, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../axiosConfig';

const Payment = ({ appointmentId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    // Create Payment Intent on mount
    const createPaymentIntent = async () => {
      try {
        const response = await axios.post('/api/payments/create-payment-intent', { appointmentId });
        setClientSecret(response.data.clientSecret);
      } catch (err) {
        setError('Failed to initialize payment.');
      }
    };
    createPaymentIntent();
  }, [appointmentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    const card = elements.getElement(CardElement);
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
      },
    });

    if (result.error) {
      setError(result.error.message);
      setProcessing(false);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        // Handle successful payment (e.g., notify backend, update UI)
        setProcessing(false);
        alert('Payment Successful!');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
      <CardElement />
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {processing ? 'Processing...' : 'Pay'}
      </button>
    </form>
  );
};

export default Payment;
