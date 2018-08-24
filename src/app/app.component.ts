import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { HomePage } from '../pages/home/home';

const config = {
  apiKey: "AIzaSyD5eV5GZC_FbCrE2HFP1VG6gJur1v1ikkc",
  authDomain: "chat-7bf21.firebaseapp.com",
  databaseURL: "https://chat-7bf21.firebaseio.com",
  projectId: "chat-7bf21",
  storageBucket: "chat-7bf21.appspot.com",
  messagingSenderId: "158551223178"
};

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(config);
  }
}
