import { Component } from '@angular/core';
import { HttpServiceService } from './http-service.service';
import { Room } from './room';




@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Veranstaltungsservice';

    constructor(private httpService: HttpServiceService) { }

    rooms: Room[];

    getRoom(): void {
        this.httpService.getRooms()
        .subscribe(rooms => this.rooms = rooms)
    }

}





