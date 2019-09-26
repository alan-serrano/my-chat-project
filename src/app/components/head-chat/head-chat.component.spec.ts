import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadChatComponent } from './head-chat.component';

describe('HeadChatComponent', () => {
  let component: HeadChatComponent;
  let fixture: ComponentFixture<HeadChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
