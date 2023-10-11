import {OpenAIApi,Configuration} from 'openai-edge'
const config = new Configuration({
    apiKey:process.env.OPENAI_API_KEY
})
const openai= new OpenAIApi(config)
export async function getEmbeddings(text:string) {
    try {
        const res=await openai.createEmbedding({
            model:'text-embedding-ada-002',
            input:text.replace(/\n/g,' ')
        })
        const result=await res.json()
        if (result.data && Array.isArray(result.data) && result.data.length > 0 && result.data[0].embedding) {
        return result.data[0].embedding as number[]
        }
        else {
            console.log("[OPEN AI] Unexpected response structure:", result);
            throw new Error("Unexpected response from OpenAI API");
            }
    } catch (error) {
        console.log("error calling openai embeddings api",error)
        throw error
    }
    
}