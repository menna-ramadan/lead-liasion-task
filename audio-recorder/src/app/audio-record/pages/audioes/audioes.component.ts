import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-audioes',
  templateUrl: './audioes.component.html',
  styleUrls: ['./audioes.component.scss'],
})
export class AudioesComponent implements OnInit, OnDestroy {
  isRecording = false;
  mediaRecorder!: MediaRecorder;
  audioChunks: Blob[] = [];
  audioFiles: {
    url: string;
    isPlaying: boolean;
    recordingDuration: number;
    audio: HTMLAudioElement;
  }[] = [];
  recordingDuration = 0;
  recordingInterval: any;
  constructor(private cd: ChangeDetectorRef) {}
  ngOnInit() {}

  startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.start();
      this.isRecording = true;
      this.recordingDuration = 0;
      this.recordingInterval = setInterval(() => {
        this.recordingDuration++;
      }, 1000);

      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };
      this.mediaRecorder.onstop = () => {
        clearInterval(this.recordingInterval);
        const audioBlob = new Blob(this.audioChunks);
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        const newAudioFile = {
          url: audioUrl,
          isPlaying: false,
          recordingDuration: this.recordingDuration,
          audio: audio,
        };
        this.audioFiles.push(newAudioFile);
        this.cd.detectChanges();
        this.audioChunks = [];
        this.recordingDuration = 0;
      };
    });
  }

  stopRecording() {
    this.mediaRecorder.stop();
    this.isRecording = false;
  }

  togglePlay(audioFile: any) {
    if (audioFile.isPlaying) {
      audioFile.audio.pause();
    } else {
      audioFile.audio.play();
    }
    audioFile.isPlaying = !audioFile.isPlaying;
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes} minute${
      minutes !== 1 ? 's' : ''
    } ${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''}`;
  }

  ngOnDestroy() {
    // clearInterval(this.recordingInterval);
  }
}
