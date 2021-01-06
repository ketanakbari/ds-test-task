import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../services/app.service';
import {UserForAdmin} from '../../../models/userForAdmin.model';
import {User} from '../../../models/user.model';
import {userObj} from '../../../shared/get-logged-user';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {exportErrorMessage} from '../../../shared/sweet-alert-msg';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: UserForAdmin[] | any = [];
  displayedColumns: string[] = ['first_name', 'last_name', 'email', 'groups'];
  loggedUser?: User;

  constructor(private appService: AppService, private router: Router) {
  }

  ngOnInit(): void {
    this.loggedUser = userObj();
    if (this.loggedUser.role === 'Admin') {
      this.getUsers();
    } else {
      this.router.navigate([`/app/dashboard`]);
    }

    // Todo: i know this is not ideal way to manage role and permission, we can used ngx permission to achieve the requirement.
  }

  getUsers(): void {
    this.appService.getUsers().subscribe((users: UserForAdmin[]) => {
      console.log('users', users);
      this.users = users;
    }, (errors: HttpErrorResponse) => {
      exportErrorMessage(errors.error.error);
    });
  }

}
