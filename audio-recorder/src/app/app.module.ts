import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AudioesComponent } from './audio-record/pages/audioes/audioes.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, AudioesComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
