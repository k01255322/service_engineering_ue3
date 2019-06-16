import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { Room } from '../room.interface';
import { Veranstaltung, Teilnehmer } from '../veranstaltung.interface';


@Component({
    selector: 'app-veranstaltung-anlegen',
    templateUrl: './veranstaltung-anlegen.component.html',
    styleUrls: ['./veranstaltung-anlegen.component.css'],
})


export class VeranstaltungAnlegenComponent implements OnInit {

    room: Room[];
    bezeichnung: string;
    datum: string;
    von:string;
    bis:string;
    max_teilnehmer:number;
    ort:string;



    constructor(private service: HttpServiceService) { }

    ngOnInit() {
        this.getAllRoom();
    }

    // subscribe zu der getRoom Methode und Abfragen aller Räume
    getAllRoom() {
        this.service.getRooms().subscribe(
            (data: any) => {
                this.room = data.results;
                console.log(data.results);
            }
        )
    }

    // Anlegen einer Veranstaltung
    onClick() {
        this.service.addEvent({ id: 0, bezeichnung: this.bezeichnung, datum: this.datum, von: this.von, bis: this.bis, max_teilnehmer: this.max_teilnehmer, ort: this.ort })
            .subscribe(
                (data: Veranstaltung) => {
                    window.alert('Veranstaltung wurde angelegt');
                    this.bezeichnung = '';
                    this.datum = '';
                    this.von = '';
                    this.bis = '';
                    this.max_teilnehmer = 0;
                    this.ort = '';
                    console.log('eingefügt: ', data);
                },
                (error: any) => console.log(error)
            );
    }


}
