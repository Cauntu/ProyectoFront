import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Relationship } from 'src/app/models/relationship';
import { User } from 'src/app/models/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  private myId = 1;
  private myFriends = new Array<Relationship>();
  private allRels = new Array<Relationship>();
  
  private relUrl = 'http://localhost:3000/relationships';
  private usersUrl = 'http://localhost:3000/users';


  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get('http://localhost:3000/users')
  }

  getAllRels() {

    return this.http.get(this.relUrl + '?user1=' + this.myId + '|user2=' + this.myId);
  };

  getFriend(id: number){

    return this.http.get(this.usersUrl + '?id=' + id);
  }

  addFriend(rel: Relationship): Observable<Relationship> {
  
      this.http.get(this.relUrl).subscribe(
        (data: Relationship[]) => this.allRels = data,
        error => console.error(error),
        () => console.log('Users loaded')
      );

    let lastRelId: number = this.allRels[this.allRels.length -1].id;

        rel.id = lastRelId +1;
        
    return this.http.post<Relationship>(this.relUrl, rel, httpOptions);
  };

  deleteFriend(id: number): Observable<{}> {
    //const id = typeof event === 'number' ? event : Event.id;
    const url = `${this.relUrl}/${id}`;
    return this.http.delete(url, httpOptions);
  };

  updateRel(rel: Relationship): Observable<Relationship> {
    const url = `${this.relUrl}/${rel.id}`;
    return this.http.put<Relationship>(url, rel, httpOptions);
  };


  searchUsersByName(name: String) {

    return this.http.get(this.usersUrl + '?name_like=' + name);

  }

  searchFriendsByName(name: String) {

    return this.http.get(this.usersUrl + '?name_like=' + name);

  }


}
