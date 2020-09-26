⚠ this extension is deprecated! check out the new fully featured extension over at [Scratch Addons](https://scratchaddons.com/). in Scratch Addons, it has been renamed to "Forum Image Uploader" 

this repository remains as an archive, and to report bugs with the new version of the addon in Scratch Addons 

# 📁 scratch-image-uploader
a chrome(ium) extension which allows image uploading directly through scratch 
## 💾 Installation
[get it from the chrome webstore](https://chrome.google.com/webstore/detail/scratch-image-uploader/ofjfkbdgogigeclofnlgpbimaaohkjoo) or [install it using chrome's built in development mode for extensions](https://developer.chrome.com/extensions/getstarted)

## 📜 Usage as a userscript
while not officially supported (there might be random issues), you can also use it as a userscript and it should work fine. until a better solution for firefox support is done, this is the only way to use it on firefox.

[click here to install userscript](https://gist.github.com/JeffaloBob/9ad73b0728863f85832bb6703b6b7875/raw/scratch-image-uploader.user.js)

```js
// ==UserScript==
// @name         Scratch Image Uploader
// @namespace    https://jeffalo.net/
// @version      0.0.5
// @updateURL    https://gist.github.com/JeffaloBob/9ad73b0728863f85832bb6703b6b7875/raw/scratch-image-uploader.user.js
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
- switch to using assets instead of project thumbnails (needs discussion)

- add a menu for changing an image after it's been done. (needs design)

- add user feedback when using drag and drop

- i dont know if this is possible or not, but perhaps when adding the file upload button in, it could be done in a way that it looks like it all loads at the same time?
