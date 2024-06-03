import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioesComponent } from './audioes.component';

describe('AudioesComponent', () => {
  let component: AudioesComponent;
  let fixture: ComponentFixture<AudioesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AudioesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AudioesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
