import { getContext } from "@/lib/context";

import { Message } from "ai/react";

export const runtime = "edge";



export async function POST(req: Request) {
  
    const { messages } = await req.json();

    const lastMessage = messages[messages.length - 1];
    
    const context = await getContext(lastMessage.content);
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