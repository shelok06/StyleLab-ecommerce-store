import React, { useState } from 'react'
import { useStripe, useElements, PaymentElement, } from '@stripe/react-stripe-js';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const StripeComponent = ({ secret, orderID }) => {
    const stripe = useStripe()
    const elements = useElements()
    const router = useRouter()
    const [Loader, setLoader] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements || !secret) return;
        setLoader(true)
        await elements.submit()
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            clientSecret: secret,
            confirmParams: {
                return_url: `${process.env.NEXT_PUBLIC_REDIRECT_URL}/paymentsuccess`
            },
            redirect: "if_required",
        })

        if (!error) {
            router.push(`/paymentsuccess?orderID=${orderID}`)
        }
        else {
            console.log(error)
            setLoader(false)
        }
    }

    return (
        <>
            <Toaster />
            <div className='my-4'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <PaymentElement id="payment-element" />
                    </div>

                    <div className="button flex justify-center items-center my-3">
                        <button disabled={Loader} type="submit" className="bg-blue-600 text-white p-4 rounded-lg font-semibold disabled:bg-blue-400">COMPLETE PURCHASE</button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default StripeComponent
