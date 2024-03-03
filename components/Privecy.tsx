import React from 'react'

// Components
import Layout from '@/components/Layout'

// Icons
import { CiWarning } from 'react-icons/ci'


export default function Privecy() {


    return (
        <Layout title='Privacy Policy' description='What Information Do We Collect?, Do We Use Cookies, Advertising and Terms Of Use.'>
            <div className='flex flex-col justify-between items-center gap-10'>
                <div className='flex flex-col justify-between items-center'>
                    <CiWarning className=' text-slate-800 text-4xl dark:text-blue-100' size={120} />
                    <h1 className='capitalize font-extrabold text-slate-800 text-4xl dark:text-blue-100'>privacy policy</h1>
                </div>
                <div className='container md:px-20 flex flex-col justify-between items-center gap-8'>
                    <div className='flex flex-col justify-between items-start md:items-center md:text-center gap-4 py-2 px-2'>
                        <h3 className='capitalize font-extrabold text-2xl md:text-3xl dark:text-stone-300'>What information do we collect?</h3>
                        <p className='md:px-20 font-medium text-wrap'>
                            Typer was made simple and easy to use, we are in no way collecting any information about our users, 
                            anyone who uses Typer can be insured that his information will be saved.
                        </p>
                    </div>
                    <div className='flex flex-col justify-between items-start md:items-center md:text-center gap-4 py-2 px-2'>
                        <h3 className='capitalize font-extrabold text-2xl md:text-3xl dark:text-stone-300'>Do we use cookies?</h3>
                        <p className='md:px-20 font-medium text-wrap'>
                            No we do not use cookies in our application, we just serve the user a list of his score and analyzed data temporary and these 
                            data will be removed immediately after serving it.
                        </p>
                    </div>
                    <div className='flex flex-col justify-between items-start md:items-center md:text-center gap-4 py-2 px-2'>
                        <h3 className='capitalize font-extrabold text-2xl md:text-3xl dark:text-stone-300'>advertising</h3>
                        <p className='md:px-20 font-medium text-wrap'>
                            As we said before Typer made to be simple and also Free we do not advertise for third-party organizations or any other organizations.
                        </p>
                    </div>
                    <div className='flex flex-col justify-between items-start md:items-center md:text-center gap-4 py-2 px-2'>
                        <h3 className='capitalize font-extrabold text-2xl md:text-3xl dark:text-stone-300'>terms of use</h3>
                        <p className='md:px-20 font-medium text-wrap'>
                        You agree not to modify, copy, distribute, transmit, display, perform, reproduce, publish, license, transfer, create derivate work from, 
                        sell or re-sell any content or information obtained from or through the Site.
                        </p>
                    </div>
                    <div className='flex flex-col justify-between items-start md:items-center md:text-center gap-4 py-2 px-2 mt-10'>
                        <h3 className='capitalize font-extrabold text-xl text-black dark:text-stone-200'>last update</h3>
                        <p className='md:px-20 dark:text-gray-400 font-medium text-wrap'>
                            This agreement was last updated on <span className='text-gray-500 font-bold'>3/3/2024</span>.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
