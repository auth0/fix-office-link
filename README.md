Express.js middleware to fix office redirect/links.

This is a fork from [spilliton/fix_microsoft_links](https://raw.githubusercontent.com/spilliton/fix_microsoft_links) adapted for node.js/express.

## Introduction

Experiencing redirects to login pages when a user clicks a link to your site from a Microsoft application like Word or Excel?

This express middleware will fix that right up!  Here is some background on the issue:

If a user is already authenticated to your application in their web browser and they click a link inside MS Word to a protected URL on your application that they *should* have access to, the Microsoft application will initially provide a different cookie than the one you are already authenticated with.  This will likely cause your app to 302 the client to your app's login page.  This time the browser will be using the correct cookie, authenticate the client, and likely redirect them to whatever page your app directs users to after login.  This behavior is admitted to here: http://support.microsoft.com/kb/899927

fix-office-link is an express.js middleware that checks the http user agent to see if the request is coming from a known Microsoft app.  If it is, it responds with a page containing only a meta refresh header tag.  Very hacky, but the easiest way around this annoyance.

## Installation

```
npm i fix-office-link
```

## Usage

```javascript
var fix_office_link = require('fix-office-link');
app.use(fix_office_link);
```

## License

MIT 2014 - AUTH0 INC.