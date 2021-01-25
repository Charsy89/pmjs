# **THIS PROJECT IS UNSUPPORTED!**
Pull requests will not be merged and issues will not be fixed. Please fork this repository or download it to make changes.

# pmjs
A small code snip used to send private messages on [Multiplayer Piano](http://www.multiplayerpiano.com); uses notes to do so.

# Usage
`sendPM(a,b);` where `a` is another person's id *(Not _id!!)*; where `b` is the message you want to send.  
I can confirm the messages you send cannot be seen by others, and that in the event it is seen, it will be seen as gibberish. AES ftw!

# How to run it
The simplest way (I know of) is to open DevTools (F12 in Chrome, Edge, and IE, CTRL+SHIFT+S in Firefox 65<, CTRL+SHIFT+I in Opera and Firefox 66>), go to the Console tab, paste in the below code, and hit Enter or Return.
```js
var s = document.createElement('SCRIPT');
s.src = "https://raw.githubusercontent.com/Charsy89/pmjs/master/pm.js";
document.body.appendChild(s);
```
This snip will inject the script into your MPP client, allowing others who have the script to send/receive messages to/from you.  
A NodeJS version is planned.
