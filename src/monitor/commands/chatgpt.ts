import axios from 'axios';

export const sendAiRequest = async (messages: string) => {
  const OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY || '';

  const requestBody = {
    model: 'gpt-3.5-turbo',
    temperature: 0.6,
    messages,
    stream: false,
    // prompt: prompt,
    // max_tokens: 300,
    // top_p: 1,
    // frequency_penalty: 0,
    // presence_penalty: 0,
    // n: 1,
  };
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPEN_AI_API_KEY}`,
        },
      }
    );
    if (response.status === 200) {
      const _msg = response.data.choices[0].text;
      return _msg.startsWith('？')
        ? response.data.choices[0].text.slice(1)
        : _msg;
    }
    return 'Timeout';
  } catch (error) {
    console.error(error);
    return `😭出错了，请稍后再试。\n错误原因：${error}`;
  }
};
