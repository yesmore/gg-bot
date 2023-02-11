import axios from 'axios';

const OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY || '';

export const sendAiRequest = async (prompt: string) => {
  const requestBody = {
    prompt: prompt,
    model: 'text-davinci-003',
    max_tokens: 300,
    top_p: 1,
    temperature: 0.7,
    frequency_penalty: 0,
    presence_penalty: 0,
  };
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
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
