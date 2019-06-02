import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { Veranstaltung } from '../veranstaltung.interface';
import { Anmelden } from '../anmelden.interface';


@Component({
  selector: 'app-participatn',
  templateUrl: './participatn.component.html',
  styleUrls: ['./participatn.component.css']
})
export class ParticipatnComponent implements OnInit {

  events: Veranstaltung[];

  constructor(private service:HttpServiceService) { }
    
  ngOnInit() {
    this.getAllEvents();
  }

  getAllEvents(){
    this.service.getEvents().subscribe(
        (data: any) => {
            this.events = data.results;
            console.log(data.results);
        }
        
    )
}

// Anlegen einer Anmeldung
onClick(vorname: string, nachname: string, vid: number) {
  console.log(vorname, nachname, vid);
  this.service.registerEvent({ vorname, nachname, vid })
      .subscribe(
          (data: Anmelden) => {
              window.alert('Anmeldung durchgeführt');
              window.location.reload();
              console.log('eingefügt: ', data);
          },
          (error: any) => console.log(error)
      );
}

}
