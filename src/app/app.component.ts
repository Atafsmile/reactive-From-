
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  genders :any= ["male", "female"];
  signupForm!: FormGroup;
  forbiddenUsernames:any = ["Chris", "Anna"];

  ngOnInit() {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenNames.bind(this)
        ]),
        email: new FormControl(
          '',
          [Validators.email, Validators.required],
          this.forbiddenEmails.bind(this.)
        )
      }),
      gender: new FormControl("male"),
      hobbies: new FormArray([])
    });
    // this.signupForm.valueChanges.subscribe(value => {
    //   console.log(value);
    // });
    this.signupForm.statusChanges.subscribe(status => {
      console.log(status);
    });
    this.signupForm.setValue({
      userData: {
        username: "Max",
        email: "max@test.com"
      },
      gender: "male",
      hobbies: []
    });
    this.signupForm.patchValue({
      userData: {
        username: "Sanne"
      }
    });
  }

  get controls() {
    return (this.signupForm.get("hobbies") as FormArray).controls;
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get("hobbies")).push(control);
  }

  // Homemade formControl
  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return { nameIsForbidden: true };;
  }

  onSubmit() {
    console.log(this.signupForm);
    // this.signupForm.reset();
  }

  // Async validator!
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "test@test.com") {
          resolve({ emailIsForbidden: true });
        } else {
          resolve({ emailIsForbidden: true });
        }
      }, 1500);
    });
    return promise;
  }
}
