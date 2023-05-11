const axios = require('axios');
const qs = require('querystring');

const redirectUri = 'https://localhost/callback';
const clientId = process.env.WORDPRESS_CLIENT_ID;
const clientSecret = process.env.WORDPRESS_CLIENT_SECRET;
const code = process.env.WORDPRESS_ACCESS_CODE;

(async () => {
    try {
        const response = await axios.post('https://public-api.wordpress.com/oauth2/token', qs.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
            code,
            grant_type: 'authorization_code',
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const accessToken = response.data.access_token;
        console.log('Access Token:', accessToken);
    } catch (error) {
        console.error('Access Token Error', error.response.data);
    }
})();