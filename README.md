# 📁 scratch-image-uploader
a chrome(ium) extension which allows image uploading directly through scratch 
## 💾 Installation
[get it from the chrome webstore](https://chrome.google.com/webstore/detail/scratch-image-uploader/ofjfkbdgogigeclofnlgpbimaaohkjoo) or [install it using chrome's built in development mode for extensions](https://developer.chrome.com/extensions/getstarted)

## 📜 Usage as a userscript
while not officially supported, you can also use it as a userscript and it should work fine. the browser extension is recommended though. only use this if you can't install browser extensions or you use a browser which is not yet supported. 

```js
// ==UserScript==
// @name         Scratch Image Uploader
// @namespace    https://jeffalo.net/
// @version      1.0
// @description  Use Scratch project thumbnails to upload images to be used on the forums.
// @author       Jeffalo
// @icon         https://raw.githubusercontent.com/JeffaloBob/scratch-image-uploader/master/images/logo_1000.png
// @include      https://scratch.mit.edu/discuss/*
// @require      https://raw.githubusercontent.com/JeffaloBob/scratch-image-uploader/master/text-field-edit.js
// @require      https://raw.githubusercontent.com/JeffaloBob/scratch-image-uploader/master/content.js
// @grant        none
// ==/UserScript==
```
thanks to [@Boomer001](https://scratch.mit.edu/users/Boomer001/) for the conversion!

## 📝 TODO
- fix on firefox

- switch to using assets instead of project thumbnails (needs discussion)

- add a menu for changing an image after it's been done. (needs design)

- add user feedback when using drag and drop

- i dont know if this is possible or not, but perhaps when adding the file upload button in, it could be done in a way that it looks like it all loads at the same time?