import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { User } from 'src/app/models/user';
import { Relationship } from 'src/app/models/relationship';
import { Message } from 'src/app/models/message';

import { ProfileService } from 'src/app/services/profile.service';
import { FriendsService } from 'src/app/services/friends.service';
import { StoriesService } from 'src/app/services/stories.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private myId = 1;
  private myUser : User;
  
  private allUsers = new Array<User>();
  private allRels = new Array<Relationship>();
  private allMsg = new Array<Message>();

  private myFriends = new Array<User>();
  private myMsg = new Array<Message>();
  

  constructor(
    private profService: ProfileService, private friendService: FriendsService,
      private storyService: StoriesService, private route: ActivatedRoute,
       private router: Router) { }

  ngOnInit() {

    //prof
    this.profService.getUserInfo(this.myId).subscribe(
      (data: User) => this.myUser = data,
      error => console.error(error),
      () => console.log('User info loaded')
    );
    
    //friends
    this.friendService.getAllUsers().subscribe(
      (data: User[]) => this.allUsers = data,
      error => console.error(error),
      () => console.log('Users loaded')
    );

    this.friendService.getAllRels().subscribe(
      (data: Relationship[]) => this.allRels = data,
      error => console.error(error),
      () => console.log('Relationships loaded')
    );

    for (let x of this.allRels) {

      if (x.user1 == this.myId) {
        this.myFriends.push(
          this.allUsers.find(y => x.user2 == y.id));
      }
      else {
        this.myFriends.push(
          this.allUsers.find(y => x.user1 == y.id));
      }
    }
    console.log('Friends loaded');

    //stories
    this.storyService.getAllStories().subscribe(
      (data: Message[]) => this.allMsg = data,
      error => console.error(error),
      () => console.log('Stories loaded')
    );

    for (let x of this.allMsg) {

      if (x.user == this.myId) {
        this.myMsg.push(x);
        }
    }
    console.log('Your stories loaded')

  }

  ngOnChange(){

    //prof
    this.profService.getUserInfo(this.myId).subscribe(
      (data: User) => this.myUser = data,
      error => console.error(error),
      () => console.log('User info refreshed')
    );

    //friends

    this.friendService.getAllRels().subscribe(
      (data: Relationship[]) => this.allRels = data,
      error => console.error(error),
      () => console.log('Relationships refreshed')
    );

    for (let x of this.allRels) {

      if (x.user1 == this.myId) {
        this.myFriends.push(
          this.allUsers.find(y => x.user2 == y.id));
      }
      else {
        this.myFriends.push(
          this.allUsers.find(y => x.user1 == y.id));
      }
    }
    console.log('Friends refreshed');

    //stories
    this.storyService.getAllStories().subscribe(
      (data: Message[]) => this.allMsg = data,
      error => console.error(error),
      () => console.log('Stories refreshed')
    );

    for (let x of this.allMsg) {

      if (x.user == this.myId) {
        this.myMsg.push(x);
        }
    }
    console.log('Your stories refreshed')

  }

  updateUserInfo(f : NgForm){

      this.myUser.name = f.value.name;
      this.myUser.surname = f.value.surname;
      this.myUser.birthDate =  f.value.birthDate;

    return this.profService.updateUserInfo(this.myUser).subscribe();
  };

}
