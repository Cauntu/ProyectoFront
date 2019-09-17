import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private myId = 1;

  private userUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  getUserInfo(id: number) {

    return this.http.get(this.userUrl + '?id=' + id);
  }

  updateUserInfo(user: User){

    const url = `${this.userUrl}/${user.id}`;
    return this.http.put<User>(this.userUrl, user, httpOptions);
  }



}
