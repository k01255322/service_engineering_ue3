import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { Room } from '../room';


@Component({
    selector: 'app-veranstaltung-anlegen',
    templateUrl: './veranstaltung-anlegen.component.html',
    styleUrls: ['./veranstaltung-anlegen.component.css']
})


export class VeranstaltungAnlegenComponent implements OnInit {

    rooms: Room[];

    constructor(private httpService: HttpServiceService) { }

    ngOnInit() {
    }

    getRoom(): void {
        this.httpService.getRooms()
            .subscribe(rooms => this.rooms = rooms)
    }

}
