#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer_1 = __importDefault(require("inquirer"));
var shelljs_1 = __importDefault(require("shelljs"));
var process_1 = require("process");
var methods_1 = __importDefault(require("./methods"));
var isCode = shelljs_1.default.which('code') || false;
if (!isCode) {
    console.error('nothing a code command!!');
    process_1.exit(1);
}
console.log('vscode auto extension installer');
inquirer_1.default
    .prompt([
    {
        type: 'list',
        name: 'mode',
        message: '実行方法を選択',
        choices: ['通常インストール', 'バックアップ'],
    },
])
    .then(function (answers) {
    var ans = answers;
    var CLI = new methods_1.default();
    switch (ans.mode) {
        case 'バックアップ':
            CLI.backup();
            break;
        case '通常インストール':
            CLI.install();
            break;
    }
});
