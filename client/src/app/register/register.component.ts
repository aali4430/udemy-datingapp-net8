import { Component,  EventEmitter,  input, output, Output,Input, inject } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
 accountService = inject(AccountService);
 model:any={};
  //@Input() usersFromHomeComponent:any; // data gettoing from parent components old way of getting data
  // for above we need Input to be imported 
  
  /// below is the new way of data getting from parent need input to be imported
  //usersFromHomeComponent = input.required<any>();
 
 
 // old way to sending data from child to parent
 // @Output() cancelRegister  = new EventEmitter();ata to parent

 /// new way of sending data to parent
 cancelRegister = output<boolean>()
 cancel(){
  this.cancelRegister.emit(false); // old + new way way to sending data from child to parent
}

 register(){
  this.accountService.register(this.model).subscribe({
    next:(respons)=>{
       console.log(respons);
       this.cancel();
    },
    error:(error)=>{

    },
    complete:()=>console.log("Registration Done.")
  });
}

}
