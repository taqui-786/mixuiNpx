// // Main index file data
// #!/usr/bin/env node

// import * as fs from 'fs'
// import {spawn} from 'child_process';

// import {program} from 'commander';
// import {appendDataToFile, fileCreatedSuccesfullyLog, findTargetFile, getWriteComponentPath,initTaquiUi,writeFile}from './utils/index.js'
// import chalk from 'chalk';
// import ora from 'ora';

// process.on("SIGINT", () => process.exit(0))
// process.on("SIGTERM", () => process.exit(0))


// // Setting up Init command
// program.command('init').option("--skip <type>", "Skip a specific step")
// .action(async (opition) => {
   
//     initTaquiUi()
//     // if(opition.skip === 'shadcn'){
//     //     // start installing item
//         // initTaquiUi()
//     // }else{
//     //     console.log("Intalling Shadcn");
//     //     const child = spawn("npx shadcn-ui@latest init",{
//     //         stdio:"inherit",
//     //         shell:true,
//     //     });
//     //     // Handle child process exit
// 	// 		child.on("close", (code) => {
// 				// initTaquiUi();
// 	// 		});
        
//     // }
    
// });
// program.command('add <component>')
// .description('Add a new component')
// .action(async (component) => {
//     if (component === 'hackerbutton') {
//         // Create File for HackerButton
       
//         writeFile(
//             'HackerButton.tsx',
//             'https://raw.githubusercontent.com/taqui-786/mixcnui/main/src/components/mdx/HackerButton.tsx',
//             getWriteComponentPath('HackerButton')
//         );
//     }else if(component === 'testing'){
//         const path = findTargetFile('mount.ts')
//         appendDataToFile(
//             path as string,
//             'Hello this is inserted Data'
            
//         );
//         console.log("The Path is -> ", path);
        

//     } else if(component === 'textrotator'){
//         writeFile(
//             'TextRotator.tsx',
//             'https://raw.githubusercontent.com/taqui-786/mixcnui/main/src/components/mdx/TextRotator.tsx',
//             getWriteComponentPath('TextRotator')
//         );
//         const spinner = ora(chalk.yellow(`Inserting some styles in CSS file ...`)).start()
//         const path = findTargetFile('mount.ts')
//         const styles = `
//          /* ---------------- Mixcnui components styles --------------------- */
//   /* TEXT ROTATOR STYLES  */
// .animate-text-slide {
//   animation: text-slide 12.5s cubic-bezier(0.83, 0, 0.17, 1) infinite;
// }

// @keyframes text-slide {
//   0%,
//   16% {
//     transform: translateY(0%);
//   }

//   20%,
//   36% {
//     transform: translateY(-16.65%);
//   }

//   40%,
//   56% {
//     transform: translateY(-33.32%);
//   }

//   60%,
//   76% {
//     transform: translateY(-50%);
//   }

//   80%,
//   96% {
//     transform: translateY(-66.65%);
//   }

//   100% {
//     transform: translateY(-83.33%);
//   }
// }`
//         appendDataToFile(
//             path as string,
//             styles
            
//         );
//         // console.log("The Path is -> ", path);
//         spinner.succeed()
//         fileCreatedSuccesfullyLog()

//     } else {
//         console.log(chalk.red.bold(`Unknown component: ${component}`));
//     }
// });


// program.parse(process.argv);














// // second  index file data ---------------------------------------------------------------------
// import fs from "fs";
// import * as https from "https";
// import { spawn } from "child_process";
// import ora from "ora";
// import chalk from "chalk";
// import path from "path";

// export const uiFolder = "components/mixui";

// export function fileCreatedSuccesfullyLog( ){
//   console.log(chalk.green.bold("🎉 Your Component is ready to use."));
// }
// export function getWriteComponentPath(component: string) {
	
//   const path = "./src";

//   if (fs.existsSync(path)) {
//     return "./src/components/mixui/" + component + ".tsx";
//   } else {
//     return "./components/mixui/" + component + ".tsx";
//   }
// }
// export function writeFile(action: string, url: string, path: string) {
// 	const spinner = ora(chalk.yellow(`Creating ${action}...`)).start();
//   https
//     .get(url, (response) => {
//       let data = "";

//       response.on("data", (chunk) => {
//         data += chunk;
//       });

//       response.on("end", () => {
//         fs.writeFile(path, data, (err) => {
//           if (err) {
//             console.error("Fail to create " + action, err);
//           }
// 		  spinner.succeed(chalk.green("File created!"));
		
//         });
//       });
//     })
//     .on("error", (err) => {
//       console.error(chalk.red("Fail to create " + action, err));
//     });
// }
// export function initTaquiUi() {
//   const spinner = ora(chalk.blue("Initializing...")).start();

//   setTimeout(() => {
//     spinner.color = "yellow";
//     spinner.text = "Creating Folder '/component/nextcn-ui";
//     if (
//       !fs.existsSync("./src/" + uiFolder) &&
//       !fs.existsSync("./" + uiFolder)
//     ) {
//       if (fs.existsSync("./src")) {
//         fs.mkdirSync("./src/" + uiFolder, { recursive: true });
//       } else {
//         fs.mkdirSync("./" + uiFolder, { recursive: true });
//       }
//     }
//     setTimeout(() => {
//       spinner.succeed(chalk.green("Done!"));
//       console.log(chalk.green.bold("Your Component is ready to use."));
//     }, 2000);
//   }, 1000);
// }


// /**
//  * Recursively searches for a target file starting from a specified directory.
//  * @param targetFileName - The name of the target file to search for.
//  * @param startDir - The directory to start the search from. Defaults to the current working directory.
//  * @returns The full path to the target file if found, otherwise null.
//  */
// export function findTargetFile(targetFileName: string, startDir: string = process.cwd()): string | null {
//   function searchDirectory(directory: string): string | null {
//     const files = fs.readdirSync(directory);
//     for (const file of files) {
//       const fullPath = path.join(directory, file);
//       const stat = fs.statSync(fullPath);
//       if (stat.isFile() && path.basename(fullPath) === targetFileName) {
//         return fullPath;
//       } else if (stat.isDirectory()) {
//         const result = searchDirectory(fullPath);
//         if (result) {
//           return result;
//         }
//       }
//     }
//     return null;
//   }

//   return searchDirectory(startDir);
// }


// /**
//  * Appends data to the specified file. Creates the file if it does not exist.
//  * @param filePath - The path of the file where data will be written.
//  * @param data - The data to be written to the file.
//  */
// export function appendDataToFile(filePath: string, data: string): void {
//   fs.appendFileSync(filePath, data, "utf8");
//   console.log(chalk.blue.bold(`Data has been appended to ${filePath}`));
// }

// /**
//  * Inserts a new color definition into the extend.colors object in a Tailwind CSS config file.
//  * @param filePath - The path of the Tailwind CSS config file.
//  * @param newColorDefinition - The new color definition to be inserted.
//  */
// export function insertColorDefinition(filePath: string, newColorDefinition: string): void {
//   if (fs.existsSync(filePath)) {
//     let fileContent = fs.readFileSync(filePath, "utf8");

//     // Regex to find the extend.colors object
//     const extendColorsRegex = /(extend:\s*\{\s*colors:\s*\{)([^]*?)(\s*\}\s*\}\s*,)/;

//     if (extendColorsRegex.test(fileContent)) {
//       fileContent = fileContent.replace(extendColorsRegex, `$1$2${newColorDefinition}$3`);
//       fs.writeFileSync(filePath, fileContent, "utf8");
//       console.log(`New color definition has been inserted into ${filePath}`);
//     } else {
//       console.error(`Unable to find the extend.colors object in ${filePath}`);
//     }
//   } else {
//     console.error(`File ${filePath} does not exist.`);
//   }
// }