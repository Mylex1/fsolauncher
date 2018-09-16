// fsolauncher
// \src\lib\utils\playAudio.ts

const audios: Array<[string, HTMLAudioElement]> = [];

/**
 * Play an audio file.
 * @param file The audio file.
 */
export default function(file: string) {
   const theAudio = audios.find(audio => audio[0] === file);

   if (theAudio) {
      if (!theAudio[1].paused) {
         theAudio[1].currentTime = 0;
      } else {
         theAudio[1].play();
      }
   } else {
      const audio = new Audio("assets/sounds/" + file);
      audio.volume = 0.2;
      audios.push([file, audio]);

      audio.play();
   }
}
