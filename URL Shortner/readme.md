# Project Name

This project is a simple URL shortener service built using Node.js, Express.js, and MongoDB. It allows users to shorten long URLs into shorter, more manageable links.

## Installation

1. Install [Node.js](https://nodejs.org/).
2. Run `npm install` to install the required dependencies:
   - mongoose
   - express
   - jsonwebtoken
   - ejs
   - cookie-parser
   - nodemon (optional, for development)

   ```bash
   npm install mongoose express jsonwebtoken multer ejs cookie-parser nodemon --save
3. Run `npm start` to run the application.

## Usage(Application Functionality)

## User Account Creation

1. *Navigate to Signup Page:* Visit [Signup Page](http://localhost:8003/signup) in your web browser.
2. *Fill in Details:* Enter your user information into the form and submit it.

## Logging into Your Account

1. *Access Login Page:* After successfully signing up, go to [Login Page](http://localhost:8003/login).
2. *Enter Credentials:* Input your login details and submit the form.
3. *Redirect to Homepage:* Upon successful login, you will be redirected to the landing page at [Homepage](http://localhost:8003), where you can view your generated URLs' analytics.

## Shortening a URL

1. *After Login:* On the homepage, navigate to the 'Enter your Original URL' section.
2. *Enter URL:* Paste your original URL into the input field.
3. *Generate Short URL:* Click on the 'Generate' button.
4. *View Short URL:* You will be redirected to [Homepage](http://localhost:8003), where your short URL will be displayed as 'Url Generated: http://localhost:8003/url/your_short_url'.

## Checking Short URL Analytics

1. *Visit Homepage:* Go to [Homepage](http://localhost:8003).
2. *View Analytics:* You can see the analytics of the generated URL, including the number of clicks.
3. *Cross-Check Short URL:* To verify the short URL, enter it into the URL bar and observe the increasing click count.

These are the basic operations you can perform using the ShortURL application.
