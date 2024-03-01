import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'

// NextJs
import { useRouter } from 'next/router';

// Mui
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

// Icons
import { BsCursorText } from 'react-icons/bs';
import { CiCircleRemove } from 'react-icons/ci';
import FormatTime from '@/utils/Format';
import { userContext } from '@/utils/UserProvider';

type GameProps = {
    text: string, 
}


export default function Game({ text }: GameProps){
    const router = useRouter();
    const user = useContext(userContext);

    const [language, setLanguage] = useState('en-us');
    const [time, seTime] = useState(60);

    const gameRef = useRef<HTMLDivElement | null>(null);
    const [modifiedText, setModifiedText] = useState<any>(<>{text}</>);
    const [gameFocus, setGameFocus] = useState(false);
    const [gameStatus, setGameStatus] = useState<"default" | "started" | "finish">("default");
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [gameTime, setGameTime] = useState(60);
    const [lettersTyped, setLettersTyped] = useState(0);
    const [userSpeed, setUserSpeed] = useState(0);
    const [userAccuracy, setUserAccuracy] = useState(0);


    const handleChangeLanguage = (event: SelectChangeEvent) => {
        setLanguage(event.target?.value);
    };

    const handleChangeTime = (event: SelectChangeEvent) => {
        seTime(Number(event.target?.value));
        setGameTime(Number(event.target?.value))
    };

    useEffect(() => {
        user?.setUserSpeed(userSpeed);
        user?.setUserAccuracy(userAccuracy);
        user?.setGamestatus(gameStatus);
        user?.setLanguage(language);
        user?.setTime(Number(time));
    }, [gameStatus, language, time, user, userAccuracy, userSpeed])

    const handleGameEnd = () => {
        setGameStatus("finish");
        setTimeout(() => {
            setUserSpeed(Math.floor(((lettersTyped/4) / time) * 60));
            setUserAccuracy(Math.min((Number((lettersTyped / text.length).toFixed(2)) * 100), 100));
            // console.log(`game is over user score is: ${userSpeed}wpm | ${userAccuracy}%  => ${lettersTyped} -- ${text.split(' ').length} -- ${text.split(' ').length / (time/60)}`);
            document?.getElementById("score-section")?.scrollIntoView({
                block: "center",
                inline: "nearest",
                behavior: "smooth"
            });
        }, 2000);
    }

    useEffect(() => {
        const game = gameRef?.current;

        if(text && game && gameFocus && gameStatus === "started"){
            if(currentIndex >= text.length){
                handleGameEnd();
            }else{
                const keyDownHandler = (event: KeyboardEvent) => {
                    const key = event.key.toString().toLowerCase();
                    let currentLetter = [...text][currentIndex]?.toString().toLowerCase();
                    let beforeText = [...text].slice(0, currentIndex+1);
                    let afterText = [...text].slice(currentIndex + 1);
                    
                    if(key){
                        const isEnglishLetter = event.key.length === 1 && /^[a-zA-Z]+$/.test(event.key);
                        if(event.key === ' ' || event.shiftKey || event.ctrlKey || !isEnglishLetter){
                            event.preventDefault();
                            // document.getElementById("currentPlace")?.scrollIntoView({ behavior: 'smooth' });
                        }
                        document?.getElementById("currentPlace")?.scrollIntoView({
                            block: "center",
                            inline: "nearest",
                            behavior: "smooth"
                        });
                        // Verify Input.
                        if(currentLetter && key === currentLetter) {
                            setLettersTyped((prev) => prev + 1);
                            setCurrentIndex((prev) => prev + 1);
                            console.log(currentLetter, currentIndex);
                            setModifiedText(
                            <>
                                {
                                    [...beforeText].map((item: string, index: number) => (
                                        <>
                                            <span autoFocus key={index} id= {index+1 >= beforeText.length ? "currentPlace" : ""} className={`text-green-600`}>{item}</span>
                                            {index+1 >= beforeText.length && <span className='p-0 m-0 text-black animate-pulse'>|</span>}
                                        </>
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
                                            <>
                                            {index+1 >= beforeText.length && <span className='p-0 m-0 text-black animate-pulse'>|</span>}
                                            {
                                                index == beforeText.length-1 ?
                                                <span key={index} className='text-red-600'>{currentLetter == ' ' ? '_' : currentLetter}</span>
                                                : <span key={index} className='text-green-600'>{item}</span>
                                            }
                                            </>
                                        ))
                                    }
                                    {afterText}
                                </>
                            );
                        }
                    }
                }
        
                document.addEventListener('keydown', keyDownHandler);

                return () => {
                    document.removeEventListener('keydown', keyDownHandler);
                }
            }
        }
    }, [currentIndex, gameFocus, gameStatus, text]);

    useEffect(() => {
        let interval: any;
        if(gameStatus == "started"){
            if(gameTime > 0){
                interval = setInterval(() => {
                    setGameTime((prev: number) => prev - 1);
                }, 1000)
            }else{
                setGameTime(0);
                handleGameEnd();
                clearInterval(interval)
            }
        }
        return () => {
            clearInterval(interval)
        }
    }, [gameTime, gameStatus]);


    return (
        <div id="game"
        className='flex flex-col justify-between items-center gap-8'>
            <div id="test" className='flex flex-wrap justify-center md:justify-between items-center gap-10 md:gap-56'>
                <div className='flex justify-between items-center gap-2 md:gap-6'>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 110 }}>
                        <InputLabel className='dark:text-white'>Language</InputLabel>

                        <Select
                        value={language}
                        onChange={handleChangeLanguage}
                        label="Language"
                        className='dark:text-gray-200 placeholder:text-gray-200 before:border-b-gray-500 font-medium'
                        >
                            <MenuItem value={"en-us"}>English</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 110 }}>
                        <InputLabel className='dark:text-white'>Time</InputLabel>

                        <Select
                        defaultValue={"60"}
                        onChange={handleChangeTime}
                        label="Time"
                        className='dark:text-gray-200 placeholder:text-gray-200 before:border-b-gray-500 font-medium'
                        >
                            <MenuItem value={60}>60sec</MenuItem>
                            <MenuItem value={120}>2min</MenuItem>
                            <MenuItem value={180}>3min</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                {
                    gameStatus === "finish" ?
                    <Button 
                    onClick={() => router?.reload()}
                    className='bg-white text-black dark:bg-transparent dark:text-white dark:border-gray-500 font-semibold' variant="outlined" color="inherit">
                        Retry?
                    </Button>
                    :
                    <Button 
                    onClick={() => setGameStatus("started")}
                    className='bg-green-700 font-semibold' variant="contained" color="success">
                        Start
                    </Button>
                }
            </div>

            <div className={`${gameStatus == "started" ? "z-50 fixed h-screen w-screen top-0 dark:bg-slate-800 bg-slate-400" : "bg-transparent"}  transition duration-500 ease-in`}>
                <p className={`${gameStatus == "started" ? "font-bold text-gray-200 my-4 mx-6 text-3xl absolute top-0 start-0" : "hidden"}`}>{FormatTime(gameTime)}</p>
                <CiCircleRemove onClick={() => setGameStatus("finish")} className={`${gameStatus == "started" ? "absolute top-0 end-0 m-2 text-white hover:text-red-400 cursor-pointer" : "hidden"}`} size={50} />

                <div className='after:select-none relative top-1/3 mx-0 lg:mx-44 after:pointer-events-none after:content-[""] after:absolute after:bottom-0 after:h-1/3 after:w-full after:bg-gradient-to-t from-neutral-200 to-transparent'>
                    <div 
                    onMouseDown={() => setGameFocus(true)} 
                    // onKeyDown={handleKeyDown}
                    ref={gameRef}
                    style={{scrollbarWidth: "none"}}
                    className='overflow-y-scroll select-none text-4xl text-start font-mono max-w-3xl min-w-full h-52 md:h-64 rounded-lg bg-gray-300 shadow-md text-gray-500 font-bold py-5 px-4 pb-36'
                    >
                        {modifiedText}
                        {/* <BsCursorText color='black' /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
