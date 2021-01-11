import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent {
  latitude = 51.678418;
  longitude = 7.809007;
  locationChosen = false;

  onChoseLocation(event){
    this.latitude = event.coords.lat; 
    this.longitude = event.coords.lng;
    this.locationChosen = true;
  }
}