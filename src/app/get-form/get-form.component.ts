import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';


import { GetjokeService } from '../services/getjoke.service';
import { JokeURL } from '../interface/joke-url';

@Component({
  selector: 'app-get-form',
  templateUrl: './get-form.component.html',
  styleUrls: ['./get-form.component.scss'],
})
export class GetFormComponent  implements OnInit {
 
  chosen:any;
  sChosen: any; 
  categories = ['Programming','Misc','Dark','Pun','Spooky','Christmas']

  type: any;
  typeNames = ['single', 'twopart']; 
  sType:any; 

  nsfw: any; 
  religious: any; 
  political: any; 
  racist: any; 
  sexist: any;   
  explicit: any;

  
  search:any; 
 
  pJoke: any; 
  setup: any; 
  delivery: any; 
  
  index:any; 
  noJoke = true; 

  count = 0; 
  constructor(private fb: FormBuilder, private gj:GetjokeService) { }

  ngOnInit() {}

  gather(){


    if(this.type == 'any' || this.type == undefined) {
      let c = Math.floor(Math.random() * 2);
      this.sType = this.typeNames[c]; 
    } else {
      this.sType = this.type; 
    }
    
    if(this.chosen == 'Any' || this.chosen == undefined) {
      let b = Math.floor(Math.random() * 6);
      this.sChosen = this.categories[b]; 
    } else {
      this.sChosen = this.chosen; 
    }

    let sendData:JokeURL = {
      category: this.sChosen ?? "Pun",
      flags: {
        'nsfw': true,
        'religious':false,
        'political': false,
        'racist': false, 
        'sexist':false,
        'explicit':false
      },
      type: this.sType ?? "", 
      search: this.search ?? "",
    }; 
    
    return sendData;
  }

  //click will fire twice 
  getJoke() {
    this.noJoke = true; 
    let x = this.gather();

    this.setup = "";
    this.delivery = "";
    this.pJoke = ""; 
     this.gj.getJoke(x).subscribe(async (response)=>{
      if(!response.error) {
        if(response.type=='twopart') {
          this.setup = await response.setup;  
          this.delivery = await response.delivery;  
          this.noJoke = true;
          this.scrollBot();
        } else {
            this.pJoke = await response.joke;
            this.noJoke = true;
            this.scrollBot(); 
        }

      } else {
          this.noJoke = false;
          this.pJoke = "No matching joke found (try less filters!)"; 
           this.scrollBot();
      }
      if(this.sChosen == 'Misc'){
        this.sChosen = 'Classic'
      } else {
        this.sChosen = x.category; 
      }
    }, err => console.error('Observer got an error: ' + err));
     this.scrollBot();
     this.adShow(); 
    
    
    
  }
  scrollBot(){
    let bot = document.getElementById('bot');
      if (bot !== null) {
        bot.scrollIntoView();
        bot = null;
      }
    }
  async adShow(){
    if(this.count == 5) {
    const options2: BannerAdOptions = {
        adId:'ca-app-pub-3136625989999070/2487302895',
        isTesting:true,
      }
      await AdMob.prepareInterstitial(options2); 
      await AdMob.showInterstitial();
      this.count = 0;
    } else {
      this.count++; 
    }
  }

    

}
