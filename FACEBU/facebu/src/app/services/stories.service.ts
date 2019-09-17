import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


import { Message } from 'src/app/models/message';
import { Reaction } from '../models/reaction';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class StoriesService {

  private msgUrl = 'http://localhost:3000/messages'
  private reactUrl = 'http://localhost:3000/reaction'
  
  private allMsg = new Array<Message>();
  private allReacts = new Array<Reaction>();

  constructor(private http: HttpClient) { }

  getAllStories() {

    return this.http.get(this.msgUrl);
  };

  getAllReactions() {

    return this.http.get(this.reactUrl);
  };

  

  addStory(msg: Message): Observable<Message> {

    this.http.get(this.msgUrl).subscribe(
      (data: Message[]) => this.allMsg = data,
      error => console.error(error),
      () => console.log('Messages loaded')
    );

    let lastMsgId: number = this.allMsg[this.allMsg.length - 1].id;
    msg.id = lastMsgId + 1;

    return this.http.post<Message>(this.msgUrl, msg, httpOptions)
  }

  updateStory(msg: Message): Observable<Message> {
    const url = `${this.msgUrl}/${msg.id}`;
    return this.http.put<Message>(url, msg, httpOptions);
  }


  deleteStory(id: number): Observable<{}> {
    const url = `${this.msgUrl}/${id}`;
    return this.http.delete(url, httpOptions);
  }
  

  addReaction(react: Reaction): Observable<Reaction> {

    this.http.get(this.reactUrl).subscribe(
      (data: Reaction[]) => this.allReacts = data,
      error => console.error(error),
      () => console.log('Reactions loaded')
    );

    let lastReactId: number = this.allReacts[this.allReacts.length - 1].id;
    react.id = lastReactId + 1;

    return this.http.post<Reaction>(this.reactUrl, react, httpOptions);
  }

  updateReaction(react: Reaction): Observable<Reaction> {
    const url = `${this.reactUrl}/${react.id}`;
    return this.http.put<Reaction>(url, react, httpOptions);
  }

  deleteReaction(id: number): Observable<{}> {
    const url = `${this.reactUrl}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  searchStoriesByUser(user: String) {

    return this.http.get(this.msgUrl + '?user_like=' + user);
  }
  

  searchStoriesByDate(date: String) {

    return this.http.get(this.msgUrl + '?publishDate_like=' + date);
  }



}
