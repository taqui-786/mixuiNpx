import { Command } from "commander";
import { COMPONENTFILE, findTargetFile, setupMixCnuiFolder, ShadcnuiInit } from "../utils/function.js";
import { logger } from "../utils/logger.js";
import chalk from "chalk";
import ora from "ora";

export const init = new Command()
  .name("init")
  .description("initialize your project and install dependencies")
  .option("-y, --yes", "skip confirmation prompt.", false)
  .option("-d, --defaults,", "use default configuration.", false)
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd()
  )
  .action(async (opts) => {
    try {
      const spinner = ora(chalk.cyan('initializing...')).start();
      const componentFile = await findTargetFile(COMPONENTFILE);
      if (componentFile) {
        spinner.succeed(chalk.green(`Project is initialized.`));
        setupMixCnuiFolder()
        logger.success("Now You can add compoenents.");
      } else {
        spinner.fail(chalk.red("Shadn-ui not installed"));
       await ShadcnuiInit()
      }
    } catch (error) {
      console.log(error);
    }
  });
