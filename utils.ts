export async function runner(arg: string, envs?: Record<string, string>) {
  const args = arg.split(" ");
  console.log("about to run: " + arg);
  if (envs != null) {
    console.log("with envs: " + JSON.stringify(envs));
  }
  const p = Deno.run({ cmd: args, env: envs });
  await p.status();
}
