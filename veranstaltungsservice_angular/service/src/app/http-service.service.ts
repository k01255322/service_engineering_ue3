import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

    // Methode zum Abrufen aller Räume
    getRooms(): Observable<Room[]>{
        console.log('Abrufen aller Räume vom Server');
        return this.http.get<Room[]>(this.base_url + 'room/');
    }

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

    // Methode zum Anlegen einer Veranstaltung
    addEvent(newEvent: Veranstaltung): Observable<Veranstaltung>{
        console.log('Veranstaltung angelegt');
        this.messageService.add('Veranstaltung wurde angelegt');
        return this.http.post<Veranstaltung>(this.base_url + 'event/', newEvent, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        ;
    }

     
}
