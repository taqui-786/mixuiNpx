import { Command } from "commander";
import { COMPONENTFILE, findTargetFile, setupMixCnuiFolder, ShadcnuiInit } from "../utils/function.js";
import { logger } from "../utils/logger.js";
import chalk from "chalk";
import ora from "ora";
import { initializing } from "../utils/initializing.js";

export const init = new Command()
  .name("init")
  .description("initialize your project and install dependencies")
 
  .action(async (opts) => {
    try {
     await initializing("init")
    } catch (error) {
      console.log(error);
    }
  });
