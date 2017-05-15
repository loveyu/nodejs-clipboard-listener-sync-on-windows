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
     * @param {ClipboardEvent} ClipboardEvent
     * @return {*}
     */
    static getDataByType(type, ClipboardEvent) {
        switch (type) {
            case ClipboardEvent.CF_TEXT:
                return ClipboardData.getText();
            default:
                return undefined;
        }
    }
}

exports = module.exports = ClipboardData;