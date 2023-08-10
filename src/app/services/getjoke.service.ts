import { Injectable } from '@angular/core';
import { Observable, count } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JokeURL } from '../interface/joke-url';

@Injectable({
  providedIn: 'root'
})
export class GetjokeService {
  
  constructor(private http: HttpClient) { }
  //obviously need to format URL to take in sendData vals
  getJoke(sendData:JokeURL): Observable<any>{
    let flagArr = []; 

    for(const key in sendData.flags) {
      
      if(sendData.flags[key] == true) {
        //console.log(sendData.flags[$i][0])
        flagArr.push(key); 
      }
    }
  
    let flags  = flagArr.join(','); 
   
                                            //Miscellaneous?blacklistFlags=nsfw,religious&contains=test
    let url = 'https://v2.jokeapi.dev/joke/'+sendData.category+'?blacklistFlags='+flags+'&type='+sendData.type+'&contains='+sendData.search+''; 
    return this.http.get<any>(url);

  }
}

/* needed format 

url = "https://v2.jokeapi.dev/joke/'+sendData.category+'?blacklistFlags='+String(flags)+'&type='+sendData.type+'&contains='+sendData.contains'+'&amount='+amount+';"
check obj below for the obj that returns that url
{
    "formatVersion": 3,
    "category": "Programming",
    "type": "single",
    "contains": "women"
    "amount": 2,
    "flags": {
        "nsfw": true,
        "religious": true,
        "political": false,
        "racist": false,
        "sexist": false,
        "explicit": false
    },
    "lang": "en"
}

*/
