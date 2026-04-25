
// 简单的 API 测试脚本
const COZE_API_URL = "https://api.coze.cn/v3/chat";
const BOT_ID = "7632359544714510370";
const API_TOKEN = "pat_1ttr1gQkaOf2ZKOdOYuiN2wr0zZ23TnHDfChZIuPnFCbhYNbs7DfQTpTWdL6zTRI";

async function testApi() {
  console.log("🔍 开始测试 Coze API...");
  console.log("📍 API 端点:", COZE_API_URL);
  console.log("🤖 Bot ID:", BOT_ID);
  console.log("🔑 Token (前20字符):", API_TOKEN.slice(0, 20) + "...");
  
  try {
    const response = await fetch(COZE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({
        bot_id: BOT_ID,
        stream: false,
        user_id: "test_user",
        additional_messages: [{
          role: "user",
          content: "你好",
          content_type: "text",
        }],
      }),
    });
    
    console.log("📡 响应状态码:", response.status);
    console.log("📡 响应状态文本:", response.statusText);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ API 请求失败:");
      console.error(errorText);
      return false;
    }
    
    const data = await response.json();
    console.log("✅ API 请求成功!");
    console.log("📄 响应数据:", JSON.stringify(data, null, 2));
    return true;
    
  } catch (error) {
    console.error("❌ 发生错误:", error);
    return false;
  }
}

// 在浏览器中使用的简单测试函数
export async function testCozeApi() {
  return await testApi();
}

