// fsolauncher
// \src\lib\api\JobsAPI.ts

import * as dns from "dns";

const WAIT = 60000;
const WAIT_LESS = 10000;

/**
 * Check for launcher updates.
 * @param onCheck Callback.
 */
export const checkUpdates = async (onCheck: (data: any) => void) => {
   onCheck(await fetch("http://5.189.177.216/launcher/updates"));

   setTimeout(() => checkUpdates(onCheck), WAIT);
};

/**
 * Check for remesh updates.
 * @param onCheck Callback.
 */
export const checkRemeshes = async (onCheck: (data: any) => void) => {
   onCheck(await fetch("http://5.189.177.216/launcher/remeshes"));

   setTimeout(() => checkRemeshes(onCheck), WAIT);
};

/**
 * Check Google's internet status.
 * @param onCheck Callback.
 */
export const checkInternetStatus = async (onCheck: (data: boolean) => void) =>
   dns.lookup("google.com", err => {
      onCheck(!(err && err.code === "ENOTFOUND"));

      setTimeout(() => checkInternetStatus(onCheck), WAIT_LESS);
   });
