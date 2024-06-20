import fs from "fs";
import * as https from "https";
import { spawn } from "child_process";
import ora from "ora";
import chalk from "chalk";

export const uiFolder = "components/mixui";

export function getWriteComponentPath(component: string) {
	
  const path = "./src";

  if (fs.existsSync(path)) {
    return "./src/components/mixui/" + component + ".tsx";
  } else {
    return "./components/mixui/" + component + ".tsx";
  }
}
export function writeFile(action: string, url: string, path: string) {
	const spinner = ora(chalk.yellow(`Creating ${action}...`)).start();
  https
    .get(url, (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        fs.writeFile(path, data, (err) => {
          if (err) {
            console.error("Fail to create " + action, err);
          }
		  spinner.succeed(chalk.green("Done!"));
		  console.log(chalk.green.bold("Your Component is ready to use."));
        });
      });
    })
    .on("error", (err) => {
      console.error(chalk.red("Fail to create " + action, err));
    });
}
export function initTaquiUi() {
  const spinner = ora(chalk.blue("Initializing...")).start();

  setTimeout(() => {
    spinner.color = "yellow";
    spinner.text = "Creating Folder '/component/nextcn-ui";
    if (
      !fs.existsSync("./src/" + uiFolder) &&
      !fs.existsSync("./" + uiFolder)
    ) {
      if (fs.existsSync("./src")) {
        fs.mkdirSync("./src/" + uiFolder, { recursive: true });
      } else {
        fs.mkdirSync("./" + uiFolder, { recursive: true });
      }
    }
    setTimeout(() => {
      spinner.succeed(chalk.green("Done!"));
      console.log(chalk.green.bold("Your Component is ready to use."));
    }, 2000);
  }, 1000);
}
