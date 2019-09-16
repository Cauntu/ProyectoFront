import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user';
import { Relationship } from 'src/app/models/relationship';

import { FriendsService } from 'src/app/services/friends.service';


@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})

export class FriendsComponent implements OnInit {

  private myId = 1;

  allUsers = new Array<User>();
  myRels = new Array<Relationship>();
  myFriends = new Array<User>();

  constructor(private friendService: FriendsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.friendService.getAllUsers().subscribe(
      (data: User[]) => this.allUsers = data,
      error => console.error(error),
      () => console.log('Users loaded')
    );

    this.friendService.getAllRels().subscribe(
      (data: Relationship[]) => this.myRels = data,
      error => console.error(error),
      () => console.log('Relationships loaded')
    );

    for (let x of this.myRels) {

      if (x.user1 == this.myId) {
        this.myFriends.push(
          this.allUsers.find(y => x.user2 == y.id));
      }
      else {
        this.myFriends.push(
          this.allUsers.find(y => x.user1 == y.id));
      }
    }
  };

  addFriend(friend: User) {

    let rel: Relationship = {
      id: null,
      user1: this.myId,
      user2: friend.id,
      status: 'pending'
    };


    this.friendService.addFriend(rel).subscribe(
      rel => this.myRels.push(rel)
    );
  };

  deleteFriend(friend: User) {

    let rel: Relationship =
      this.myRels.find(x => friend.id == x.user1 || friend.id == x.user2);

    this.friendService.deleteFriend(rel.id).subscribe(
      data => {
        this.myRels = this.myRels.filter(x => { return x.id != rel.id })
      });
  };

  acceptFriend(rel: Relationship) {

    rel.status = 'accepted';

    this.friendService.updateRel(rel).subscribe();

  }

  blockFriend(rel: Relationship) {

    rel.status = 'blocked';

    this.friendService.updateRel(rel).subscribe();

  }

  searchFriendsByName(name: String) : Array<User>{
    return this.myFriends.filter(x => x.name.match('?:[' + name + ']|$'));
  }

  searchUsersByName(name: String) {

    this.friendService.searchUsersByName(name).subscribe();
  }

}
