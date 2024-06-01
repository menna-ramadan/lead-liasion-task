import { Component } from '@angular/core';

@Component({
  selector: 'app-audioes',
  templateUrl: './audioes.component.html',
  styleUrl: './audioes.component.scss',
})
export class AudioesComponent {
  isRecording = false;

  ngOnInit() {}

  startRecording() {
    this.isRecording = true;
  }

  stopRecording() {
    this.isRecording = false;
  }
}
