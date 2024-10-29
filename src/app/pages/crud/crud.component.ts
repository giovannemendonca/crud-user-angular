import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {User} from "../../interfaces/user";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {ModalViewUserComponent} from "./modal-view-user/modal-view-user.component";
import {user} from "@angular/fire/auth";

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.scss'
})
export class CrudComponent implements OnInit, AfterViewInit {

  constructor(
    private usersService: UsersService,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource()
  }

  ngOnInit() {
    this.getListUsers()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  displayedColumns: string[] = ["id", "name", "email", "role", "benefits", "action"]
  dataSource: any
  listUsers: User[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  getListUsers() {
    this.usersService.getAllUsers().subscribe({
      next: (response: any) => {
        this.listUsers = response

        this.dataSource = new MatTableDataSource<any>(this.listUsers)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openModalViewUser(user: User) {
    this.dialog.open(ModalViewUserComponent, {
      width: "700px",
      height: "330px",
      data: user
    })


  }

}
