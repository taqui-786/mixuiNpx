import chalk from "chalk";
import {
  COMPONENTFILE,
  findTargetFile,
  setupMixCnuiFolder,
  ShadcnuiInit,
  UIFOLDER,
  UIFOLDERPATH,
} from "./function.js";
import { logger } from "./logger.js";
import ora from "ora";
import { existsSync } from "fs";

export const initializing = async (type:string) => {
  const spinner = ora(chalk.cyan("initializing...")).start();
  const componentFile = await findTargetFile(COMPONENTFILE);
  const srcPath = `./src/components/${UIFOLDER}`;
  const rootPath = `./components/${UIFOLDER}`;

  if (componentFile) {
    if (!existsSync(srcPath) && !existsSync(rootPath)) {
      setupMixCnuiFolder();
    }
    if(type === "init"){

      spinner.succeed(chalk.green(`Project is initialized.`));
      logger.success("Now You can add components.");
    }else{
      spinner.stop()
    }
  } else {
    spinner.fail(chalk.red("Shadn-ui not installed"));
     await ShadcnuiInit()
  }
};
