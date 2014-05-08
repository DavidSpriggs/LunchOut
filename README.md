Lunch Out Chrome Extension And Server
================================

Chrome extension that allows you to see who in the office is eating lunch out and where at!

## What you need:

- Chrome
- Mongodb
- Node

## Automatic Installation

* Download the packed extension file (.crx) here: [LunchOutExtension.crx](https://github.com/DavidSpriggs/LunchOutChromeExtentionAndServer/raw/master/LunchOutExtension.crx)
* In chrome, open the extensions tab: [chrome://extensions/](chrome://extensions/) (settings > tools > extensions)
* Open the folder where the LunchOutExtension.crx file was saved to.
* From the folder, drag and drop the LunchOutExtension.crx file onto the extensions page (you must drag and drop from the folder or it will not work).
* Confirm the install.

## Manual Installation

* Clone or download the repo
* Open chrome and click: settings --> tools --> extensions
* At the top of the extensions page, check the "Developer mode" box
* Click the "Load unpacked extensions.." button
* Browse to and select the "LunchOutExtention" folder from the repo and click ok
* Uncheck the "Developer mode" box
* Enjoy!

## Configuring the extension

After installing the extension, go to it's option page and set the url for the Lunch Out server you have running.

## Lunch Out Server Install

* `npm install` in the LunchOutServer folder
* Change the port the app runs on by editing `./bin/www`