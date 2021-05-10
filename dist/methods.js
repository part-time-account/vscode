"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserHome = void 0;
var shelljs_1 = __importDefault(require("shelljs"));
var process_1 = require("process");
var fs = __importStar(require("fs"));
var node_emoji_1 = __importDefault(require("node-emoji"));
var chalk_1 = __importDefault(require("chalk"));
var request_1 = __importDefault(require("request"));
var progress_1 = __importDefault(require("progress"));
var echo = console.log;
function getUserHome() {
    return process.env[process.platform == 'win32' ? 'USERPROFILE' : 'HOME'];
}
exports.getUserHome = getUserHome;
var CLIAction = /** @class */ (function () {
    function CLIAction() {
        this.HomeDir = getUserHome();
        this.ext =
            'https://raw.githubusercontent.com/Yoshiturkey/vscode-ext-installer/master/extensions.txt';
    }
    CLIAction.prototype.install = function () {
        request_1.default(this.ext, function (error, response, body) {
            if (error !== null) {
                echo(chalk_1.default.red('ファイルの読み込みに失敗しました'), error);
                process_1.exit(1);
            }
            var extensions = body.split(/\r\n|\r|\n/);
            var len = extensions.length;
            var bar = new progress_1.default(':bar', { total: len });
            extensions.forEach(function (ext) {
                shelljs_1.default.exec("code --install-extension " + ext, { silent: true });
                bar.tick();
            });
        });
    };
    CLIAction.prototype.backup = function () {
        var b = shelljs_1.default.exec('code --list-extensions', { silent: true });
        var outputFile = this.HomeDir + "/Documents/code-extensions.backup.txt";
        fs.writeFile(outputFile, b.toString(), function (err) {
            if (err !== null) {
                echo(chalk_1.default.red('ファイルの書き出しに失敗しました'));
                process_1.exit(1);
            }
            var good = node_emoji_1.default.get('thumbsup');
            console.log(good + " Successful > " + outputFile);
        });
    };
    return CLIAction;
}());
exports.default = CLIAction;
