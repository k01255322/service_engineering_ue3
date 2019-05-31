import { Component, OnInit } from '@angular/core';
import { Veranstaltung } from '../veranstaltung.interface';
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-veranstaltung',
  templateUrl: './veranstaltung.component.html',
  styleUrls: ['./veranstaltung.component.css']
})
export class VeranstaltungComponent implements OnInit {

    events: Veranstaltung[];

  constructor(private service:HttpServiceService) { this.getAllEvents();}

  ngOnInit() {
      
  }


      // subscribe zu der getEvens Methode und Abfragen aller Räume
    getAllEvents(){
        this.service.getEvents().subscribe(
            (data: Veranstaltung[]) => {
                this.events = data;
            }
        )
    }

}
