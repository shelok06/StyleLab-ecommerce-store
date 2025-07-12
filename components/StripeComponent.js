import React from 'react'
import { useStripe, useElements, PaymentElement, } from '@stripe/react-stripe-js';
import Script from 'next/script';

const StripeComponent = ({ secret, Total }) => {
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements || !secret) return;

        await elements.submit()
        const result = await stripe.confirmPayment({
            elements,
            clientSecret: secret,
            confirmParams: {
                return_url: `${process.env.NEXTAUTH_URL}/paymentsuccess`
            }
        })

        if(!result.error){
            alert("Payment Successful")
        } 
        else {
            console.log(result.error)
        }
    }

    return (
        <>
            <Script src="https://js.stripe.com/v3/"></Script>
            <form onSubmit={handleSubmit}>
                <div>
                    <PaymentElement id="payment-element" />
                </div>

                <div className="button flex justify-center items-center">
                    <button type="submit" className="bg-blue-600 text-white p-4 rounded-lg">COMPLETE PURCHASE</button>
                </div>

            </form>
        </>
    )
}

export default StripeComponent
