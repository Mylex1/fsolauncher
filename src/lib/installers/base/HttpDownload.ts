// fsolauncher
// \src\lib\installers\base\HttpDownload.ts

import { EventEmitter } from "events";

import * as fs from "fs";
import * as http from "http";

export default class HttpDownload extends EventEmitter {
   /**
    * Current amount of progress.
    */
   private progress: number = 0;
   /**
    * The download HTTP URL source.
    */
   private source: string;
   /**
    * The local filestream to store the file.
    */
   private fileStream: fs.WriteStream;
   /**
    * The request being made.
    */
   private request: http.ClientRequest;
   /**
    * The length of the response.
    */
   private length: number;
   /**
    * Total number of bytes read.
    */
   private bytesRead: number;
   /**
    * The resource file name.
    */
   private fileName: string;
   /**
    * Number of times the download has retried.
    */
   public retries: number;
   /**
    * Indicates if the download has failed.
    */
   public failed: boolean;
   /**
    * HTTP Request Error message.
    */
   public errMessage: string;
   /**
    * Indicates if the download has started.
    */
   public hasStarted: boolean;
   /**
    * Indicates if the download is paused.
    */
   public paused: boolean;
   /**
    * The server response.
    */
   private response: http.IncomingMessage;

   /**
    * Builds a new download.
    * @param source The HTTP url of the resource.
    */
   public constructor(source: string, target?: string) {
      super();
      this.source = source;
      this.fileName = target
         ? "downloads/" + target + "/" + source.split("/").pop()
         : "downloads/" + source.split("/").pop();
   }

   /**
    * Begins downloading the file.
    */
   public run() {
      this.failed = false;
      this.hasStarted = true;
      this.progress = 0;
      this.bytesRead = 0;
      this.length = 0;
      this.paused = false;
      this.errMessage = null;

      this.fileStream = fs.createWriteStream(this.fileName);
      this.request = http.get(this.source, this.download);
      this.request.on("error", this.onError);
      this.request.setTimeout(15000, () => {
         this.onError(new Error("Download has timed out"));
      });
   }

   /**
    * Handles the download and all its events.
    * @param response HttpResponse
    */
   private download = (response: http.IncomingMessage) => {
      this.response = response;
      this.length = parseInt(response.headers["content-length"], 10);

      response.on("data", this.onData);
      response.on("error", this.onError);
      response.on("end", this.onEnd);
   };

   /**
    * Event when response data is received.
    * @param chunk Response chunk.
    */
   private onData = (chunk: string | Buffer) => {
      this.fileStream.write(chunk);
      this.bytesRead += chunk.length;

      this.progress = this.getProgress();
      this.emit("progress", this.progress);
   };

   /**
    * Event when an error occurs while downloading.
    * @param error
    */
   private onError = (error: Error) => {
      this.errMessage = error.message;
      this.failed = true;
      this.request.abort();
      this.emit("error", error.message);
   };

   /**
    * Event when the download finishes.
    */
   private onEnd = () => {
      this.progress = 100;
      this.fileStream.end();
      this.emit("end", this.fileName);
   };

   /**
    * Obtains the current download progress.
    */
   public getProgress = (): number =>
      parseInt(((100.0 * this.bytesRead) / this.length).toFixed(2));

   /**
    * Retry the download.
    */
   public retry() {
      this.retries++;
      this.run();
   }

   /**
    * Abort the HTTP Request.
    */
   public abort = () => {
      if (this.request) {
         this.request.abort();
      }
   };

   /**
    * Pauses the current download.
    */
   public pause() {
      if (this.response) {
         this.response.pause();
         this.paused = true;
      }
   }

   /**
    * Resumes the current download.
    */
   public resume() {
      if (this.paused) {
         this.response.resume();
      }
   }

   /**
    * Quick hashing.
    * @param str String to hash.
    */
   private getHash(str: string) {
      let hash = 0,
         i,
         chr;
      if (str.length === 0) {
         return hash;
      }
      for (i = 0; i < str.length; i++) {
         chr = str.charCodeAt(i);
         hash = (hash << 5) - hash + chr;
         hash |= 0; // Convert to 32bit integer
      }
      return hash;
   }
}
