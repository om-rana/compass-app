import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  magneticHeading: number;
  directionDegree: string;

  constructor(public navCtrl: NavController, public platform: Platform, public deviceOrientation: DeviceOrientation) {
    this.getCompassCurrentHeading();
  }

  // Get the device current compass heading
  getCompassCurrentHeading() {
    this.platform.ready().then(() => {
      if (this.platform.is("cordova")) {
        this.magneticHeading = 0;
        this.deviceOrientation.getCurrentHeading()
          .then((data: DeviceOrientationCompassHeading) => {
            this.magneticHeading = Math.round(data.magneticHeading);
            console.log("Current heading data: " + JSON.stringify(data));
          },
          (error: any) => {
            console.log("Current heading error: " + error);
          });

        this.compassWatchHeading();
      } else {
        console.log("Platform is not cordova");
      }
    });
  }

  // Watch the device compass heading changes
  compassWatchHeading() {
    const options = { frequency: 100 };

    const subscription = this.deviceOrientation.watchHeading(options)
      .subscribe((data: DeviceOrientationCompassHeading) => {
        this.magneticHeading = Math.round(data.magneticHeading);
        this.directionDisplay();
        console.log("Watch heading data: " + JSON.stringify(data));
      },
      (error: any) => {
        console.log("Watch heading errors: " + error);
      });

    // Unsubscribe the heading change events before leaving the page
    //subscription.unsubscribe();
  }

  // Function to display the direction along with the degrees
  directionDisplay() {
    if (this.magneticHeading > 23 && this.magneticHeading <= 67) {
      this.directionDegree = this.magneticHeading + "°" + " NE";
    } else if (this.magneticHeading > 68 && this.magneticHeading <= 112) {
      this.directionDegree = this.magneticHeading + "°" + " E";
    } else if (this.magneticHeading > 113 && this.magneticHeading <= 167) {
      this.directionDegree = this.magneticHeading + "°" + " SE";
    } else if (this.magneticHeading > 168 && this.magneticHeading <= 202) {
      this.directionDegree = this.magneticHeading + "°" + " S";
    } else if (this.magneticHeading > 203 && this.magneticHeading <= 247) {
      this.directionDegree = this.magneticHeading + "°" + " SW";
    } else if (this.magneticHeading > 248 && this.magneticHeading <= 293) {
      this.directionDegree = this.magneticHeading + "°" + " W";
    } else if (this.magneticHeading > 294 && this.magneticHeading <= 337) {
      this.directionDegree = this.magneticHeading + "°" + " NW";
    } else if (this.magneticHeading >= 338 || this.magneticHeading <= 22) {
      this.directionDegree = this.magneticHeading + "°" + " N";
    } else {
      console.log("Something went wrong with the degress")
    }
  }

}
