import React from 'react'

// Components
import Layout from '@/components/Layout'

// Mui
import { Button } from '@mui/material'

// Icons
import { FcMoneyTransfer } from 'react-icons/fc'
import { siteInfo } from '@/utils/Assets'


export default function About() {


    return (
        <Layout title='About Typer' description='What Is Typer?, Owner Of Typer and How To Support.'>
            <div className='flex flex-col justify-between items-center gap-10'>
                <div className='flex flex-col justify-between items-center gap-5'>
                    <img className='pointer-events-none rounded-full opacity-50' height={250} width={150} src='images\icon.png' alt='icon' />
                    <h1 className='capitalize font-extrabold text-slate-800 text-4xl dark:text-blue-100'>about</h1>
                </div>
                <div className='container md:px-20 flex flex-col justify-between items-center gap-8'>
                    <div className='flex flex-col justify-between items-start md:items-center md:text-center gap-4 py-2 px-2'>
                        <h3 className='capitalize font-extrabold text-2xl md:text-4xl text-stone-400'>What is typer?</h3>
                        <p className='md:px-20 font-medium text-wrap'>
                            Typer is a simple and convenient online typing tutor for everybody who wants to type better.<br />
                            With Typer you can free up some of your time to practice your typing skills and Typer will help you to type much faster.
                        </p>
                    </div>
                    <div className='flex flex-col justify-between items-start md:items-center md:text-center gap-4 py-2 px-2'>
                        <h3 className='capitalize font-extrabold text-2xl md:text-4xl text-stone-400'>owner of typer</h3>
                        <p className='md:px-20 font-medium text-wrap'>
                            Hey, this is Viper Owner/developer of Type, I just wanted to say thanks for using Typer It&#39;s really an honour to be a member of this 
                            awesome project, Our message was always about helping people to get better with their work/school-work and provide a better or more fun 
                            way to higher your skills in typing faster and becoming a better Typer.
                        </p>
                    </div>
                    <div className='flex flex-col justify-between items-start md:items-center md:text-center gap-4 py-2 px-2'>
                        <h3 className='capitalize font-extrabold text-2xl md:text-4xl text-stone-400'>how to support</h3>
                        <p className='md:px-20 font-medium text-wrap'>
                            In Typer, we had to make sure that everything in it stays accessible for everyone Free and always updated just for helping people,
                            however if you want to help Typer become stay functional, you can support us and it will be really appreciated 🩵.
                        </p>
                        <Button href={siteInfo?.donationUrl || "#"} target='_blank' className='font-bold m-auto' variant="outlined" color='success' startIcon={<FcMoneyTransfer />}>
                            Donate
                        </Button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
