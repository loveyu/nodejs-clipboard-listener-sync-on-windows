const clipboardDataText = require('./ClipboardDataText');
const spawnSync = require('child_process').spawnSync;
const path = require('path');
const tmp = require('tmp');
const fs = require('fs');

class ClipboardData {
    /**
     * 同步获取获取纯文本
     * @return {String}
     */
    static getText() {
        return clipboardDataText.readSync();
    }

    /**
     * 读取剪贴板的图片，并返回临时路径，失败时返回相应错误Code(number)
     * @return {String|number}
     */
    static getBitmapPath() {
        let cmd_path = path.resolve(__dirname, 'exe_bin', 'ClipboardPasteImage_x64.exe');
        let result = spawnSync(cmd_path, [], {
            windowsHide: true
        });
        if (result.status !== 0) {
            return result.status;
        }
        let tmp_obj = tmp.fileSync({});
        let tmp_file_name = tmp_obj.name;
        tmp_obj.removeCallback();
        fs.writeFileSync(fs.openSync(tmp_file_name, 'w'), result.stdout);
        return tmp_file_name;
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
            case ClipboardEvent.CF_BITMAP:
                return ClipboardData.getBitmapPath();
            default:
                return undefined;
        }
    }
}

exports = module.exports = ClipboardData;