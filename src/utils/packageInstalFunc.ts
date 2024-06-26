import { existsSync } from 'fs';
import ora from 'ora';
import chalk from 'chalk';
import spawn from 'cross-spawn';
import path from 'path';

type PackageManager = 'npm' | 'pnpm' | 'yarn';

function detectPackageManager(): PackageManager {
  if (existsSync('pnpm-lock.yaml')) {
    return 'pnpm';
  } else if (existsSync('yarn.lock')) {
    return 'yarn';
  } else if (existsSync('package-lock.json')) {
    return 'npm';
  } else {
    return 'npm'; // default to npm if no lock file is found
  }
}

export function installPackages(packages: string[]): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(packages)) {
        reject(new Error('Packages should be an array of strings.'));
        return;
      }
  
      const packageManager = detectPackageManager();
      const installCommand = packageManager === 'yarn' ? 'add' : 'install';
      const args = [installCommand, ...packages];
      const spinner = ora(chalk.yellow(`Installing packages: ${packages.join(', ')}`)).start();
  
      const process = spawn(packageManager, args, { stdio: 'inherit', shell: true });
  
      process.on('close', (code) => {
        if (code === 0) {
          spinner.succeed(chalk.green('Packages installed successfully!'));
          resolve();
        } else {
          spinner.fail(chalk.red('Failed to install packages.'));
          reject(new Error('Failed to install packages.'));
        }
      });
  
      process.on('error', (err) => {
        spinner.fail(chalk.red('Failed to install packages.'));
        console.error(chalk.red(err));
        reject(err);
      });
    });
  }

  // ------------ Run Shadcnui Commands ------------
export async function runShadcnUiCommand(payload: string[]) {
  if (payload.length === 0) {
    console.log("No components provided to add.");
    return;
  }

  const componentsDirSrc = path.resolve("src/components/ui");
  const componentsDir = path.resolve("components/ui");

  // Filter out components that already exist
  const filteredPayload = payload.filter((component) => {
    const componentFileSrc = path.join(componentsDirSrc, `${component}.tsx`);
    const componentFile = path.join(componentsDir, `${component}.tsx`);
    if (existsSync(componentFile) || existsSync(componentFileSrc)) {
      console.log(
        `Component ${component}.tsx already exists. ${chalk.cyan(
          "Skipping..."
        )}`
      );
      return false;
    }
    return true;
  });

  if (filteredPayload.length === 0) {
    console.log("No new components to add.");
    return;
  }

  const command = "npx";
  const args = ["shadcn-ui@latest", "add", ...filteredPayload];

  return new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit", shell: true });

    child.on("error", (error) => {
      console.error("Error running command:", error);
      reject(error);
    });

    child.on("close", (code) => {
      if (code === 0) {
        console.log("Command executed successfully.");
        resolve();
      } else {
        console.error(`Command failed with exit code ${code}.`);
        reject(new Error(`Command failed with exit code ${code}.`));
      }
    });
  });
}