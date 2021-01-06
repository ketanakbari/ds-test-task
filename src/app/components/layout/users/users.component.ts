import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../services/app.service';
import {UserForAdmin} from '../../../models/userForAdmin.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: UserForAdmin[] | any = [];
  displayedColumns: string[] = ['first_name', 'last_name', 'email', 'groups'];

  constructor(private appService: AppService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.appService.getUsers().subscribe((users: UserForAdmin[]) => {
      console.log('users', users);
      this.users = users;
    }, (errors: any) => {
      console.log('errors', errors);
    });
  }

}
