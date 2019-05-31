import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from './room.interface';
import { Veranstaltung } from './veranstaltung.interface';
import { MessageService } from './message.service';




@Injectable({
    providedIn: 'root'
})

export class HttpServiceService {

    // end-point url
    base_url: string = 'http://127.0.0.1:8000/api/';

    constructor(private http: HttpClient, private messageService: MessageService) { }

/**
    // Methode zum Abrufen aller Räume
    getRooms(): Observable<Room[]>{
        console.log('Abrufen aller Räume vom Server');
        return this.http.get<Room[]>(this.base_url + 'room/');
    }
**/
    // Methode zum Abrufen aller Veranstaltungen
    getEvents(): Observable<Veranstaltung[]>{
        console.log('Abrufen aller Veranstaltungen vom Server');
        return this.http.get<Veranstaltung[]>(this.base_url + 'event/');
    }
/**
    // Methode zum Abrufen genau eines Raumes
    getRoom(id: string): Observable<Room>{
        return this.http.get<Room>(this.base_url + 'room/' + id + '/');
    }

    // Methode zum Anlegen eines Raumes
    addRoom(newRoom: Room): Observable<Room>{
        return this.http.post<Room>(this.base_url + 'room/', newRoom, {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        );
    }
**/
    // Methode zum Anlegen einer Veranstaltung
    addEvent(newEvent: Veranstaltung): Observable<Veranstaltung>{
        console.log('Veranstaltung angelegt');
        if (!newEvent.bezeichnung || !newEvent.bis || !newEvent.datum || !newEvent.max_teilnehmer || !newEvent.ort || !newEvent.von) {
            this.errorBezeichnung(newEvent);
            this.errorBis(newEvent);
            this.errorDatum(newEvent);
            this.errorMaxTeilnehmer(newEvent);
            this.errorOrt(newEvent);
            this.errorVon(newEvent);
        } else {
        this.messageService.add('Veranstaltung wurde angelegt');
        }
        return this.http.post<Veranstaltung>(this.base_url + 'event/', newEvent, {
            headers: {
                'Content-Type': 'application/json'
            }
        })        ;
    }

    // Error-Methoden Veranstaltung anlegen
    errorBezeichnung(event: Veranstaltung) {
        if(!event.bezeichnung) {
            return this.messageService.add('Veranstaltungsbezeichnung muss eingegeben werden!');
        }
    }

    errorBis(event: Veranstaltung) {
        if(!event.bis) {
            return this.messageService.add('Uhrzeit bitte im Format HH:MM eingeben!');
        }
    }

    errorVon(event: Veranstaltung) {
        if(!event.von) {
            return this.messageService.add('Uhrzeit bitte im Format HH:MM eingeben!');
        }
    }

    errorDatum(event: Veranstaltung) {
        if(!event.datum) {
            return this.messageService.add('Datum bitte im Format YYYY-MM-DD eingeben!');
        }
    }

    errorMaxTeilnehmer(event: Veranstaltung) {
        if(!event.max_teilnehmer) {
            return this.messageService.add('Bitte die Anzahl der Teilnehmer eingeben!');
        }
    }

    errorOrt(event: Veranstaltung) {
        if(!event.ort) {
            return this.messageService.add('Der eingegebene Raum existiert nicht!');
        }
    }

   

     
}
