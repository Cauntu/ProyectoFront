import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from 'src/app/models/event';
import { Assist } from '../models/assist';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class EventsService {


  private eventUrl = 'http://localhost:3000/events';
  private asstUrl = 'http://localhost:3000/assist';

  private allAssists = new Array<Assist>();
  private allEvents = new Array<Event>();

  constructor(private http: HttpClient) { }

  getAllEvents() {

    this.http.get(this.eventUrl).subscribe(
      (data: Event[]) => this.allEvents = data,
      error => console.error(error),
      () => console.log()
    );

    return this.http.get(this.eventUrl);
  };

  getAllAssistances() {

    return this.http.get(this.asstUrl)
  }

  addEvent(event: Event): Observable<Event> {

    this.http.get(this.eventUrl).subscribe(
      (data: Event[]) => this.allEvents = data,
      error => console.error(error),
      () => console.log('Assistances loaded')
    );

    let lastEventId: number = this.allEvents[this.allEvents.length - 1].id;
    event.id = lastEventId + 1;

    return this.http.post<Event>(this.eventUrl, event, httpOptions)
  }

  deleteEvent(id: number): Observable<{}> {
    //const id = typeof event === 'number' ? event : Event.id;
    const url = `${this.eventUrl}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  addAssistance(ast: Assist): Observable<Assist> {

    this.http.get(this.asstUrl).subscribe(
      (data: Assist[]) => this.allAssists = data,
      error => console.error(error),
      () => console.log('Assistances loaded')
    );

    let lastAstId: number = this.allAssists[this.allAssists.length - 1].id;
    ast.id = lastAstId + 1;

    return this.http.post<Assist>(this.asstUrl, ast, httpOptions);
  }

  updateAssistance(ast: Assist): Observable<Assist> {
    const url = `${this.eventUrl}/${ast.id}`;
    return this.http.put<Assist>(url, ast, httpOptions);
  }

  deleteAssistance(id: number): Observable<{}> {
    const url = `${this.asstUrl}/${id}`;
    return this.http.delete(url, httpOptions);
  }


  searchEventsByName(name: String) {

    return this.http.get(this.eventUrl + '?name_like=' + name);
  }

  searchEventsByDate(date: String) {

    return this.http.get(this.eventUrl + '?date_like=' + date);
  }

}

