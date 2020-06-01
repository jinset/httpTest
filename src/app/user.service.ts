import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './user.model';
import { Group } from './group.model';

@Injectable({providedIn: 'root'})
export class UserService {
  URL = 'https://httptest-4314d.firebaseio.com';

  constructor(private http: HttpClient) {

  }

  createUser(userData: User){
    return this.http.post<{ name: string}>(`${this.URL}/user.json`, userData);
  }

  addGroupToUser(userId: string, group: Group) {
    return this.http.post(`${this.URL}/user/${userId}.json`, group);
  }
}
