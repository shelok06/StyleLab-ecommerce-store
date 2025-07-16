'use client'
import React, { useState } from 'react'
import { useStripe, useElements, PaymentElement, } from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { cartEmpty, localCart } from '@/lib/features/cart/cartSlice';
import UILoader from './UILoader';

const StripeComponent = ({ secret, orderID }) => {
    const stripe = useStripe()
    const elements = useElements()
    const router = useRouter()
    const [Loader, setLoader] = useState(false)
    const cart = useSelector(state => state.cart.value)
    const dispatch = useDispatch()

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
            dispatch(cartEmpty())
            dispatch(localCart())
            setTimeout(() => {
                router.push(`/paymentsuccess?orderID=${orderID}`)
            }, 1000);
        }
        else {
            console.log(error)
            setLoader(false)
        }
    }

    return (
        <>
            <div className='my-4'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <PaymentElement id="payment-element" />
                    </div>

                    <div className="button flex justify-center items-center my-3">
                        <button disabled={Loader} type="submit" className="bg-blue-600 text-white p-4 rounded-lg font-semibold disabled:bg-blue-400">COMPLETE PURCHASE</button>
                    </div>

                    <div className={`${Loader ? "bg-[#86898f36] backdrop-blur-lg z-30 fixed inset-0 h-[100vh] w-[100vw]" : "hidden"}`}>
                        <UILoader />
                    </div>

                </form>
            </div>
        </>
    )
}

export default StripeComponent
