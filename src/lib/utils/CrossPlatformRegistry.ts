// fsolauncher
// \src\lib\utils\isInstalled.ts

import { IS_MAC, IS_WINDOWS, IS_LINUX } from "./Constants";
import * as WindowsRegistry from "winreg";

const TSO_KEY = "\\SOFTWARE\\Maxis\\The Sims Online";
const FSO_KEY = "\\SOFTWARE\\Rhys Simpson\\FreeSO";
const OAL_KEY = "\\SOFTWARE\\OpenAL";
const NDP_KEY = "\\SOFTWARE\\Microsoft\\NET Framework Setup\\NDP";

/**
 * Creates a Registry Key for FSO or TSO.
 * @param code FSO or TSO.
 * @param target Target directory.
 */
export function createKey(code: string, target: string) {
   return new Promise((resolve, reject) => {
      const Key = new WindowsRegistry({
         hive: WindowsRegistry.HKLM,
         key: code == "TSO" ? TSO_KEY : FSO_KEY
      });

      Key.destroy(err => {
         if (err) {
            return reject(err.message);
         }

         Key.create(err => {
            if (err) {
               return reject(err.message);
            }

            Key.set("InstallDir", WindowsRegistry.REG_SZ, target, err => {
               if (err) {
                  return reject(err.message);
               }

               return resolve();
            });
         });
      });
   });
}

/**
 * Detects if TSO is installed on Windows or Mac.
 */
export function isTSOInstalled(): Promise<string> {
   if (IS_WINDOWS) {
      // find in win registry
      return new Promise((resolve, _reject) => {
         new WindowsRegistry({
            hive: WindowsRegistry.HKLM,
            key: TSO_KEY
         }).get("InstallDir", (err, item) => {
            if (err) {
               return resolve(null);
            }
            return resolve(item.value);
         });
      });
   }

   if (IS_MAC) {
      // documents
   }
}

/**
 * Detects if FreeSO is installed on Windows or Mac.
 */
export const isFSOInstalled = (): Promise<string> => {
   if (IS_WINDOWS) {
      // find in win registry
      return new Promise((resolve, _reject) => {
         new WindowsRegistry({
            hive: WindowsRegistry.HKLM,
            key: FSO_KEY
         }).get("InstallDir", (err, item) => {
            if (err) {
               return resolve(null);
            }
            return resolve(item.value);
         });
      });
   }

   if (IS_MAC) {
      // documents
   }
};

/**
 * Detects if Mono is installed on a Mac system.
 */
export const isMonoInstalled = (): Promise<boolean> =>
   new Promise((resolve, _reject) => {
      if (!IS_MAC) {
         return resolve(false);
      }
   });

/**
 * Detects if OpenAL is installed on a Windows system.
 */
export const isOpenALInstalled = (): Promise<boolean> =>
   new Promise((resolve, _reject) => {
      if (!IS_WINDOWS) {
         return resolve(false);
      }

      new WindowsRegistry({
         hive: WindowsRegistry.HKLM,
         key: OAL_KEY
      }).keyExists((err, exists) => {
         if (err) {
            return resolve(false);
         }
         if (exists) {
            return resolve(true);
         }
         return resolve(false);
      });
   });

/**
 * Detects if SDL 2.0 is installed on a Mac system.
 */
export const isSDLInstalled = (): Promise<boolean> =>
   new Promise((resolve, _reject) => {
      if (!IS_MAC) {
         return resolve(false);
      }
   });

/**
 * Detects if .NET 4.0 is installed on a Windows system.
 */
export const isNETInstalled = (): Promise<boolean> =>
   new Promise((resolve, _reject) => {
      if (!IS_WINDOWS) {
         return resolve(false);
      }

      new WindowsRegistry({
         hive: WindowsRegistry.HKLM,
         key: NDP_KEY
      }).keys((err, items) => {
         if (err) {
            return resolve(false);
         }

         for (let i = 0; i < items.length; i++) {
            if (
               items[i].key.indexOf("v4.0") > -1 ||
               items[i].key.indexOf("v4") > -1
            ) {
               return resolve(true);
            }
         }

         return resolve(false);
      });
   });
