import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user';
import { Message } from 'src/app/models/message';

import { StoriesService } from 'src/app/services/stories.service';
import { Reaction } from 'src/app/models/reaction';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {

  private myId = 1;

  private allUsers = new Array<User>();
  private allMsg = new Array<Message>();
  private allReacts = new Array<Reaction>();


  constructor(private storyService: StoriesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.storyService.getAllStories().subscribe(
      (data: Message[]) => this.allMsg = data,
      error => console.error(error),
      () => console.log('Stories loaded')
    );

    this.storyService.getAllReactions().subscribe(
      (data: Reaction[]) => this.allReacts = data,
      error => console.error(error),
      () => console.log('Reactions loaded')
    );

  }

  ngOnChange(){

    this.storyService.getAllStories().subscribe(
      (data: Message[]) => this.allMsg = data,
      error => console.error(error),
      () => console.log('Stories refreshed')
    );

    this.storyService.getAllReactions().subscribe(
      (data: Reaction[]) => this.allReacts = data,
      error => console.error(error),
      () => console.log('Reactions refreshed')
    );

  }

  addStory(content: string) {

    let story: Message = {

      id: null,
      content: content,
      publishDate: Date.now.toString(),
      user: this.myId
    }

    this.storyService.addStory(story).subscribe(
      rel => this.allMsg.push(rel)
    );
  }

  deleteStory(story: Message) {

    this.storyService.deleteStory(story.id).subscribe(
      data => {
        this.allMsg = this.allMsg.filter(x => { return x.id != story.id })
      });
  }

  reactLike(story: Message) {


    let reacts: Reaction[];

    for (let r of this.allReacts) {

      if (r.message == story.id) {
        reacts.push(r);
      }
    }

    let myReact = reacts.find(r => r.user == this.myId);

    if (myReact != null) {


      if (myReact.reactionType != 'like') {
        myReact.reactionType = 'like';
        this.storyService.updateReaction(myReact).subscribe();
      }
      else {
        this.storyService.deleteReaction(myReact.id).subscribe(
          data => { this.allReacts = this.allReacts.filter(r => { return r.id != myReact.id }) }
        );
      }

    }
    else {

      let re: Reaction = {

        id: null,
        user: this.myId,
        message: story.id,
        reactionType: 'like'
      }

      this.storyService.addReaction(re).subscribe(re => this.allReacts.push(re));
    }


  }

  reactDislike(story: Message) {


    let reacts: Reaction[];

    for (let r of this.allReacts) {

      if (r.message == story.id) {
        reacts.push(r);
      }
    }

    let myReact = reacts.find(r => r.user == this.myId);

    if (myReact != null) {


      if (myReact.reactionType != 'dislike') {
        myReact.reactionType = 'dislike';
        this.storyService.updateReaction(myReact).subscribe();
      }
      else {
        this.storyService.deleteReaction(myReact.id).subscribe(
          data => { this.allReacts = this.allReacts.filter(r => { return r.id != myReact.id }) }
        );
      }

    }
    else {

      let re: Reaction = {

        id: null,
        user: this.myId,
        message: story.id,
        reactionType: 'dislike'
      }

      this.storyService.addReaction(re).subscribe(re => this.allReacts.push(re));
    }
    
  }

  searchStoriesByUser(user: String) {

    return this.storyService.searchStoriesByUser(user).subscribe();
  }

  searchStoriesByDate(date: String) {

    return this.storyService.searchStoriesByDate(date).subscribe();
  }

}
