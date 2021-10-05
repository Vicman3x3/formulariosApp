import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styleUrls: ['./dinamicos.component.css']
})
export class DinamicosComponent implements OnInit {

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
  }

  miFormulario: FormGroup = this.fb.group({
    nombre:     ['',[Validators.required,Validators.minLength(3)]],
    favoritos:  this.fb.array([
      [ 'Metal Gear', Validators.required],
      [ 'Carlos Duty' , Validators.required],
      [ 'Smash Bros' , Validators.required],
    ],Validators.required)

  });

  get favoritosArr(){
    return this.miFormulario.get('favoritos') as FormArray;
  }

  campoEsValido(campo: string) {
    return (
      this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched
    );
  }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }
    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }



  hola(){
    console.log('hola')
  }



}
