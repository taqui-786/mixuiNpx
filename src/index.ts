#!/usr/bin/env node

import * as fs from 'fs'
import {spawn} from 'child_process';

import {program} from 'commander';
import {getWriteComponentPath,initTaquiUi,writeFile}from './utils/index.js'
import chalk from 'chalk';
// Setting up Init command
program.command('init').option("--skip <type>", "Skip a specific step")
.action(async (opition) => {
   
    initTaquiUi()
    // if(opition.skip === 'shadcn'){
    //     // start installing item
        // initTaquiUi()
    // }else{
    //     console.log("Intalling Shadcn");
    //     const child = spawn("npx shadcn-ui@latest init",{
    //         stdio:"inherit",
    //         shell:true,
    //     });
    //     // Handle child process exit
	// 		child.on("close", (code) => {
				// initTaquiUi();
	// 		});
        
    // }
    
});
program.command('add <component>')
.description('Add a new component')
.action(async (component) => {
    if (component === 'hackerbutton') {
        // Create File for HackerButton
       
        writeFile(
            'HackerButton.tsx',
            'https://raw.githubusercontent.com/taqui-786/Portfolio/main/src/components/HackerBtn.tsx',
            getWriteComponentPath('HackerButton')
        );
    } else {
        console.log(chalk.red.bold(`Unknown component: ${component}`));
    }
});
program.parse(process.argv);