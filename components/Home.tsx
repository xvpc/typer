import React, { useContext, useEffect, useMemo, useState } from 'react'

// Components
import Layout from '@/components/Layout';
import Game from '@/components/Game';

// Mui
import { CircularProgress } from '@mui/material';

// Utils
import { userContext } from '@/utils/UserProvider';
import { textData } from '@/utils/Assets';


export default function Home(){
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setMounted(true)
        }, 900)
    }, []);

    const user = useContext(userContext);

    // Lorem ipsum dolor sit amet consectetur. Praesentium fugiat cumque deserunt facere quam dolore, enim mollitia perferendis cum nemo nam vitae vel voluptatum culpa ipsum veritatis dolores nobis esse tempore eos deleniti, iure animi corrupti obcaecati. Asperiores, neque? Eaque officia recusandae laborum explicabo inventore debitis eligendi repellat possimus, obcaecati odit placeat incidunt sed? Voluptatibus ipsam corporis dolorem nobis molestiae, vel, tenetur error, velit consectetur doloribus non? Asperiores nulla quo deleniti ex inventore. Facere aliquid, obcaecati amet deleniti culpa repellendus maxime dignissimos, ex quaerat natus necessitatibus esse repudiandae architecto expedita voluptates sequi velit. Iure voluptate nemo maxime aperiam, facilis porro?"
    const [text, setText] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useMemo(() => {
        if(user && textData){
            try{
                setText(textData.lvl2[Math.floor(Math.random() * textData.lvl2.length)]);
                // if(user.time > 180){
                //     setText(textData.lvl3[Math.floor(Math.random() * textData.lvl3.length)]);
                // }else if(user.time > 60 && user.time != 180){
                //     setText(textData.lvl2[Math.floor(Math.random() * textData.lvl2.length)]);
                // }else{
                //     setText(textData.lvl1[Math.floor(Math.random() * textData.lvl1.length)]);
                // }
            }catch(err: any){
                setError(err || "Something went wrong!");
                console.log(err);
            }finally{
                setLoading(false)
            }
        }
    }, []);


    return (
        <Layout>
            <div className='flex flex-col justify-between items-center gap-10 pb-28 px-0 md:px-5'>
                <div className='flex flex-col justify-between items-center gap-16'>
                    <h1 className='text-3xl m-0 p-0 font-bold flex flex-wrap justify-center items-baseline text-center gap-1'>Test your typing <span className='m-0 p-0 font-extrabold text-cyan-400'>Speed!</span></h1>
                    {error ? <p className='text-xl text-red-600 font-bold text-center'>{error}</p> : !mounted || loading || !text ? <CircularProgress color="info" /> : <Game text={text} />}
                </div>

                <hr className={`${user?.gamestatus === "finish" ? "visible" : "invisible"} w-full block h-px border-0 border-t border-t-black dark:border-t-white mt-10`} />

                <div id='score-section' className={`${user?.gamestatus === "finish" ? "visible" : "hidden"} transition duration-200 ease-out flex flex-col justify-between items-center gap-14`}>
                    <h4 className='p-0 m-0 font-bold text-2xl text-gray-800 dark:text-gray-200 capitalize'>your score</h4>

                    <div className='container grid sm:grid-cols-3 justify-between items-center gap-10'>
                        <div className='h-28 sm:w-52 w-screen flex flex-col justify-start items-center rounded overflow-hidden'>
                            <div className='text-gray-200 w-full h-2/6 bg-red-500 font-semibold text-center px-5 py-1'>
                                Speed
                            </div>
                            <div className='h-4/6 bg-red-300 w-full flex justify-center items-center gap-0'>
                                <p className='p-0 m-0 font-bold text-white text-xl'>{user?.userSpeed || 0}</p>
                                <span className='p-0 m-0 font-bold text-gray-400 text-sm'>wpm</span>
                            </div>
                        </div>
                        <div className='h-28 sm:w-52 w-screen flex flex-col justify-start items-center rounded overflow-hidden'>
                            <div className='text-gray-200 w-full h-2/6 bg-blue-500 font-semibold text-center px-5 py-1'>
                                Accuracy
                            </div>
                            <div className='h-4/6 bg-blue-300 w-full flex justify-center items-center gap-0'>
                                <p className='p-0 m-0 font-bold text-white text-xl'>{user?.userAccuracy || 0}</p>
                                <span className='p-0 m-0 font-bold text-gray-400 text-sm'>%</span>
                            </div>
                        </div>
                        <div className='h-28 sm:w-52 w-screen flex flex-col justify-start items-center rounded overflow-hidden'>
                            <div className='text-gray-200 w-full h-2/6 bg-green-500 font-semibold text-center px-5 py-1'>
                                Cuteness
                            </div>
                            <div className='h-4/6 bg-green-300 w-full flex justify-center items-center gap-0'>
                                <p className='p-0 m-0 font-bold text-white text-xl'>10</p>
                                <span className='p-0 m-0 font-bold text-gray-400 text-sm'>/10</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
