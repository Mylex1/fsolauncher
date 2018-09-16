// fsolauncher
// \src\lib\api\FreeSOAPI.ts

import ICityData from "../interfaces/api/ICityData";

/**
 * Returns the whole city data.
 * @param callback
 */
export async function getCityData(callback: (cityData: ICityData) => void) {
   const response = await fetch(
      "http://api.freeso.org/userapi/city/001/city.json"
   );

   const cityData: ICityData = await response.json();

   callback(cityData);
}

/**
 * Returns the online player count.
 * @param callback
 */
export async function getPlayerCount(callback: (count: number) => void) {
   getCityData((cityData: ICityData) => {
      if (!cityData) {
         callback(0);
      }

      let sum: number = 0;

      for (let i = 0; i < cityData.onlineCount.length; i++) {
         sum += cityData.onlineCount[i];
      }

      callback(sum);
   });
}
