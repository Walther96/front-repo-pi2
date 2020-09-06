import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BasePartida } from '../models/base-partida';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GeneralService {

    constructor(private http: HttpClient) { }

    findAllBases() {
        return this.http.get<BasePartida[]>(environment.apiurl + "general/base");
    }

}