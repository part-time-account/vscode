#! /usr/bin/env node

import inquirer from 'inquirer';
import shelljs from 'shelljs';
import { exit } from 'process';
import CliActions from './methods';
type AnswersTypes = {
  mode: string;
};

const isCode: string | boolean = shelljs.which('code') || false;
if (!isCode) {
  console.error('nothing a code command!!');
  exit(1);
}
console.log('vscode auto extension installer');
inquirer
  .prompt([
    {
      type: 'list',
      name: 'mode',
      message: '実行方法を選択',
      choices: ['通常インストール', 'バックアップ'],
    },
  ])
  .then((answers) => {
    const ans: AnswersTypes = answers;
    const CLI = new CliActions();
    switch (ans.mode) {
      case 'バックアップ':
        CLI.backup();
        break;
      case '通常インストール':
        CLI.install();
        break;
    }
  });
