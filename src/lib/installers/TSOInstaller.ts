// fsolauncher
// \src\lib\installers\TSOInstaller.ts

import HttpDownload from "./base/HttpDownload";
import IProgress from "../interfaces/installers/IProgress";
import IInstaller from "../interfaces/installers/IInstaller";

import { EventEmitter } from "events";

const MAX_RETRIES = 5;

export default class TSOInstaller extends EventEmitter implements IInstaller {
   private downloads: HttpDownload[];
   private range: number[];
   private source: string;
   private target: string;
   private progress: number;

   /**
    * Builds a new TSOInstaller.
    * @param source Download source.
    * @param target Install directory.
    * @param range TSOCab range.
    */
   public constructor(source: string, target: string, range: number[]) {
      super();
      this.downloads = [];
      this.source = source;
      this.target = target;
      this.range = range;

      for (let i = 0; i < this.range[1]; i++) {
         this.downloads.push(
            new HttpDownload(this.source.replace("{n}", (i + 1).toString()))
         );

         this.downloads[i].on("error", () => {});
         this.downloads[i].on("end", (fileName: string) =>
            this.onDownloadEnd(this.downloads[i], fileName)
         );
      }
   }

   public run() {
      // Start first 12 which should be good enough for most connections.
      // Then let it propagate.
      for (let i = 0; i < 12; i++) {
         this.downloads[i].run();
      }
   }

   /**
    * Once one file has finished downloading:
    * - Trigger next download if available.
    * - Continue to extraction if last file.
    * @param download
    * @param fileName
    */
   private onDownloadEnd = (download: HttpDownload, fileName: string) => {
      this.emit(
         "progress",
         this.getProgress(
            "Downloading cabinet files... " +
               this.getFinishedDownloads().length +
               " out of " +
               this.downloads.length,
            "Official EA FTP Server"
         )
      );

      // If the download failed, retry.
      if (download.failed) {
         /*if (download.retries <= MAX_RETRIES) {
            return download.retry();
         }*/
         return this.onInstallationError(download.errMessage);
      }

      // If no other downloads left, end it there.
      if (this.getFinishedDownloads().length == this.downloads.length) {
         return this.emit("success");
      }

      // If everything went well, start the next download.
      let nextDownloadIndex = this.downloads.indexOf(download) + 1;

      // If the next cab is at most the last one, start it.
      if (nextDownloadIndex < this.downloads.length) {
         let nextDownload = this.downloads[nextDownloadIndex];

         while (nextDownload.hasStarted) {
            nextDownloadIndex++;
            if (nextDownloadIndex < this.downloads.length) {
               nextDownload = this.downloads[nextDownloadIndex];
            } else {
               nextDownload = null;
               break;
            }
         }

         // If we got a next download, start it.
         if (nextDownload) {
            nextDownload.run();
         }
      }
   };

   /**
    * Obtains all downloads currently in progress.
    */
   private getInProgressDownloads = () =>
      this.downloads.filter(
         (download: HttpDownload) =>
            download.getProgress() < 100 &&
            download.getProgress() > 0 &&
            download.hasStarted
      );

   /**
    * Obtains all finished downloads.
    */
   private getFinishedDownloads = () =>
      this.downloads.filter(
         (download: HttpDownload) =>
            download.hasStarted && download.getProgress() == 100
      );

   /**
    * Obtains all failed downloads.
    */
   private getFailedDownloads = () =>
      this.downloads.filter((download: HttpDownload) => download.failed);

   /**
    * Fired when a download/extraction fails.
    * @param errMessage
    */
   private onInstallationError(errMessage: string) {
      // If one cab fails, stop the installation and downloads.
      for (let i = 0; i < this.downloads.length; i++) {
         this.downloads[i].abort();
      }

      this.emit("error", "Installation failed: " + errMessage);
   }

   /**
    * Obtain the current installation progress.
    * @param details Progress details.
    * @param source Download source.
    */
   private getProgress(details: string, source?: string): IProgress {
      this.progress = parseInt(
         (
            (this.getFinishedDownloads().length / this.downloads.length) *
            100
         ).toFixed(2)
      );

      return {
         details: details,
         source: source || this.source,
         progress: this.progress
      };
   }
}
