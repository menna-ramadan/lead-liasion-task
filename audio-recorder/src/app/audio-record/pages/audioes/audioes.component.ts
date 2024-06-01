import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SharedServiceService } from '../../../shared/services/shared-service.service';
import { AudioFile } from '../../models/audio.model';
import { DURATION } from '../../../shared/contstants/update-duration.constant';

@Component({
  selector: 'app-audioes',
  templateUrl: './audioes.component.html',
  styleUrls: ['./audioes.component.scss'],
})
export class AudioesComponent implements OnInit, OnDestroy {
  isRecording = false;
  mediaRecorder!: MediaRecorder;
  audioChunks: Blob[] = [];
  audioFiles: AudioFile[] = [];
  recordingDuration = 0;
  recordingInterval!: ReturnType<typeof setInterval>;
  constructor(
    private cd: ChangeDetectorRef,
    public sharedService: SharedServiceService
  ) {}
  ngOnInit() {}

  startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.start();
      this.isRecording = true;
      this.recordingDuration = 0;
      // to update recordingDuration every second
      this.recordingInterval = setInterval(() => {
        this.recordingDuration++;
      }, DURATION.OneSecond);

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

  togglePlay(audioFile: any) {
    audioFile.isPlaying ? audioFile.audio.pause() : audioFile.audio.play();
    audioFile.isPlaying = !audioFile.isPlaying;
  }

  ngOnDestroy() {
    clearInterval(this.recordingInterval);
  }
}
