const path = require('path');
const spawnSync = require('child_process').spawnSync;

class ClipboardDataText {
    /**
     * 读取剪贴板的内容
     * @return {String|null}
     */
    static readSync() {
        let cmd_path = path.resolve(__dirname, 'exe_bin', 'clipboard_x86_64.exe');
        let result = spawnSync(cmd_path, ["--paste"], {
            windowsHide: true
        });
        if (result.status !== 0) {
            return null;
        }
        return result.stdout.toString();
    }
}

exports = module.exports = ClipboardDataText;