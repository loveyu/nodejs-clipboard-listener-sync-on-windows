const ClipboardEvent = require("./lib/ClipboardEvent");

let clipboard_event = new ClipboardEvent();

clipboard_event.addListener(function (data, type) {
    console.log("ClipboardEvent.CF_TEXT", data);
}, clipboard_event.CF_TEXT);

clipboard_event.addListener(function (data, type) {
    console.log("ClipboardEvent.CF_BITMAP", data);
}, clipboard_event.CF_BITMAP);