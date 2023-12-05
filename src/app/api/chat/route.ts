import {  OpenAIStream, StreamingTextResponse } from "ai";
import { getContext } from "@/lib/context";
import { db } from "@/lib/db";
import { chats, messages as _messages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { Message } from "ai/react";

export const runtime = "edge";



export async function POST(req: Request) {
  
    const { messages, chatId } = await req.json();

    const lastMessage = messages[messages.length - 1];
    
    const context = await getContext(lastMessage.content);
    console.log(context)
    


    const formData = new FormData();
    formData.append("query", context);
    

    const response = await fetch("http://127.0.0.1:8000/chatpdf", {
        method: "POST",
        body: formData,
    })
    const data=await response.json()
    const apiResponse = data.response;
    console.log(apiResponse)

/*
  
    const stream = OpenAIStream(apiResponse, {
      onStart: async () => {
        // save user message into db
        await db.insert(_messages).values({
          chatId,
          content: lastMessage.content,
          role: "user",
        });
      },
      onCompletion: async (completion) => {
        // save ai message into db
        await db.insert(_messages).values({
          chatId,
          content: completion,
          role: "system",
        });
      },
    });
    console.log(stream)*/
    return new Response(apiResponse);
      


    
   

}