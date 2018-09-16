// fsolauncher
// \src\lib\interfaces\ICFFOLDER.ts

import ICFData from "./ICFData";

// Header data obtained from: https://msdn.microsoft.com/en-us/library/bb417343.aspx#cffolder

export default interface ICFFolder {
   coffCabStart: number;
   cCFData: number;
   typeCompress: any;
   chunks: ICFData[];
   uncompData: Uint8Array;
}
