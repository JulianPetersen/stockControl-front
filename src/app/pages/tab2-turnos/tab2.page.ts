import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { AgregarTurnoComponent } from 'src/app/components/agregar-turno/agregar-turno.component';
import { EditTurnosComponent } from 'src/app/components/edit-turnos/edit-turnos.component';
import { Turnos } from 'src/app/models/turnos';
import { TurnosCompletados } from 'src/app/models/turnos-completados';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService } from 'src/app/services/global.service';
import { TurnosCompletadosService } from 'src/app/services/turnos-completos.service';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  
  nombreSalon:string;
  listaTurnos:Turnos[];
  dateSelect:string
  date=new Date();
  today=`${this.date.getDate()}-${this.date.getMonth()+1}-${this.date.getFullYear()}`
  formatedMoth;
  formatedDay;
  nombreUsuario:string;
  apellidoUsuario:String;

  constructor(private auth:AuthService,
              private turno:TurnosService,
              private modalController:ModalController,
              private alert:AlertController,
              private global:GlobalService,
              private loader:LoadingController,
              private turnoCompletado:TurnosCompletadosService,
              private router:Router) {}
  
  ngOnInit(){
    this.getuserById();
    this.formatearFecha(this.today)
    this.formatedToday(this.today)
    this.getTurnosByDate(this.today);


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


 getuserById(){ 
  this.auth.getUserById(JSON.parse(localStorage.getItem('infoUser')).id)
    .subscribe((res:User) => {
      this.nombreSalon = res.nombreSalon;
      this.nombreUsuario = res.nombre;
      this.apellidoUsuario = res.apellido;
      console.log(res)
    })
}

  

  getTurnosByDate(date:string){
    this.global.showLoading('cargando')
    this.turno.getTurnosByDate(localStorage.getItem('userId'), date)
      .subscribe(res =>{
        setTimeout(() => {
          this.loader.dismiss();
        }, 1000);
        console.log(res)
        this.listaTurnos = res;
      })
  }

 async deleteTurno(id:string){

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
            this.turno.deleteTurno(id)
              .subscribe(res => {
                this.getTurnosByDate(this.today)
          
              })
          },
        },
      ],
    })

    alert.present();
  }

  async agregarTurno(){
    let modal = await this.modalController.create({
      component: AgregarTurnoComponent,
      
      
    });

    modal.onDidDismiss().then(data => {
      this.getTurnosByDate(this.today);
    })
    modal.present();
  }



  SelectDate(date:string){
    let dateSelect = date.split('-');
    let day = dateSelect[2].split('T')[0]
    let month = dateSelect[1]
    let year = dateSelect[0]
    this.dateSelect = `${day}-${month}-${year}`
    console.log(this.dateSelect)
    this.formatearFecha(this.dateSelect)
    this.getTurnosByDate(this.dateSelect)
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


  async updateTurno(id, nombre, apellido, fecha,horario,userId){
    const modal = await this.modalController.create({
      component: EditTurnosComponent,
      componentProps:{
          id:id,
          nombre:nombre,
          apellido:apellido,
          fecha:fecha,
          horario:horario,
          userId:userId
      }

    });
    modal.onDidDismiss().then((data:any) =>{
      this.getTurnosByDate(this.today);
    })
    return await modal.present();
   }


   async completarTurno(id, nombreCliente, apellidoCliente, fechaTurno, horarioTurno, userId){
    
    const alert = await this.alert.create({
      header: 'Ingrese los sigientes datos',
      inputs: [
        {
          name:'persona',
          placeholder: '¿Quien realizo el trabajo?',
        },
        {
          name:'precio',
          placeholder: 'Costo del trabajo',
          type:'number'
        },
        {
          name:'observaciones',
          placeholder: 'Observaciones',
        },
      ],
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: (alertData) => {
            
            let turnoCompletado:TurnosCompletados = {
              nombreCliente:nombreCliente,
              apellidoCliente: apellidoCliente,
              fechaTurno: fechaTurno,
              horarioTurno:horarioTurno,
              realizadoPor:alertData.persona,
              userId:userId,
              monto:alertData.precio,
              observaciones:alertData.observaciones
            }
            this.turnoCompletado.createTurno(turnoCompletado)
              .subscribe((res:TurnosCompletados) => {
                console.log(res)
              })
            this.turno.deleteTurno(id)
              .subscribe(res=>{
                console.log('turno Eliminado')
                this.getTurnosByDate(this.today);
              })
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });

    await alert.present();
    
  }

  doRefresh(event){
    this.ngOnInit();
    event.target.complete();
}
}
