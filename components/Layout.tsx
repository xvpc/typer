import React, { createContext } from 'react'

// NextJs
import Head from 'next/head';

// Fonts
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

// Themes
import { useState, useEffect } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from 'next-themes';
import { Button, FormControlLabel, Switch, styled } from '@mui/material';
import { IoIosArrowDown } from 'react-icons/io';
import { FcMoneyTransfer } from 'react-icons/fc';
import Link from 'next/link';
import { siteInfo } from '@/utils/Assets';

type LayoutProps = {
    children: React.ReactNode,
    title?: string,
    description?: string,
    keywords?: string[],
    image?: string
}


export default function Layout({ children, title, description, keywords, image }: LayoutProps){
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;


    const MaterialUISwitch = styled(Switch)(({ theme }) => ({
        width: 62,
        height: 34,
        padding: 7,
        '& .MuiSwitch-switchBase': {
            margin: 1,
            padding: 0,
            transform: 'translateX(6px)',
            '&.Mui-checked': {
                color: '#fff',
                transform: 'translateX(22px)',
                '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#ffffff',
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
                },
                '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: currentTheme === 'light' ? '#e7e8e8' : '#aab4be',
                },
            },
        },
        '& .MuiSwitch-thumb': {
            backgroundColor: currentTheme === 'light' ? '#434445' : '#ffffff',
            width: 32,
            height: 32,
            '&::before': {
                content: "''",
                position: 'absolute',
                width: '100%',
                height: '100%',
                left: 0,
                top: 0,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#ffe30d',
                )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
            },
        },
        '& .MuiSwitch-track': {
            opacity: 1,
            backgroundColor: currentTheme === 'light' ? '#8796A5' : '#dddddd',
            borderRadius: 20 / 2,
        },
    }));

    
    return (  
        <>
            <Head>
                    <title>{title || siteInfo?.name}</title>
                <meta name="title" content={title || siteInfo?.name} />
                <meta name="description" content={description || siteInfo?.description} />
                <meta name="keywords" content={keywords?.join(',') || siteInfo?.keywords?.join(',')} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                {/* OG tags */}
                <meta property="og:type" content="website"/>
                <meta property="og:url" content={siteInfo?.url} />
                <meta property="og:title" content={title || siteInfo?.name} />
                <meta property="og:description" content={description || siteInfo?.description} />
                <meta property="og:image" content={image || siteInfo?.image} />

                {/* ICONS */}
                <link rel="shortcut icon" type="image/x-icon" href='./favicon/favicon.ico' />
                <link rel="apple-touch-icon" sizes="180x180" href='./favicon/apple-touch-icon.png' />
                <link rel="icon" type="image/png" sizes="32x32" href='./favicon/favicon-32x32.png'/>
                <link rel="icon" type="image/png" sizes="16x16" href='./favicon/favicon-16x16.png'/>
            </Head>
            
            <div className={`${inter.className} overflow-x-hidden h-screen flex flex-col justify-between items-center gap-10 p-0`}>
                <header id='header' className='w-full h-14 dark:bg-black bg-slate-700'>
                    <nav className='container mx-auto overflow-hidden flex justify-between items-center gap-4 md:px-8 px-4 py-2'>
                        <Link href="/" title='Test your typing Speed!'>
                            <img className='pointer-events-none' height={400} width={100} src='images\logo.png' alt='logo' />
                        </Link>
                        <div className="flex justify-between items-center gap-6">
                            <FormControlLabel
                                className='h-10'
                                control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked={currentTheme == 'light'} onChange={() => {currentTheme == 'light' ? setTheme('dark') : setTheme('light')}} />}
                                label=""
                            />
                            <div 
                            onClick={() => document.getElementById('footer')?.scrollIntoView({behavior: "smooth"})}
                            className='cursor-pointer flex justify-between items-center'
                            >
                                <IoIosArrowDown color='white' size={20} />
                            </div>
                        </div>
                    </nav>
                </header>

                
                <main id='main' className='container mb-auto'>
                    {children}
                </main>

                <footer id='footer' className='dark:bg-gray-950 bg-gray-800 w-full h-auto'>
                    <div className='container mx-auto flex md:flex-row flex-col justify-between items-center gap-14 md:gap-0 px-10 md:px-32 pt-10 pb-5'>
                        <div onClick={() => document?.getElementById("header")?.scrollIntoView({ behavior: "smooth" })} className='cursor-pointer order-last md:order-first size-32 overflow-hidden rounded-lg relative'>
                            <img className='absolute w-full h-full pointer-events-none size-fit' height={300} width={150} src='images\icon.png' alt='icon' />
                            <div className='absolute w-full h-full bg-gradient-to-t from-black to-transparent'></div>
                        </div>
                        
                        <div className='text-white flex text-nowrap justify-items-start items-start gap-8'>
                            <div className='flex flex-col justify-between items-start gap-4'>
                                <h6 className='p-0 m-0 font-bold'>About</h6>
                                <div className='text-gray-400 flex flex-col justify-between items-start gap-2 ps-1'>
                                    <Link href="about" title='About typer' className="p-0 m-0 hover:underline">About typer</Link>
                                    <Link href="https://xvpc.dev" target='_blank' title='Contact Us' className="p-0 m-0 hover:underline">Contact Us</Link>
                                    <Link href="privecy" title='Privecy & Terms' className="p-0 m-0 hover:underline">Privecy & Terms</Link>
                                </div>
                            </div>
                            <div className='flex flex-col justify-between items-start gap-4'>
                                <h6 className='p-0 m-0 font-bold'>Support</h6>
                                <div className='text-gray-400 flex flex-col justify-between items-center gap-2 ps-1'>
                                    <Link href={siteInfo?.donationUrl || "#"} target='_blank' title='Donate' className="p-0 m-0 hover:underline flex justify-center items-center gap-1"><FcMoneyTransfer /> Donate</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
