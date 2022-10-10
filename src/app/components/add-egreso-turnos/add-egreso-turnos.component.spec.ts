import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddEgresoTurnosComponent } from './add-egreso-turnos.component';

describe('AddEgresoTurnosComponent', () => {
  let component: AddEgresoTurnosComponent;
  let fixture: ComponentFixture<AddEgresoTurnosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEgresoTurnosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEgresoTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
