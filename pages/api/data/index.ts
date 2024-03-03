import type { NextApiRequest, NextApiResponse } from "next";
// import { readFileSync } from "fs";

type dataType = {
  duraction: number,
  text: string,
  locale: string,
  language: string
}
type errorType = {
  error: string
}

// const text = "data/text.json";


export default function handler(req: NextApiRequest, res: NextApiResponse<dataType | errorType>){
  res.status(200).json({
    message: "testing"
  })

  // if(req.method === "POST"){
  //   const time = req.query?.t;
  //   const language = req.query?.l;

  //   if(time && language){
  //     try{
  //       // const readData = readFileSync(text, 'utf8');
  //       // const data = JSON.parse(readData);
  //       const data = {
  //         data: 
  //         [
  //           "lorem ipsum dolor sit amet, consect lorem ipsum dolor sit amet, consect",
  //           "afkjh asoh aosh ofa oiash oha fm dolor sit amet, consect",
  //           "g3 2oig  fadgfe  fqw qw qw qwf qw fqw fct",
  //           "la fiaosjhf oisah fohnqwoih fqw fq"
  //         ]
  //       };
  //       const ranText: string = data?.data[Math.floor(Math.random() * data.data.length)];
    
  //       if(!ranText) return res.status(500).json({ error: "Something went wrong with parsing the text!" });
  //       return res.status(200).json({
  //         duraction: Number(time),
  //         text: ranText,
  //         locale: language as string,
  //         language: language === "en-us" ? "english" : "english" as string
  //       })
  //     }catch(err: any){
  //       return res.status(500).json({
  //         error: err?.message || "Something went wrong with parsing the text!"
  //       })
  //     }
  //   }else{
  //     return res.status(404).json({
  //       error: "Didn't provide data!"
  //     })
  //   }
  // }else{
  //   return res.status(400).json({
  //     error: "Bad request"
  //   })
  // }
}
