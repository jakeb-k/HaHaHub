import { Component } from '@angular/core';
import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  flagged: any = "";
  type: any = "";
  searchStr: any = "";
  x:any; 
  count = 0; 
  constructor() {
    this.initialize();
  }

  async initialize() {
    const {status} = await AdMob.trackingAuthorizationStatus(); 
    AdMob.initialize({
      requestTrackingAuthorization: true, 
      testingDevices: ['TEST_DEVICE_CODE'],
      initializeForTesting: true,
    }); 
    this.showBanner(); 
  }
  
  async showBanner() {
    const options: BannerAdOptions = {
      adId:'ca-app-pub-3136625989999070/9698293679',
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin:0, 
      isTesting:true,
    }
   
    //probs need to apply seperate ad_id or thinks its the same one
    //or dont even worry about it

    
    
    await AdMob.showBanner(options);
   
  }

}
