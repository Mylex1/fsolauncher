// fsolauncher
// \src\lib\index.ts

import * as Registry from "./utils/CrossPlatformRegistry";
import * as fs from "fs";
import * as ini from "ini";
import * as child_process from "child_process";
import * as rss_parser from "rss-parser";
import * as html_entities from "html-entities";

import ISoftware from "./interfaces/state/ISoftware";
import ISettings from "./interfaces/state/ISettings";
import IPost from "./interfaces/components/IPost";

/**
 * Get the Software installation status of all available
 * software.
 */
export const getSoftwareStatus = async (): Promise<ISoftware> => ({
   FSO: await Registry.isFSOInstalled(),
   TSO: await Registry.isTSOInstalled(),
   Mono: await Registry.isMonoInstalled(),
   SDL: await Registry.isSDLInstalled(),
   OpenAL: await Registry.isOpenALInstalled(),
   NET: await Registry.isNETInstalled()
});

/**
 * Obtain Settings from ini file on disk.
 */
export const getSettings = (): ISettings =>
   ini.parse(fs.readFileSync("config.ini", "utf-8"));

/**
 * Save Settings in an ini file to disk.
 */
export const persistSettings = (settings: ISettings) =>
   new Promise((resolve, reject) => {
      fs.writeFile("config.ini", ini.stringify(settings), err => {
         if (err) {
            return reject(err);
         }

         return resolve();
      });
   });

/**
 * Convert parsed entries to IPost.
 * @param entries Parsed entries.
 */
const parseBlogPosts = (entries: any) => {
   const posts: IPost[] = [];

   entries.forEach((a: any) => {
      const post: IPost = {
         body: a.content.replace(/\s{2,}/g, " ").replace(/\n/g, ""),
         date: a.pubDate.replace("+0000", "").slice(0, -9),
         headline: a.title,
         link: a.link
      };

      if (a.title != "One Year of Beta Testing") {
         posts.push(post);
      }
   });

   return posts;
};

/**
 * Fetch blog posts from FreeSO.org.
 * @param onFetch Callback to execute when finished fetching.
 */
export const fetchPosts = async (onFetch: (posts: IPost[]) => void) => {
   const response = await fetch("http://freeso.org/feed");
   const body = new html_entities.AllHtmlEntities().decode(
      await response.text()
   );

   new rss_parser().parseString(body, (_error: any, parsed: any) => {
      onFetch(parseBlogPosts(parsed.items));
   });
};

/**
 * Launch the game with parameters according to Settings.
 * @param settings The Settings.
 * @param path The executable path.
 * @param useVolcanic Launch Volcanic or regular FreeSO.
 */
export const runExecutable = (
   settings: ISettings,
   path: string,
   useVolcanic: boolean
) => {
   const executable = useVolcanic ? "Volcanic.exe" : "FreeSO.exe";
   const language = "-lang" + settings.game.language;
   let graphics = "-" + settings.game.graphics;
   let is3d = settings.game.is3d == "1" ? "-3d" : "";

   if (settings.game.graphics == "sw") {
      graphics = "";
      is3d = "";
   }

   child_process.exec(
      executable + " w " + language + " " + is3d + " " + graphics,
      {
         cwd: path
      }
   );
};
