import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-test-errors',
  standalone: true,
  imports: [],
  templateUrl: './test-errors.component.html',
  styleUrl: './test-errors.component.css'
})
export class TestErrorsComponent {
http = inject(HttpClient);
validationError:string[]=[];
apiURl = environment.apiUrl;
get400Error(){ 
  this.http.get("http://localhost:5000/api/buggy/bad-request").subscribe({
    next:(response)=>{console.log(response)},
    error:(response)=>{console.log(response)}
  });
}
get401Error(){
  this.http.get("http://localhost:5000/api/buggy/auth").subscribe({
    next:(response)=>{console.log(response)},
    error:(response)=>{console.log(response)}
  });
}
get404Error(){
  this.http.get("http://localhost:5000/api/buggy/not-found").subscribe({
    next:(response)=>{console.log(response)},
    error:(response)=>{console.log(response)}
  });
}
get500Error(){
  this.http.get("http://localhost:5000/api/buggy/server-error").subscribe({
    next:(response)=>{console.log(response)},
    error:(response)=>{console.log(response)}
  });
}
get400ValidationError(){
  this.http.post("http://localhost:5000/api/buggy/validation-error",{}).subscribe({
    next:(response)=>{console.log(response)},
    error:(error)=>{this.validationError = error;}
  });
}
}
