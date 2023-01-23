import { Command, CompletionsCommand } from "cliffy/command/mod.ts";
import { buildCommand } from "./commands/build.ts";
import { capCommand } from "./commands/cap.ts";

await new Command()
  .name("denocap")
  .description("A utility to take screenshots of your application.")
  .version("0.0.1")
  .command("completions", new CompletionsCommand())
  .command("build", buildCommand())
  .command("cap", capCommand())
  .parse(Deno.args);
