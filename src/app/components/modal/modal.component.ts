import { TableComponent } from './../table/table.component';
import { Router, ActivatedRoute } from '@angular/router';
import { DataApiService } from './../../services/data-api.service';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Persona } from 'src/app/entities/persona';
import { NgForm, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  
  @ViewChild('btnClose', {static: false}) btnClose: ElementRef;
  persona:Persona={
    id:0,
    nombre:'',
    apellido:'',
    dni:0
  }
  formGroup: FormGroup;
  

  constructor(private servicio: DataApiService,private rutaActiva: ActivatedRoute, private router:Router, private formBuilder: FormBuilder) { }

  

  ngOnInit() {
       this.buildForm();
  }

  public buildForm() {
    console.log('ejecutando metodo buildForm con la persona: ' + this.persona.nombre);
    this.formGroup = this.formBuilder.group({
      id:this.servicio.persona.id,
      nombre :this.servicio.persona.nombre,
      apellido :this.servicio.persona.apellido,
     // edad :this.servicio.persona.edad,
      dni :this.servicio.persona.dni
    });
    console.log(this.formGroup);  
  }
  
  getOne(id: number){
    this.servicio.getOne(id).subscribe(data=>{
      this.persona = data;
    });
  }

  onSavePersona(formGroup: FormGroup) {

    this.servicio.persona = formGroup.value;
    console.log('el valor de persona seteada es: ' + this.servicio.persona.id);
    if (this.servicio.persona.id === 0) {
      this.agregar(this.servicio.persona);
    } else {
      this.update(this.servicio.persona);
    }
    this.formGroup.reset();
    this.btnClose.nativeElement.click();
}

agregar(persona: Persona) {
  console.log("En agregar - la persona que se va a post es: " + persona.nombre);
  this.servicio.post(persona).subscribe(data => {
    console.log("la data de la arrow es: " + data);
    persona = data;
    console.log("la data obtenida luego del post es: "+data);
    this.servicio.personas.push(persona);
    this.resetPersona();
    this.formGroup.reset();
    
  });
}

  update(persona: Persona) {
    const idPersona = persona.id;
    this.servicio.put(idPersona, persona).subscribe(data => {
      this.persona = data;
      const id = this.persona.id;
      const nombre = this.persona.nombre;
      const apellido = this.persona.apellido;
      const dni = this.persona.dni;
      this.servicio.personas.map(function(dato){
        if (dato.id === id){
          dato.nombre=nombre;
          dato.apellido=apellido;
          dato.dni=dni;
          
        }
      });

    });

  }

  resetPersona(){
    this.persona={
      id:0,
      nombre:'',
      apellido:'',
      dni:0
    }

    this.servicio.persona={
      id:0,
      nombre:'',
      apellido:'',
      dni:0
    }
  }


  

   
}
