import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TurnoscompletosDetallesComponent } from './turnoscompletos-detalles.component';

describe('TurnoscompletosDetallesComponent', () => {
  let component: TurnoscompletosDetallesComponent;
  let fixture: ComponentFixture<TurnoscompletosDetallesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnoscompletosDetallesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TurnoscompletosDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
