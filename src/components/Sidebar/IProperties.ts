// fsolauncher
// \src\components\Sidebar\IProperties.ts

export default interface IProperties {
   /**
    * Method supplied by parent component in order
    * to run the game.
    *
    * @memberof IProperties
    */
   play: (e: React.MouseEvent) => void;
   /**
    * The FreeSO player count.
    */
   playerCount: number;
}
