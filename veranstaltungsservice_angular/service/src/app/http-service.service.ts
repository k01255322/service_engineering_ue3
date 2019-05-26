import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Room } from './room';



@Injectable({
    providedIn: 'root'
})

export class HttpServiceService {

    private url = 'http://127.0.0.1:8000/api/room';


    constructor(private http: HttpClient) { }

    getRooms(): Observable<Room[]> {
        const url = '${this.url}/${id}';
        return this.http.get<Room[]>(this.url)


    }


}
