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

  constructor(private service:HttpServiceService) {
      this.getAllEvents();
    }

  ngOnInit() {
      
  }


      // subscribe zu der getEvents Methode und Abfragen aller Events
    getAllEvents(){
        this.service.getEvents().subscribe(
            (data: any) => {
                this.events = data.results;
                      for(let event of this.events) {
          event.teilnehmer = event.veranstaltung.map(function(item) {
            return item['vorname'] + " " + item['nachname'];
          });
      }
            }
        )
    }
    headElements = ['Bezeichnung', 'Datum', 'Von', 'Bis', 'Ort', 'Teilnehmer'];


}
