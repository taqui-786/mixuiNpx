import { Command } from "commander";

import { logger } from "../utils/logger.js";
import { componentsData } from "../utils/data.js";
import {

  writeFilesWithLinks,
} from "../utils/function.js";
import {
  installPackages,
  runShadcnUiCommand,
} from "../utils/packageInstalFunc.js";

import { initializing } from "../utils/initializing.js";

export const DEFAULT_STYLE = "default";
export const DEFAULT_COMPONENTS = "@/components";
export const DEFAULT_UTILS = "@/lib/utils";
export const DEFAULT_TAILWIND_CSS = "app/globals.css";
export const DEFAULT_TAILWIND_CONFIG = "tailwind.config.js";
export const DEFAULT_TAILWIND_BASE_COLOR = "slate";


export const add = new Command()
  .name("add")
  .description("Add components to you nextjs app")
  .argument("[components...]", "To add components")

  .option("-o, --overwrite", "To overwrite existing files.", false)

  .option("-a, --all", "add all available components", false)

  .action(async (components, opts) => {
    try {
      await initializing("add");

      components.map(async (itm: any) => {
        const isMatch = componentsData.find((cmd) => itm === cmd.command);
        if (isMatch) {
          if (isMatch.shadcnPackages !== null)
            await runShadcnUiCommand(isMatch.shadcnPackages);

          if (isMatch.packages !== null) {
            installPackages(isMatch.packages)
              .then(() => {
                writeFilesWithLinks(isMatch.files);
              })
              .catch((err) => {
                console.error(
                  "An error occurred during package installation:",
                  err
                );
              });
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
