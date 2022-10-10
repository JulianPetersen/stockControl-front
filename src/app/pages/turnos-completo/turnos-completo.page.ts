import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { TurnoscompletosDetallesComponent } from 'src/app/components/turnoscompletos-detalles/turnoscompletos-detalles.component';
import { TurnosCompletados } from 'src/app/models/turnos-completados';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService } from 'src/app/services/global.service';
import { TurnosCompletadosService } from 'src/app/services/turnos-completos.service';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-turnos-completo',
  templateUrl: './turnos-completo.page.html',
  styleUrls: ['./turnos-completo.page.scss'],
})
export class TurnosCompletoPage implements OnInit {


  nombreSalon;
  dateSelect:string
  date=new Date();
  today=`${this.date.getDate()}-${this.date.getMonth()+1}-${this.date.getFullYear()}`
  formatedMoth;
  formatedDay;
  listaTurnosCompletos:TurnosCompletados[];


  constructor(private auth:AuthService,
    private modalController:ModalController,
    private alert:AlertController,
    private global:GlobalService,
    private loader:LoadingController,
    private turnoCompletado:TurnosCompletadosService,
    private router:Router) { }

  ngOnInit() {
    this.formatearFecha(this.today)
    this.formatedToday(this.today)
    this.getTurnosCompletosByDate(this.today)
    this.getuserById()
    
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

  formatedToday(date){
    let dia = date.split('-')[0]
    let month=  date.split('-')[1]
    let year = date.split('-')[2]
      console.log(dia)
      if(dia.length == 1){
        dia = `0${dia}`
      }
      if(month.length == 1){
        month = `0${month}`
      }
      this.today = `${dia}-${month}-${year}`
      console.log(this.today)
   }

   SelectDate(date:string){
    let dateSelect = date.split('-');
    let day = dateSelect[2].split('T')[0]
    let month = dateSelect[1]
    let year = dateSelect[0]
    this.dateSelect = `${day}-${month}-${year}`
    console.log(this.dateSelect)
    this.formatearFecha(this.dateSelect)
    this.getTurnosCompletosByDate(this.dateSelect)
  }

  formatearFecha(date:string){
    let day = date.split('-')[0]
    let month = date.split('-')[1]
    this.formatedDay = day
    this.obtenerMesFormateado(parseInt(month)-1)
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

  getTurnosCompletosByDate(date){
    this.global.showLoading('Cargando')
    this.turnoCompletado.getTurnosByDate(localStorage.getItem('userId'),date)
      .subscribe((res:TurnosCompletados[]) => {
        setTimeout(() => {
          this.loader.dismiss();
        }, 1000);
        console.log(res)
          this.listaTurnosCompletos = res;
      })
  }

 async deleteTurno(id){
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
            this.turnoCompletado.deleteTurno(id)
            .subscribe(res => {
            this.getTurnosCompletosByDate(this.today  )
            
        })
          
              
          },
        },
      ],
    })

    alert.present();
     
      
  }


 async masDetalles(id, nombreCliente,apellidoCliente, fechaTurno,horarioTurno,realizadoPor ,userId, monto,observaciones){
    let modal = await this.modalController.create({
      component: TurnoscompletosDetallesComponent,
      componentProps:{
        id:id,
        nombreCliente:nombreCliente,
        apellidoCliente:apellidoCliente,
        fechaTurno:fechaTurno,
        horarioTurno:horarioTurno,
        realizadoPor:realizadoPor,
        userId:userId,
        monto:monto,
        observaciones:observaciones
      },
      cssClass:'customModal'
      
    });

    modal.onDidDismiss().then(data => {
      this.getTurnosCompletosByDate(this.today);
    })
    modal.present();
  }


  doRefresh(event){
    this.ngOnInit();
    event.target.complete();
}
}
