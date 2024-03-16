import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagedTeamsComponent } from './managed-teams.component';

describe('ManagedTeamsComponent', () => {
  let component: ManagedTeamsComponent;
  let fixture: ComponentFixture<ManagedTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagedTeamsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagedTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
