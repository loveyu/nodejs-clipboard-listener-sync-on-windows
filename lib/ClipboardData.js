const clipboardy = require('clipboardy');
class ClipboardData {
    /**
     * 同步获取获取纯文本
     * @return {String}
     */
    static getText() {
        return clipboardy.readSync();
    }

    /**
     * 获取剪贴板的数据
     * @param {number} type
     * @param {ClipboardEvent} clipboard_event_obj
     * @return {*}
     */
    static getDataByType(type, clipboard_event_obj) {
        switch (type) {
            case clipboard_event_obj.CF_TEXT:
                return ClipboardData.getText();
            default:
                return undefined;
        }
    }
}

exports = module.exports = ClipboardData;