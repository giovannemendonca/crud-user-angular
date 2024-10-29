import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {User} from "../../interfaces/user";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.scss'
})
export class CrudComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ["id", "name", "email", "role", "benefits", "action"]
  dataSource: any
  listUsers: User[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private usersService: UsersService) {
    this.dataSource = new MatTableDataSource()
  }

  ngOnInit() {
    this.getListUsers()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

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

}
