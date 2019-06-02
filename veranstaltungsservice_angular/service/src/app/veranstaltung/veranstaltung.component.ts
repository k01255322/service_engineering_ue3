import { Component, OnInit } from '@angular/core';
import { Veranstaltung } from '../veranstaltung.interface';
import { Participiant } from '../participiant.interface';
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
            }
        )
    }
    headElements = ['Bezeichnung', 'Datum', 'Von', 'Bis', 'Ort', 'Teilnehmer'];


        // Anlegen einer Veranstaltung
    onClick( vorname: string, nachname: string, veranstaltung: number) {
        this.service.addParticipant({ vorname, nachname, veranstaltung })
            .subscribe(
                (data: Participiant) => {
                    window.alert('Teilnehmer wurde angelegt');
                    window.location.reload();
                    console.log('eingefügt: ', data);
                },
                (error: any) => console.log(error)
            );
            console.log("gest");
    }
}
