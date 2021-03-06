import { Component, OnInit, NgModule } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { User } from 'src/app/model/User';
import { NgIf } from '@angular/common';



@NgModule({
  imports: [
    ReactiveFormsModule
  ]
})
@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

  editProfileForm;
  user: User;
  userUpdateSubscription;
  getAuthUserSubscription;
  errorMsg: string;
  isResultReady: boolean = false;


  constructor(private userService: UserService, private formBuilder: FormBuilder) {
    this.editProfileForm = this.formBuilder.group({
      username: '',
      surname: '',
      phoneNumber: '',
      email: '',
    });
  }

  ngOnInit() {

    this.getAuthUserSubscription = this.userService.getAuthenticatedUser().subscribe(user => {
      this.user = user;

      // Form initialization
      this.editProfileForm.controls['username'].setValue(this.user.name);
      this.editProfileForm.controls['surname'].setValue(this.user.surname);
      this.editProfileForm.controls['phoneNumber'].setValue(this.user.phoneNumber);
    });


    console.log("User " + this.user);

  }

  ngOnDestroy() {

    // Unsubscribing
    if (this.userUpdateSubscription) {
      this.userUpdateSubscription.unsubscribe();
    }

    if (this.getAuthUserSubscription) {
      this.getAuthUserSubscription.unsubscribe();
    }

  }

  onEditFormSubmit(updatedUser: any) {

    this.errorMsg = null;
    this.isResultReady = false;

    this.user.name = updatedUser.username;
    this.user.surname = updatedUser.surname;
    this.user.phoneNumber = updatedUser.phoneNumber;

    this.userUpdateSubscription = this.userService.updateUser(this.user).subscribe(
      user => {
        this.userService.refreshUsernameOnNavbar(this.user)
        this.isResultReady = true;
      },
      error => {
        this.errorMsg = error;
        this.isResultReady = true;
      }
    );



  }
}

