import { existsSync } from 'fs';
import ora from 'ora';
import chalk from 'chalk';
import spawn from 'cross-spawn';

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