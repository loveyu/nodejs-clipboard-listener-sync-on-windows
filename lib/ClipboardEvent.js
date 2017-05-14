/**
 * j剪贴板事件处理
 */
class ClipboardEvent {


    /**
     * 构造方法
     */
    constructor() {
        this.start_pip_process();
        /**
         * 监听器列表
         * @type {{}}
         */
        this.listener = {
            //CF_TEXT=>[{callback},]
        };
    }

    /**
     * 启动进程间通信，箭头剪贴板事件
     */
    start_pip_process() {
        const spawn = require('child_process').spawn;
        const path = require('path');
        let cmd_path = path.resolve(__dirname, 'exe_bin', 'ClipBoardListener_x64.exe');
        const clipboard_spawn = spawn(cmd_path, []);
        clipboard_spawn.stdout.on('data', (data) => {
            data = data.toString().split(",");
            if (data.length !== 2) {
                return;
            }
            let type = parseInt(data[1]);
            this.notify_listener(type, parseInt(data[0]));
        });

        clipboard_spawn.stderr.on('data', (data) => {
            console.log(`clipboard listener process stderr: ${data}`);
        });

        clipboard_spawn.on('close', (code) => {
            console.log(`clipboard listener process is exit by other application, code: ${code}.`);
            setTimeout(() => {
                console.log("ready restart clipboard listener process.");
                this.start_pip_process();
            }, 0)
        });

        console.log(`clipboard listener process started.`);
    }

    /**
     * 通知监听者
     * @param {number} type
     * @param {number} index 第多少个事件
     */
    notify_listener(type, index) {
        if (this.listener.hasOwnProperty(type)) {
            for (let i in this.listener[type]) {
                if (this.listener[type].hasOwnProperty(i) && typeof this.listener[type][i] === "function") {
                    this.listener[type][i]([type, index], type);
                }
            }
        }
        let CF_ALL = ClipboardEvent.CF_ALL;
        if (this.listener.hasOwnProperty(CF_ALL)) {
            for (let i in this.listener[CF_ALL]) {
                if (this.listener[CF_ALL].hasOwnProperty(i) && typeof this.listener[CF_ALL][i] === "function") {
                    this.listener[CF_ALL][i]([type, index], type);
                }
            }
        }
    }

    /**
     * 添加一个监听器
     * @param {Function} call
     * @param {number} type 指定的类型
     */
    addListener(call, type) {
        if (!this.listener.hasOwnProperty(type)) {
            this.listener[type] = [];
        }
        this.listener[type].push(call);
    }
}

/**
 * 标记为全部类型
 * @type {number}
 */
ClipboardEvent.CF_ALL = 999;

/**
 * 文本类型数据
 * @type {number}
 */
ClipboardEvent.CF_TEXT = 1;

/**
 * 图片类型数据
 * @type {number}
 */
ClipboardEvent.CF_BITMAP = 2;

exports = module.exports = ClipboardEvent;