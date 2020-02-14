import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { Router } from '@angular/router';
import { Persona } from 'src/app/entities/persona';

@Component({
  selector: 'app-reactive-table',
  templateUrl: './reactive-table.component.html',
  styleUrls: ['./reactive-table.component.css']
})
export class ReactiveTableComponent implements OnInit {

  constructor(private servicio: DataApiService, private router: Router) { }
  
  personas: Persona[]=[];

  

  ngOnInit() {
    this.getAll();
  }
 

  getAll() {
    this.servicio.getAll().subscribe(data => {
      this.personas = data;
      
    });
  }

  delete(id: number) {
    const opcion = confirm('¿Está seguro que deseas confirmar el evento?');
    if (opcion === true) {
      this.servicio.delete(id).subscribe(data => {
        console.log(data);
        alert('Registro Eliminado');
        location.reload();
      });
    }
  }
  // Agregar
  agregar(idPersona: number) {
    this.router.navigate(['persona/' + idPersona]);
  }

  onPreUpdate(){

  }

  
  // ACTUALIZAR
  update(idPersona: number) {
    this.router.navigate(['persona/' + idPersona]);
  }

}
