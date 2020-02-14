import { ModalComponent } from './../modal/modal.component';
import { DataApiService } from './../../services/data-api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Persona } from 'src/app/entities/persona';
import { Router } from '@angular/router';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  

  constructor(private servicio: DataApiService, private router: Router) { }
  persona:Persona={
    id:0,
    nombre:'',
    apellido:'',
    dni:0
  }


   personas: Persona[]=[];
   private modal:ModalComponent;
  
  ngOnInit() {
    this.getAll();
  }
 

  getAll(){
    this.servicio.getAll().subscribe(data=>{
      this.servicio.personas=data;
      this.personas=this.servicio.personas;
    });
  }


  delete(id:number){
    const opcion=confirm("Está seguro que desea borrar este registro?");
    if(opcion==true){
      this.servicio.delete(id).subscribe(data=>{
        console.log(data);
        this.personas.splice(this.personas.length -1);
        console.log(this.personas);
      });
    }
  }

  onPreUpdatePersona(persona: Persona){
    this.persona = Object.assign({},persona);
    console.log("la persona que se le pasa al build form es: " + this.servicio.persona.nombre);
   
    
  }
}
