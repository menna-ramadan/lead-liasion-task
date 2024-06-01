export interface AudioFile {
  url: string;
  isPlaying: boolean;
  recordingDuration: number;
  audio: HTMLAudioElement;
}
