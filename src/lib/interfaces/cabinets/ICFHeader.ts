// fsolauncher
// \src\lib\interfaces\ICFHEADER.ts

import ICFFolder from "./ICFFolder";
import ICFFile from "./ICFFile";

export default interface ICFHeader {
   name: any;
   cbCabinet: any;
   reserved1: any;
   reserved2: any;
   coffFiles: any;
   reserved3: any;
   versionMajor: any;
   versionMinor: any;
   cFolders: any;
   cFiles: any;
   flags: any;
   setID: any;
   iCabinet: any;
   cbCFHeader: any;
   cbCFFolder: any;
   cbCFData: any;
   cabReserve: any;
   prevCab: any;
   prevDisk: any;
   folders: ICFFolder[];
   nextCab: string;
   nextDisk: string;
   folReserve: string;
   files: ICFFile[];
}
