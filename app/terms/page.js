import React from 'react'

const Terms = () => {
    return (
        <>
            <main className="p-8 flex flex-col min-h-screen">
                <h1 className="text-2xl font-bold my-4 text-center">Terms of Service</h1>
                <div className='flex flex-col my-2.5 gap-2'>
                    <p className='text-lg font-semibold'>
                        By using this website, you agree to the following terms:
                    </p>

                    <ul className='list-disc'>
                        <li className='my-1'>You may browse and purchase clothing products for personal use.</li>
                        <li className='my-1'>All product information, prices, and availability are subject to change.</li>
                        <li className='my-1'>Orders may be canceled or refunded according to our store policies.</li>
                        <li className='my-1'>You are responsible for maintaining the confidentiality of your account.</li>
                    </ul>

                </div>

                <div className='flex flex-col items-center my-5 gap-2'>
                    <div className='italic'>We reserve the right to modify these terms at any time.</div>
                    <p>
                        If you have any concerns, contact us at,
                    </p>

                    <ul className='list-disc'>
                        <li className='my-1'>sheloksamson@gmail.com</li>
                        <li className='my-1'>+92-3295046298</li>
                    </ul>
                </div>
            </main>
        </>
    )
}

export default Terms
