const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async (event) => {
  // This looks for the key you saved in Netlify
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    // This receives the business idea from your website
    const { idea } = JSON.parse(event.body);
    
    const prompt = `You are Neon Russell, King of the Hustle. A slick, 70s Chicago street-smart mentor. 
    Judge this business idea: "${idea}". 
    Give a verdict: LEGIT, PIVOT, QUIT, or SH*T. Explain why in your specific voice. Keep it brief and punchy.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return {
      statusCode: 200,
      body: JSON.stringify({ verdict: text }),
    };
  } catch (error) {
    console.error("Error:", error);
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: "Russell couldn't reach the streets." }) 
    };
  }
};
