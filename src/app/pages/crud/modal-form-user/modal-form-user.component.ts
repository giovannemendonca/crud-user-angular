import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UsersService} from "../../../services/users.service";
import {User} from "../../../interfaces/user";
import {user} from "@angular/fire/auth";

@Component({
  selector: 'app-modal-form-user',
  templateUrl: './modal-form-user.component.html',
  styleUrl: './modal-form-user.component.scss'
})
export class ModalFormUserComponent implements OnInit {

  planosSaude = [
    {
      id: 1,
      descricao: "Plano 300 Enfermaria"
    },
    {
      id: 2,
      descricao: "Plano 400 Enfermaria"
    },
    {
      id: 1,
      descricao: "Plano 500 Plus"
    }
  ]

  planosOdonto = [
    {
      id: 1,
      descricao: "Plano Basic"
    },
    {
      id: 1,
      descricao: "Plano Medium"
    },
    {
      id: 1,
      descricao: "Plano Plus"
    },
  ]

  formUser: FormGroup;
  editUser: boolean = false

  constructor(
    public dialogRef: MatDialogRef<ModalFormUserComponent>,
    private formBuilder: FormBuilder,
    private userService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }


  ngOnInit() {
    this.buildForm();

    if (this.data && this.data.name){
      this.editUser = true
    }
  }


  saveUser() {
    const objUserForm: User = this.formUser.getRawValue()

    if (this.data && this.data.name) {
      this.userService.update(this.data.firebaseId, objUserForm)
      window.alert("Usuário Editado com sucesso")
      this.closeModal()
    } else {
      this.userService.addUser(objUserForm)
      window.alert("Usuário Salvo com sucesso")
      this.closeModal()
    }

  }

  buildForm() {
    this.formUser = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      sector: [null, [Validators.required, Validators.minLength(2)]],
      role: [null, [Validators.required, Validators.minLength(5)]],
      healthPlan: [''],
      dentalPlan: ['']
    })
    if (this.data && this.data.name) {
      this.fillForm();
    }
  }

  closeModal() {
    this.dialogRef.close()
  }


  private fillForm() {
    this.formUser.patchValue({
      name: this.data.name,
      email: this.data.email,
      sector: this.data.sector,
      role: this.data.role,
      healthPlan: this.data.healthPlan,
      dentalPlan: this.data.dentalPlan
    })
  }
}
