import React from 'react'

// NextJs
import Head from 'next/head';

// Fonts
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

// Themes
import { useState, useEffect } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from 'next-themes';
import { Button } from '@mui/material';
import { IoIosArrowDown } from 'react-icons/io';
import { FcMoneyTransfer } from 'react-icons/fc';
import Link from 'next/link';

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

    return (  
        <>
            <Head>
                    <title>{title}</title>
                <meta name="title" content={title} />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords?.join(',')} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                {/* OG tags */}
                <meta property="og:type" content="website"/>
                <meta property="og:url" content="http://localhost:3000"/>
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={image} />

                {/* ICONS */}
                <link rel="shortcut icon" type="image/x-icon" href='/favicon/favicon.ico' />
                <link rel="apple-touch-icon" sizes="180x180" href='/favicon/apple-touch-icon.png' />
                <link rel="icon" type="image/png" sizes="32x32" href='/favicon/favicon-32x32.png'/>
                <link rel="icon" type="image/png" sizes="16x16" href='/favicon/favicon-16x16.png'/>
            </Head>

            <div className={`${inter.className} overflow-x-hidden h-screen flex flex-col justify-between items-center gap-10 p-0`}>
                <header id='header' className='w-full h-12 dark:bg-gray-950 bg-slate-800'>
                    <nav className='container mx-auto overflow-hidden flex justify-between items-center gap-4 md:px-8 px-4 py-2'>
                        <img className='pointer-events-none' height={400} width={100} src='images\logo.png' alt='logo' />
                        <div className="flex justify-between items center gap-8">
                            <div title='Change Theme' className='cursor-pointer flex justify-between items-center'>
                                {
                                    currentTheme == 'light' ?
                                    <FiMoon className={`text-white bg-black rounded-full size-8 p-2`} size={18} onClick={() => setTheme('dark')} /> :
                                    <FiSun className={`text-black bg-white rounded-full size-8 p-2`} size={18} onClick={() => setTheme('light')} />
                                }
                            </div>
                            <div className='cursor-pointer flex justify-between items-center'>
                                <IoIosArrowDown color='white' size={20} />
                            </div>
                        </div>
                    </nav>
                </header>

                <main id='main' className='container px-5'>
                    {children}
                </main>

                <footer id='footer' className='dark:bg-gray-950 bg-gray-800 w-full h-auto'>
                    <div className='container mx-auto flex md:flex-row flex-col justify-between items-center gap-14 md:gap-0 px-10 md:px-32 pt-10 pb-5'>
                        <div className='order-last md:order-first size-32 overflow-hidden rounded-lg relative'>
                            <img className='absolute w-full h-full pointer-events-none size-fit' height={300} width={150} src='images\icon.png' alt='icon' />
                            <div className='absolute w-full h-full bg-gradient-to-t from-black to-transparent'></div>
                        </div>
                        
                        <div className='text-white flex text-nowrap justify-items-start items-start gap-8'>
                            <div className='flex flex-col justify-between items-start gap-4'>
                                <h6 className='p-0 m-0 font-bold'>About</h6>
                                <div className='text-gray-400 flex flex-col justify-between items-start gap-2 ps-1'>
                                    <Link href="#" title='About typer' className="p-0 m-0 hover:underline">About typer</Link>
                                    <Link href="#" title='Contact Us' className="p-0 m-0 hover:underline">Contact Us</Link>
                                    <Link href="#" title='Privecy & Terms<' className="p-0 m-0 hover:underline">Privecy & Terms</Link>
                                </div>
                            </div>
                            <div className='flex flex-col justify-between items-start gap-4'>
                                <h6 className='p-0 m-0 font-bold'>Support</h6>
                                <div className='text-gray-400 flex flex-col justify-between items-center gap-2 ps-1'>
                                    <Link href="#" title='Donate' className="p-0 m-0 hover:underline flex justify-center items-center gap-1"><FcMoneyTransfer /> Donate</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
