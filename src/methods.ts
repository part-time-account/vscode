import shelljs from 'shelljs';
import { exit } from 'process';
import * as fs from 'fs';
import emoji from 'node-emoji';
import chalk from 'chalk';
import request from 'request';
import progress from 'progress';
const echo = console.log;

export function getUserHome(): unknown {
  return process.env[process.platform == 'win32' ? 'USERPROFILE' : 'HOME'];
}

export default class CLIAction {
  HomeDir: unknown;
  ext: string;
  constructor() {
    this.HomeDir = getUserHome();
    this.ext =
      'https://raw.githubusercontent.com/Yoshiturkey/vscode-ext-installer/master/extensions.txt';
  }
  install(): void {
    request(this.ext, (error, response, body) => {
      if (error !== null) {
        echo(chalk.red('ファイルの読み込みに失敗しました'), error);
        exit(1);
      }
      const extensions = body.split(/\r\n|\r|\n/);
      const len = extensions.length;
      const bar = new progress(':bar', { total: len });
      extensions.forEach((ext: string) => {
        shelljs.exec(`code --install-extension ${ext}`, { silent: true });
        bar.tick();
      });
    });
  }
  backup(): void {
    const b: string = shelljs.exec('code --list-extensions', { silent: true });
    const outputFile = `${this.HomeDir}/Documents/code-extensions.backup.txt`;
    fs.writeFile(outputFile, b.toString(), (err) => {
      if (err !== null) {
        echo(chalk.red('ファイルの書き出しに失敗しました'));
        exit(1);
      }
      const good = emoji.get('thumbsup');
      console.log(`${good} Successful > ${outputFile}`);
    });
  }
}
