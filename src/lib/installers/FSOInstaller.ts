// fsolauncher
// \src\lib\installers\InsZip.ts

import * as extract from "extract-zip";

import HttpDownload from "./base/HttpDownload";
import IProgress from "../interfaces/installers/IProgress";
import IInstaller from "../interfaces/installers/IInstaller";

import { EventEmitter } from "events";

const MAX_RETRIES = 5;

export default class FSOInstaller extends EventEmitter implements IInstaller {
   private source: string;
   private target: string;
   private download: HttpDownload;
   private progress: number;

   public constructor(source: string, target: string) {
      super();
      this.source = source;
      this.target = target;
      this.download = new HttpDownload(this.source);
   }

   public run() {
      this.download.run();
      this.download.on("progress", this.onDownloadProgress);
      this.download.on("end", this.onDownloadEnd);
   }

   private getProgress = (details: string, source?: string): IProgress => ({
      details: details,
      source: source || this.source,
      progress: this.progress
   });

   private onDownloadProgress(progress: number) {
      this.progress = progress * 0.99;
      this.emit("progress", this.getProgress("Downloading client files..."));
   }

   private onDownloadEnd(fileName: string) {
      // If the download didn't fail, begin extraction.
      if (!this.download.failed) {
         this.progress = 99;
         return this.extractClientFiles(fileName);
      }

      // If we still have retries left, retry.
      if (this.download.retries <= MAX_RETRIES) {
         return this.download.retry();
      }

      // Finally give up.
      this.progress = 100;
      this.emit("progress", this.getProgress("Download has failed."));
      this.emit(
         "error",
         "The download has failed after retrying " + MAX_RETRIES + " times."
      );
   }

   private extractClientFiles = (fileName: string) =>
      extract(
         fileName,
         {
            dir: this.target,
            onEntry: this.onExtractionEntry
         },
         this.onExtractionEnd
      );

   private onExtractionEntry = (entry: any) =>
      this.emit(
         "progress",
         this.getProgress(
            "Extracting " + entry.fileName + "...",
            "Extracting in " + this.target
         )
      );

   private onExtractionEnd(error: Error) {
      if (error) {
         return this.emit("error", error.message);
      }

      return this.emit("success");
   }
}
