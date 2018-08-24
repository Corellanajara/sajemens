import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';
import * as firebase from 'firebase';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  ref = firebase.database().ref('mensajes/');
  id = 0;
  error = "";
  text = {
   "number": "",
   "message": "",
   };

  constructor(private sms:SMS,public navCtrl: NavController) {

    this.ref.on('value', resp => {

      let arreglo = snapshotToArray(resp);
      if (this.id==0){
        this.id = snapshotToArray(resp).length ;
        console.log("lista completa ",arreglo);
      }else{
        this.id = snapshotToArray(resp).length ;
        let elemento = arreglo[this.id-1]
        console.log("Se ha agregado ",elemento);
        if (parseInt(elemento['numero'])){
          this.text.number = elemento['numero'];
          this.text.message = elemento['texto'];

          this.sendSms();
        }else{
          this.error = "intentaron mandar un numero que no es posible"
        }

      }

    });
  }


  sendSms(){

    this.sms.send(this.text.number, this.text.message).then((result) => {
       this.error = "salio bien";
       console.log(result);
     }, (error) => {
       this.error ="fallo!";
       console.log(error);
     });
  }
}
export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
}
