# openai-wordpress-content-creator

Simple script using OpenAI and WordPress APIs to generate content and pages.

### Prerequisites

- [Nodejs](https://nodejs.org/en)
- [OpenAI API key](https://platform.openai.com/account/api-keys)
- Public [WordPress domain](https://wordpress.com/)
- Public [WordPress Access Token](https://developer.wordpress.com/apps/new/)

### Install

1. `npm install`
2. "Create an application" on WordPress to obtain Client ID and Client Secret
    - Name: test
    - Description: test
    - Website URL: https://example.wordpress.com
    - Redirect URLs: http://localhost/callback
    - Javascript Origins: http://localhost
    - Type: Web
3. Rename .envtemplate to .env and fill in:
    - OPENAI_API_KEY
    - WORDPRESS_CLIENT_ID
    - WORDPRESS_CLIENT_SECRET
    - WORDPRESS_DOMAIN
4. Run `node get_oauth_code` and click URL in console
5. Click "Authorize" button, then extract the Access Code from the URL on next page
6. Place Access Code in .env WORDPRESS_ACCESS_CODE
7. Run `node req_access_token` to generate WordPress Access Token
8. Place Access Token in .env WORDPRESS_ACCESS_TOKEN (may need to wrap in quotes)
9. Adjust index.js `prompt` and `title` as you see fit
10. Run `node index`