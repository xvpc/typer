import React, { useEffect, useRef, useState } from 'react'

// Components
import Layout from '@/components/Layout';
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, textFieldClasses } from '@mui/material';
import { BsCursorText } from 'react-icons/bs';


export default function Home(){
    const [language, setLanguage] = useState('en-us');
    const [time, seTime] = useState(60);

    const handleChangeLanguage = (event: SelectChangeEvent) => {
        setLanguage(event.target?.value);
    };

    const handleChangeTime = (event: SelectChangeEvent) => {
        seTime(Number(event.target?.value));
    };

    // Lorem ipsum dolor sit amet consectetur.
    const [text, setText] = useState("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium fugiat cumque deserunt facere quam dolore, enim mollitia perferendis cum nemo nam vitae vel voluptatum culpa ipsum veritatis dolores nobis esse tempore eos deleniti, iure animi corrupti obcaecati. Asperiores, neque? Eaque officia recusandae laborum explicabo inventore debitis eligendi repellat possimus, obcaecati odit placeat incidunt sed? Voluptatibus ipsam corporis dolorem nobis molestiae, vel, tenetur error, velit consectetur doloribus non? Asperiores nulla quo deleniti ex inventore. Facere aliquid, obcaecati amet deleniti culpa repellendus maxime dignissimos, ex quaerat natus necessitatibus esse repudiandae architecto expedita voluptates sequi velit. Iure voluptate nemo maxime aperiam, facilis porro?");
    const [modifiedText, setModifiedText] = useState<any>(<>{text}</>);
    const gameRef = useRef<HTMLDivElement | null>(null);
    const [gameFocus, setGameFocus] = useState(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);


    useEffect(() => {
        const game = gameRef?.current;

        // TODO: Make the API, Add start condition & language limitations & add caret + fix auto scrolling & move to game files
        if(game && gameFocus){
            if(currentIndex >= text.length){
                console.log('game is over');
            }else{
                const keyDownHandler = (event: KeyboardEvent) => {
                    const key = event.key.toString().toLowerCase();
                    let currentLetter = [...text][currentIndex]?.toString().toLowerCase();
                    let beforeText = [...text].slice(0, currentIndex+1);
                    let afterText = [...text].slice(currentIndex + 1);
                    
                    if(key){
                        document.getElementById("currentPlace")?.scrollIntoView({ behavior: 'smooth' });
                        // Verify Input.
                        if(currentLetter && key === currentLetter) {
                            setCurrentIndex((prev) => prev + 1);
                            console.log(currentLetter, currentIndex);
                            setModifiedText(
                            <>
                                {
                                    [...beforeText].map((item: string, index: number) => (
                                        <span autoFocus key={index} id= {index+1 >= beforeText.length ? "currentPlace" : ""} className={`text-green-600`}>{item}</span>
                                    ))
                                }
                                {/* <BsCursorText className='inline animate-pulse p-0 m-0 absolute end-0' color='black' /> */}
                                {afterText}
                            </>
                            );
                        }
                        else{
                            console.log("wrong!", key, currentLetter, currentIndex);
                            setModifiedText(
                                <>
                                    {
                                        [...beforeText].map((item: string, index: number) => (
                                            index == beforeText.length-1 ?
                                            <span key={index} className='text-red-600'>{currentLetter}</span>
                                            : <span key={index} className='text-green-600'>{item}</span>
                                        ))
                                    }
                                    {afterText}
                                </>
                            );
                        }
                    }
                    // if(key === 'Escape'){
                    //     event.preventDefault();
                    // }
                }
        
                document.addEventListener('keydown', keyDownHandler);

                return () => {
                    document.removeEventListener('keydown', keyDownHandler);
                }
            }
        }
    }, [currentIndex, gameFocus, text]);


    return (
        <Layout>
            <div className='flex flex-col justify-between items-center gap-5 py-10 px-5'>
                <div className='flex flex-col justify-between items-center gap-16'>
                    <h1 className='text-2xl m-0 p-0 font-bold flex flex-wrap justify-center items-baseline text-center gap-1'>Test your typing <span className='m-0 p-0 font-extrabold text-cyan-400'>Speed!</span></h1>
                    <div id="game" className='flex flex-col justify-between items-center gap-8'>
                        <div id="test" className='flex flex-wrap justify-center md:justify-between items-center gap-10 md:gap-56'>
                            <div className='flex justify-between items-center gap-2 md:gap-6'>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 110 }}>
                                    <InputLabel className='dark:text-white'>Language</InputLabel>

                                    <Select
                                    value={language}
                                    onChange={handleChangeLanguage}
                                    label="Language"
                                    className='dark:text-white placeholder:text-white'
                                    >
                                        <MenuItem value={"en-us"}>English</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 110 }}>
                                    <InputLabel className='dark:text-white'>Time</InputLabel>

                                    <Select
                                    defaultValue={time.toString()}
                                    onChange={handleChangeTime}
                                    label="Time"
                                    className='dark:text-white placeholder:text-white'
                                    >
                                        <MenuItem value={60}>60sec</MenuItem>
                                        <MenuItem value={120}>2min</MenuItem>
                                        <MenuItem value={180}>3min</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            {/* Request >>> */}
                            <Button className='bg-green-700 font-semibold' variant="contained" color="success">
                                Start
                            </Button>
                        </div>
                        
                        <div className='after:select-none after:pointer-events-none relative after:content-[""] after:absolute after:bottom-0 after:h-1/3 after:w-full after:bg-gradient-to-t from-neutral-200 to-transparent'>
                            <div 
                            onMouseDown={() => setGameFocus(true)} 
                            // onKeyDown={handleKeyDown}
                            ref={gameRef}
                            style={{scrollbarWidth: "none"}}
                            className='overflow-y-scroll select-none text-2xl text-start font-mono max-w-3xl min-w-full h-52 md:h-64 rounded-lg bg-gray-300 shadow-md text-gray-500 font-bold py-5 px-4 '>
                                {modifiedText}
                                {/* <BsCursorText color='black' /> */}
                            </div>
                        </div>
                    </div>
                </div>
                <hr className='w-full block h-2 border-0 border-t border-t-black dark:border-t-white' />
                <div>
                    2
                </div>
            </div>
        </Layout>
    );
}
