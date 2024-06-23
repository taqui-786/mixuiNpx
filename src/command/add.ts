import { Command } from "commander";
import { existsSync, promises as fs } from "fs";
import path from "path";
import { z } from "zod";
import { getConfig } from "../utils/getConfig.js";
import { logger } from "../utils/logger.js";
import { componentsData } from "../utils/data.js";
import {
  COMPONENTFILE,
  findTargetFile,
  getWriteComponentPath,
  setupMixCnuiFolder,
  ShadcnuiInit,
  writeFilesWithLinks,
} from "../utils/function.js";
import { installPackages } from "../utils/packageInstalFunc.js";
import ora from "ora";
import chalk from "chalk";

export const DEFAULT_STYLE = "default";
export const DEFAULT_COMPONENTS = "@/components";
export const DEFAULT_UTILS = "@/lib/utils";
export const DEFAULT_TAILWIND_CSS = "app/globals.css";
export const DEFAULT_TAILWIND_CONFIG = "tailwind.config.js";
export const DEFAULT_TAILWIND_BASE_COLOR = "slate";

const addOptionsSchema = z.object({
  components: z.array(z.string()).optional(),
  yes: z.boolean(),
  overwrite: z.boolean(),
  cwd: z.string(),
  all: z.boolean(),
});

export const add = new Command()
  .name("add")
  .description("Add components to you nextjs app")
  .argument("[components...]", "To add components")

  .option("-o, --overwrite", "To overwrite existing files.", false)

  .option("-a, --all", "add all available components", false)

  .action(async (components, opts) => {
    try {
      // const options = addOptionsSchema.parse({
      //     components,
      //     ...opts,
      //   })

      //   const cwd = path.resolve(options.cwd)
      //   console.log("Config is -> ", options);
      //   if (!existsSync(cwd)) {
      //     logger.error(`The path ${cwd} does not exist. Please try again.`)
      //     process.exit(1)
      //   }

      //   const config = await getConfig(cwd)
      //   console.log("Config is -> ", config);
      const spinner = ora(chalk.cyan('initializing...')).start();
      const componentFile = await findTargetFile(COMPONENTFILE);
      // if (!componentFile) { 
      //   spinner.fail(chalk.red("Shadn-ui not installed"));
      //   await ShadcnuiInit()
      // }
      setupMixCnuiFolder()
      spinner.stop()
      const found = components.map((itm: any) => {
        const isMatch = componentsData.find((cmd) => itm === cmd.command);
        if (isMatch) {
         
          if (isMatch.packages !== null) {
            installPackages(isMatch.packages).then(() => {
              writeFilesWithLinks(isMatch.files);
            }).catch((err) => {
              console.error('An error occurred during package installation:', err);
            })
            ;
          } else {
            writeFilesWithLinks(isMatch.files);
          }
    
        } else return logger.error(`Unknown component: ${itm}`);
      });
      // console.log(found, components);
    } catch (error) {
      console.log(error);
    }
  });
