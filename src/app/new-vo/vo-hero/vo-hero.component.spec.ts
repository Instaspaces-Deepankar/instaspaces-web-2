import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoHeroComponent } from './vo-hero.component';

describe('VoHeroComponent', () => {
  let component: VoHeroComponent;
  let fixture: ComponentFixture<VoHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
