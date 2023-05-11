require('dotenv').config();
const { AuthorizationCode } = require('simple-oauth2');
const redirectUri = 'https://localhost/callback';
const clientId = process.env.WORDPRESS_CLIENT_ID;
const clientSecret = process.env.WORDPRESS_CLIENT_SECRET;

const oauth2 = new AuthorizationCode({
  client: {
    id: clientId,
    secret: clientSecret,
  },
  auth: {
    tokenHost: 'https://public-api.wordpress.com',
    tokenPath: '/oauth2/token',
    authorizePath: '/oauth2/authorize',
  },
});

const authorizationUri = oauth2.authorizeURL({
  redirect_uri: redirectUri,
  scope: 'global',
  state: 'random_state',
});

console.log('Open this URL in your browser to authorize your application:');
console.log(authorizationUri);
