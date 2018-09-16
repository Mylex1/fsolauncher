// fsolauncher
// \src\lib\interfaces\ICFFILE.ts

// Header data obtained from: https://msdn.microsoft.com/en-us/library/bb417343.aspx#cffile

export default interface ICFFile {
   cbFile: number;
   uOffFolderStart: number;
   iFolder: number;
   szName: string;
}
