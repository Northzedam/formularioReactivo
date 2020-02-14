import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../entities/persona';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  miUrl = 'http://localhost:9001/api/v1/persona/'

  personas: Persona[]=[];

  persona:Persona={
    id:0,
    nombre:'',
    apellido:'',
    dni:0
  }

  constructor(private http: HttpClient) { }

  getAll(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.miUrl);
  }
  getOne(id: number): Observable<Persona> {
    return this.http.get<Persona>(this.miUrl + id);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(this.miUrl + id);
  }
  post(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.miUrl, persona);
  }
  put(id: number, persona: Persona): Observable<Persona> {
    return this.http.put<Persona>(this.miUrl + id, persona);
  }

}
