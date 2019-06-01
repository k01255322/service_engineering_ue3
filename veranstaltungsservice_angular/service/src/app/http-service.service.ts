import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Room } from './room.interface';
import { Veranstaltung, Teilnehmer } from './veranstaltung.interface';
import { MessageService } from './message.service';
import { retry, catchError } from 'rxjs/operators';
import { Participiant } from './participiant.interface';
import { Anmelden } from './anmelden.interface';



@Injectable({
  providedIn: 'root'
})

export class HttpServiceService {

  // end-point url
  base_url: string = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient, private messageService: MessageService) { }


  // Methode zum Abrufen aller Räume
  getRooms(): Observable<Room[]> {
    console.log('Abrufen aller Räume vom Server');
    return this.http.get<Room[]>(this.base_url + 'room/');
  }

  // Methode zum Abrufen aller Veranstaltungen
  getEvents(): Observable<Veranstaltung[]> {
    console.log('Abrufen aller Veranstaltungen vom Server');
    return this.http.get<Veranstaltung[]>(this.base_url + 'event/');
  }

  // Methode zum Abrufen genau eines Raumes
  getRoom(id: string): Observable<Room> {
    return this.http.get<Room>(this.base_url + 'room/' + id + '/');
  }
  /**
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
  addParticipant(newParticipant: Participiant): Observable<Participiant> {
    console.log(newParticipant + 'Teilnehmer angelegt');
    return this.http.post<Participiant>(this.base_url + 'participator/', newParticipant, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(retry(1),
      catchError(this.handleError))
      ;
  }

  // Methode zum Anlegen einer Veranstaltung
  addEvent(newEvent: Veranstaltung): Observable<Veranstaltung> {
    console.log('Veranstaltung angelegt');
    return this.http.post<Veranstaltung>(this.base_url + 'event/', newEvent, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(retry(1),
      catchError(this.handleError))
      ;
  }

  // Methode zum Anmelden zu einer Veranstaltung
  registerEvent(newReg: Anmelden): Observable<Anmelden> {
    console.log('Registrieren');
    return this.http.post<Anmelden>(this.base_url + 'participator/', newReg, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error.bezeichnung == 'This field may not be blank.') {
      errorMessage = `Bitte geben Sie eine Veranstaltungsbezeichnung ein. `;
    } else
      if (error.error.datum == 'Date has wrong format. Use one of these formats instead: YYYY-MM-DD.') {
        errorMessage = `Bitte geben Sie das Datum im Format YYYY-MM-DD ein.`;
      } else
        if (error.error.von == 'Time has wrong format. Use one of these formats instead: hh:mm[:ss[.uuuuuu]].') {
          errorMessage = `Bitte geben Sie die Uhrzeit im Format HH:MM ein.`;
        } else
          if (error.error.bis == 'Time has wrong format. Use one of these formats instead: hh:mm[:ss[.uuuuuu]].') {
            errorMessage = `Bitte geben Sie die Uhrzeit im Format HH:MM ein.`;
          } else
            if (error.error.max_teilnehmer == 'A valid integer is required.') {
              errorMessage = `Bitte geben Sie die Anzahl der Veranstaltungsteilnehmer ein.`;
            }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
