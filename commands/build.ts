import { Command } from "cliffy/command/mod.ts";
import { runner } from "../utils.ts";

export function buildCommand() {
  return new Command()
    .name("build")
    .description("build denocap")
    .action(() => {
      const home = Deno.env.get("HOME");
      const cmd =
        `deno compile --unstable -A --output ${home}/.deno/bin/denocap denocap.ts`;
      runner(cmd);
    });
}
