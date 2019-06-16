import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
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

  // http options used for making API calls
  private httpOptions: any;
 
  // the actual JWT token
  public token: string;
 
  // the token expiration date
  public token_expires: Date;
 
  // the username of the logged in user
  public username: string;
 
  // error messages received from the login attempt
  public errors: any = [];

  constructor(private http: HttpClient, private messageService: MessageService) { 
      this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  // Uses http.post() to get an auth token from djangorestframework-jwt endpoint
  public login(user) {
    this.http.post('http://127.0.0.1:8000/api-token-auth/', JSON.stringify(user), this.httpOptions).subscribe(
      data => {
        this.updateData(data['token']);
      },
      err => {
        this.errors = err['error'];
      }
    );
  }

   // Refreshes the JWT token, to extend the time the user is logged in
  public refreshToken() {
    this.http.post('http://127.0.0.1:8000/api-token-refresh/', JSON.stringify({token: this.token}), this.httpOptions).subscribe(
      data => {
        this.updateData(data['token']);
      },
      err => {
        this.errors = err['error'];
      }
    );
  }
 
  public logout() {
    this.token = null;
    this.token_expires = null;
    this.username = null;
  }
 
  private updateData(token) {
    this.token = token;
    this.errors = [];
 
    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
  }



  // Methode zum Abrufen aller Räume
  getRooms(): Observable<Room[]> {
    console.log('Abrufen aller Räume vom Server');
    return this.http.get<Room[]>(this.base_url + 'room/');
  }

  // Methode zum Abrufen aller Veranstaltungen
  getEvents(): Observable<Veranstaltung[]> {
	 //Post token
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.token})
    };  
    console.log('Abrufen aller Veranstaltungen vom Server');
    return this.http.get<Veranstaltung[]>(this.base_url + 'event/', httpOptions);
  }

  // Methode zum Abrufen genau eines Raumes
  getRoom(id: string): Observable<Room> {
    return this.http.get<Room>(this.base_url + 'room/' + id + '/');
  }

  // Methode zum Anlegen einer Veranstaltung
  addParticipant(newParticipant: Participiant): Observable<Participiant> {
    //Post token
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.token})
    };  
    console.log(newParticipant + 'Teilnehmer angelegt');
    return this.http.post<Participiant>(this.base_url + 'participator/', newParticipant, httpOptions).pipe(retry(1),
      catchError(this.handleError));
  }

  // Methode zum Anlegen einer Veranstaltung
  addEvent(newEvent: Veranstaltung): Observable<Veranstaltung> {
    //Post token
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.token})
    };  
    console.log('Veranstaltung angelegt');
    return this.http.post<Veranstaltung>(this.base_url + 'event/', newEvent,httpOptions).pipe(retry(1),
      catchError(this.handleError));
  }

  // Methode zum Anmelden zu einer Veranstaltung
  registerEvent(newReg: Anmelden): Observable<Anmelden> {
    //Post token
  let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.token})
    };

     console.log('Registrieren');
    return this.http.post<Anmelden>(this.base_url + 'participator/', newReg,httpOptions
    );

    /*console.log('Registrieren');
    return this.http.post<Anmelden>(this.base_url + 'participator/', newReg, {
      headers: {
        'Content-Type': 'application/json'
      }
    });*/ //old
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
