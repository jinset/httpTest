import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  array = [
    {name: 'Alice' , groups: []},
    {name: 'Bob' , groups: []},
    {name: 'Eve' , groups: []}
  ];

  constructor(private postsService: UserService) {}
// Im using Firebase as database, when it create a new user the callback with its ID is "name"
  ngOnInit() {
    forkJoin(
      this.postsService.createUser(this.array[0]),
      this.postsService.createUser(this.array[1]),
      this.postsService.createUser(this.array[2]),
    ).subscribe(([res1, res2, res3]) => {
      forkJoin(
        this.postsService.addGroupToUser(res1.name, {groupId: '1', name: 'UI Engineers' }),
        this.postsService.addGroupToUser(res2.name, {groupId: '1', name: 'UI Engineers' }),
        this.postsService.addGroupToUser(res3.name, {groupId: '1', name: 'UI Engineers' })
      ).subscribe(() => {
        console.log('Complete');
      });
    });
  }
}
