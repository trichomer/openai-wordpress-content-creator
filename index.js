require('dotenv').config();
const axios = require('axios');
const openaiApiKey = process.env.OPENAI_API_KEY;
const wordpressApiKey = process.env.WORDPRESS_ACCESS_TOKEN;
const wordpressDomain = process.env.WORDPRESS_DOMAIN;

async function getGpt3Completion(prompt) {
  const response = await axios.post(
    'https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions',
    {
      prompt,
      max_tokens: 400,
      n: 1,
      stop: null,
      temperature: 1,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openaiApiKey}`,
      },
    }
  );
  
  console.log(response.data.choices[0].text.trim())
  return response.data.choices[0].text.trim();
};

async function createWordPressPage(title, content) {
    return await axios.post(
        `https://public-api.wordpress.com/wp/v2/sites/${wordpressDomain}/pages`,
        {
        title,
        content,
        status: 'publish',
        },
        {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${wordpressApiKey}`,
        },
        }
    );
};

(async () => {
  for (let year = 2017; year <= 2019; year++) {
    const prompt = `What are the estimated prices for the top 15 selling comic books in ${year}? Sorted in descending order by price.`;
    const completion = await getGpt3Completion(prompt);
    await createWordPressPage(`Top 15 Comic Book Prices in ${year}`, completion);
    console.log(`Created page for ${year}`);
  }
})();