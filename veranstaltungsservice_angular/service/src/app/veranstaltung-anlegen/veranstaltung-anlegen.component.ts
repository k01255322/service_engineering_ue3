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
    onClick(id: number = 0, bezeichnung: string, datum: string, von: string, bis: string, max_teilnehmer: number, ort: string, veranstaltung: Teilnehmer[]) {
        this.service.addEvent({ id, bezeichnung, datum, von, bis, max_teilnehmer, ort, veranstaltung })
            .subscribe(
                (data: Veranstaltung) => {
                    window.alert('Veranstaltung wurde angelegt');
                    window.location.reload();
                    console.log('eingefügt: ', data);
                },
                (error: any) => console.log(error)
            );
    }


}
