#!/usr/bin/env node

import { Command } from "commander"
import { getPackageInfo } from "./utils/get-package-info.js"
import { add } from "./command/add.js"
import { init } from "./command/init.js"

process.on("SIGINT", () => process.exit(0))
process.on("SIGTERM", () => process.exit(0))

async function main() {
  // Get the Package Info 
  const packageInfo = await getPackageInfo()
  // Starting Program ---
  const program = new Command()
    .name("mixcn-ui")
    .description("add components and dependencies to your project")
    .version(
      packageInfo.version || "1.0.0",
      "-v, --version",
      "display the version number"
    )
program.addCommand(init).addCommand(add)
  program.parse()
}
main()