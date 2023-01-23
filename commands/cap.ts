import { Command } from "cliffy/command/mod.ts";
import puppeteer from "puppeteer/mod.ts";
import { Image } from "imagescript/mod.ts";
import { join } from "std/path/mod.ts";
import { parse } from "std/encoding/yaml.ts";

interface Target {
  url: string;
  name: string;
}

export function capCommand() {
  return new Command()
    .name("cap")
    .description("capture the screens")
    .arguments("<config>")
    .action(async (options, config: string) => {
      const outDir = "./static/screenshots/";
      const browser = await puppeteer.launch({
        defaultViewport: { width: 1200, height: 675 },
      });

      let targets: Target[] = [];

      console.log(config);
      const text = await Deno.readTextFile(config);
      const data = parse(text);
      console.log(data);
      data.files.forEach((x: { url: string; name: string; }) => {
        targets.push({ url: x.url, name: x.name });
      });

      targets.forEach(async (target) => {
        const { url, name } = target;
        // console.log(url, " ", name);
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle2" });
        const raw = await page.screenshot();

        if (!(raw instanceof Uint8Array)) {
          console.log("Invalid Image");
          Deno.exit(0);
        }
        // convert to jpeg
        const image2x = await Image.decode(raw);
        const jpeg2x = join(outDir, `${name}.jpg`);
        console.log(jpeg2x);
        await Deno.writeFile(jpeg2x, await image2x.encodeJPEG(80));
        page.close();
      });
      //await browser.close();
    });
}
