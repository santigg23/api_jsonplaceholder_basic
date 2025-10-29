// components/user-list/user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../services/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.scss'],
  standalone: false
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  cityFilter: string = '';
  loading: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
        this.loading = false;
      }
    });
  }
}
