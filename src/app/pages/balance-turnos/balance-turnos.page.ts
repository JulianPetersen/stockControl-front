import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { AddEgresoTurnosComponent } from 'src/app/components/add-egreso-turnos/add-egreso-turnos.component';
import { EgresoTurno } from 'src/app/models/egreso-turno';
import { Turnos } from 'src/app/models/turnos';
import { TurnosCompletados } from 'src/app/models/turnos-completados';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { EgresoTurnosService } from 'src/app/services/egreso-turnos.service';
import { GlobalService } from 'src/app/services/global.service';
import { TurnosCompletadosService } from 'src/app/services/turnos-completos.service';

@Component({
  selector: 'app-balance-turnos',
  templateUrl: './balance-turnos.page.html',
  styleUrls: ['./balance-turnos.page.scss'],
})
export class BalanceTurnosPage implements OnInit {



  nombreSalon:string;
  //Formateo de la fecha
  day: Date = new Date();
  month: Date = new Date();
  formatedYear: string;
  formatedMoth: string;
  formatedDay: number;
  anioActual;
  selectedDay;
  fechaSeleccionada;
   today;
  listGastos:EgresoTurno[];


  totalIngresos;
  totalGastos
  listTurnosCompletos:TurnosCompletados[];

  constructor(public router:Router,
              public auth:AuthService,
              public turnosCompletos:TurnosCompletadosService,
              public modalCtrl:ModalController,
              public global:GlobalService,
              public loader:LoadingController,
              public alert:AlertController,
              public egresoTurno:EgresoTurnosService) { }

  ngOnInit() {
    let mes = this.month.getMonth();
    this.obtenerMesFormateado(mes);
    this.obtenerDia();
    this.obtenerAño();
    this.getuserById()
    this.formatearFechToday()
    this.getEgresosByDate()
    this.getIngresosTurnos()
    
  }

  formatearFechToday(){
    let day = new Date()
    let dia = day.getDate().toString()
    let month = (day.getMonth() + 1).toString()
    let year = day.getFullYear();
    if (dia.length == 1) {
      dia = `0${dia}`;
    }
    if (month.length == 1) {
      month = `0${month}`;
    }
    this.today = `${dia}-${month}-${year}`
  }

  getuserById(){
    this.auth.getUserById(localStorage.getItem('userId'))
      .subscribe((res:User) => {
        this.nombreSalon = res.nombreSalon
      })
  }

  goToTurnos(){
    this.router.navigateByUrl('tabs/tab2')
  }

  goToTurnosCompletos(){
    this.router.navigateByUrl('tabs/turnos-completo')
  }

  goToBalanceTurnos(){
    this.router.navigateByUrl('tabs/balance-turnos')
  }
  obtenerDia() {
    this.formatedDay = this.day.getDate();
  }

  obtenerAño() {
    this.anioActual = this.day.getFullYear();
  }


  formatDateSelectedByMoment(data) {

    let fecha = data.split('-');
    this.formatedYear = fecha[0];
    this.formatedMoth = fecha[1];
    let mes = this.formatedMoth;
    this.obtenerMesFormateado(parseInt(mes) - 1);
    let dia = fecha[2].split('T');
    this.formatedDay = dia[0];
  }

  obtenerMesFormateado(obtainedMonth) {
    const mes = obtainedMonth;
    switch (mes) {
      case 0:
        this.formatedMoth = 'Enero';
        break;
      case 1:
        this.formatedMoth = 'Febrero';
        break;
      case 2:
        this.formatedMoth = 'Marzo';
        break;
      case 3:
        this.formatedMoth = 'Abril';
        break;
      case 4:
        this.formatedMoth = 'Mayo';
        break;
      case 5:
        this.formatedMoth = 'Junio';
        break;
      case 6:
        this.formatedMoth = 'Julio';
        break;
      case 7:
        this.formatedMoth = 'Agosto';
        break;
      case 8:
        this.formatedMoth = 'Septiembre';
        break;
      case 9:
        this.formatedMoth = 'Octubre';
        break;
      case 10:
        this.formatedMoth = 'Noviembre';

        break;
      case 11:
        this.formatedMoth = 'Diciembre';

        break;
      default:
    }
  }
  //#endregion

  mostrarInfoDia() {
    if (this.selectedDay == false) {
      this.selectedDay = true;
    } else if (this.selectedDay == true) {
      this.selectedDay = false;
    }
  }

  
  doRefresh(event){
    this.ngOnInit();
    event.target.complete();
}

getIngresosTurnos(){
  this.turnosCompletos.getTurnosByDate(localStorage.getItem('userId'),this.today)
      .subscribe((res:TurnosCompletados[]) => {
         this.listTurnosCompletos = res;
         this.totalIngresos = this.listTurnosCompletos
         .map((item) => item.monto)
         .reduce((prev, curr) => prev + curr, 0);
        })
}

getEgresosByDate(){
  this.egresoTurno.getGastoByDate(this.today, localStorage.getItem('userId'))
    .subscribe((res:EgresoTurno[]) => {
      this.listGastos = res;
      this.totalGastos = this.listGastos
      .map((item)=> item.monto)
      .reduce((prev,curr)=> prev + curr, 0)
    })
}

formatearFechaObtained(fechaSeleccionada) {
  if (fechaSeleccionada != undefined) {
    let fecha = fechaSeleccionada.split('-');
    let year = fecha[0];
    let month = fecha[1].split();
    let obtainedDia = fecha[2].split('T');
    let dia = obtainedDia[0];
    this.fechaSeleccionada = `${dia}-${month}-${year}`;
  }
}


getIngresosTurnosByDateSelect(fechaSeleccionada){
  this.global.showLoading('cargando')
  this.formatearFechaObtained(fechaSeleccionada)
  this.turnosCompletos.getTurnosByDate(localStorage.getItem('userId'),this.fechaSeleccionada)
    .subscribe((res:TurnosCompletados[])=> {
      console.log(res)
      setTimeout(() => {
        this.loader.dismiss();
      }, 1500);
      this.listTurnosCompletos = res;
      this.totalIngresos = this.listTurnosCompletos
      .map((item) => item.monto)
      .reduce((prev, curr) => prev + curr, 0);
  });
    
}

getEgresosTurnosByDateSelect(fechaSeleccionada){
  this.formatearFechaObtained(fechaSeleccionada)
  this.egresoTurno.getGastoByDate(this.fechaSeleccionada, localStorage.getItem('userId'))
    .subscribe((res:EgresoTurno[])=> {
      this.listGastos = res;
      this.totalGastos = this.listGastos
      .map((item) => item.monto)
      .reduce((prev, curr) => prev + curr, 0);
  });
}



async agregarEgreso(){
  let modal = await this.modalCtrl.create({
    component: AddEgresoTurnosComponent,
  });
  modal.onDidDismiss().then((data) => {
    this.egresoTurno
      .getGastoByDate(this.today,localStorage.getItem('userId'))
      .subscribe((res: EgresoTurno[]) => {
        this.listGastos = res;
        this.totalGastos = this.listGastos
          .map((item) => item.monto)
          .reduce((prev, curr) => prev + curr, 0);
      });
  });
  modal.present();
}


async deleteIngreso(id){
  const alert = await this.alert.create({
    header: '¿Estas seguro que quiere eliminar este mensaje?!',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
        },
      },
      {
        text: 'OK',
        role: 'confirm',
        handler: () => {
          console.log(id)
          this.turnosCompletos.deleteTurno(id)
          .subscribe(res => {
          this.getIngresosTurnos();
          this.getEgresosByDate()
      }) 
        },
      },
    ],
  })

  alert.present();
   
}

deleteEgreso(id){
  this.egresoTurno.deleteEgresoturno(id)
    .subscribe(res=>{
      this.getIngresosTurnos()
      this.getEgresosByDate();})
}
}
