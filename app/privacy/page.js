import React from 'react'

const Privacy = () => {
    return (
        <>
            <main className="p-8 flex flex-col items-center min-h-screen">
                <h1 className="text-2xl font-bold my-4">Privacy Policy</h1>
                <p className='text-lg my-2.5'>This website collects your name and email address via Facebook login. This information is used solely for order processing, customer account management, and improving your experience. We do not sell, rent, or share your personal data with third parties. Your information is stored securely and only used within this platform.</p>
                <div className='flex flex-col my-2.5 gap-2'>
                    <p>
                        If you have any concerns or wish to delete your data, contact us at,
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

export default Privacy
