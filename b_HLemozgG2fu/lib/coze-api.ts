const COZE_API_URL = "https://api.coze.cn/v3/chat";
const BOT_ID = "7632359544714510370";
const API_TOKEN = "pat_1ttr1gQkaOf2ZKOdOYuiN2wr0zZ23TnHDfChZIuPnFCbhYNbs7DfQTpTWdL6zTRI";

interface Message {
  role: string;
  content: string;
}

export async function sendMessage(messages: Message[], onStream: (chunk: string) => void) {
  const lastUserMessage = messages.filter(m => m.role === "user").pop();
  
  const requestBody = {
    bot_id: BOT_ID,
    stream: true,
    user_id: "visitor",
    query: lastUserMessage?.content || "",
    additional_messages: messages.map((msg: Message) => ({
      role: msg.role,
      content: msg.content,
      content_type: "text",
    })),
  };
  
  const response = await fetch(COZE_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify(requestBody),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API 请求失败: ${response.status}`);
  }

  const reader = response.body?.getReader();
  if (!reader) {
    return;
  }

  const decoder = new TextDecoder();
  let buffer = "";
  let currentEvent: string | null = null;

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }

    const decodedChunk = decoder.decode(value, { stream: true });
    
    buffer += decodedChunk;
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine) continue;
      
      if (trimmedLine.startsWith("event:")) {
        currentEvent = trimmedLine.slice(6).trim();
      } else if (trimmedLine.startsWith("data:")) {
        const data = trimmedLine.slice(5).trim();
        
        if (data === "\"[DONE]\"" || data === "[DONE]") continue;

        try {
          const parsed = JSON.parse(data);
          
          if (currentEvent === "conversation.message.delta") {
            if (parsed.content && parsed.content.trim() && parsed.type === "answer") {
              onStream(parsed.content);
            }
          }
        } catch (e) {
          continue;
        }
      }
    }
  }
}
