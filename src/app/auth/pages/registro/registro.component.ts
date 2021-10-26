import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { emailPattern, nombreApellidoPattern, noPuederSerStrider } from 'src/app/shared/validators/validaciones';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {


  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)],[this.emailValidator]],
    username: ['', [Validators.required, this.validatorService.noPuederSerStrider]],
    password: ['',  [Validators.required,]],
    password2: ['', [Validators.required,]],

  },{
    validators: [this.validatorService.camposIguales('password','password2')]
  })

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorsService,
    private emailValidator: EmailValidatorService,
     ) { }

  ngOnInit(): void {

    this.miFormulario.reset({
      nombre: 'Victor Manuel',
      email: 'test1@test.com',
      username: 'JohnBz',
      password: '123456',
      password2: '123456',
    })

  }


  get emailErrorMsg(): string {

    const errors = this.miFormulario.get('email')?.errors;
    if(errors?.required){
      return 'Email es Obligatorio';
    } else if(errors?.pattern){
      return 'Debe tener el formato de un Email'
    } else if(errors?.emailTomado){
      return 'El Email ya fue tomado'
    }
    return '';
  }

  campoNoValido(campo:string){
    return this.miFormulario.get(campo)?.invalid
    && this.miFormulario.get(campo)?.touched;
  }

  // emailRequired(){
  //   return this.miFormulario.get('email')?.errors?.required
  //   && this.miFormulario.get('email')?.touched;
  // }

  // emailFormato(){
  //   return this.miFormulario.get('email')?.errors?.pattern
  //   && this.miFormulario.get('email')?.touched;
  // }

  // emailTomado(){
  //   return this.miFormulario.get('email')?.errors?.emailTomado
  //   && this.miFormulario.get('email')?.touched;
  // }



  submitFormulario(){

    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();

  }

}
