import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedServiceService {
  constructor() {}

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes} minute${
      minutes !== 1 ? 's' : ''
    } ${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''}`;
  }
}
