import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataCollection } from '../interfaces/interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  private _chartEndPoint: string = environment.jsonServerEndPoint;

  constructor(private http: HttpClient) {}

  getDataSets(): Observable<DataCollection>{
    return this.http.get<DataCollection>(`${this._chartEndPoint}/basicData`);
  }
}
