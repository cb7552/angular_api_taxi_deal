import { Component, OnInit, Input } from '@angular/core';
import { PresenceService } from 'src/app/@core/services/presence.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vehicle-status',
  templateUrl: './vehicle-status.component.html',
  styleUrls: ['./vehicle-status.component.css']
})
export class VehicleStatusComponent implements OnInit {
  @Input() vehicleId;
  vehicleStatus$;
  constructor(private presence: PresenceService) { }

  ngOnInit() {
    this.vehicleStatus$ = this.presence.getPresence(this.vehicleId);
  }
}
