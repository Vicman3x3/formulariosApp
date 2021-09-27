import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Persona {
  nombre: string;
  favoritos: Favorito[];
}

interface Favorito {
  id: number;
  nombre: string;
}
@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styleUrls: ['./dinamicos.component.css'],
})
export class DinamicosComponent {
  nuevoJuego: string = '';
  persona: Persona = {
    nombre: 'Víctor',
    favoritos: [
      { id: 1, nombre: 'King of fighters' },
      { id: 2, nombre: 'Mario Kart' },
      { id: 3, nombre: 'Duel Links' },
    ],
  };

  @ViewChild('miFormulario') miFormulario!: NgForm;

  nombreValido(): boolean {
    return (
      this.miFormulario?.controls.nombre?.invalid &&
      this.miFormulario?.controls.nombre?.touched
    );
  }

  guardar() {
    console.log('Formulario Posteado');
  }

  eliminar(index:number){
    this.persona.favoritos.splice(index,1);
  }

  agregarJuego(){
    const nuevoFavorito: Favorito = {
       id: this.persona.favoritos.length+1,
       nombre: this.nuevoJuego
    }
    this.persona.favoritos.push({...nuevoFavorito});
    this.nuevoJuego='';
  }
}
