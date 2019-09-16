import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Event } from 'src/app/models/event';
import { Assist } from 'src/app/models/assist';

import { EventsService } from 'src/app/services/events.service';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})

export class EventsComponent implements OnInit {

  private myId = 1;

  private allAssists = new Array<Assist>();
  private allEvents = new Array<Event>();
  private myEvents = new Array<Event>();
  
  constructor(private eventService: EventsService, private route: ActivatedRoute, private router: Router) { }
  
  ngOnInit() {
   
    this.eventService.getAllEvents().subscribe(
      (data: Event[]) => this.allEvents = data,
      error => console.error(error),
      () => console.log('Events loaded')
    );

    this.eventService.getAllAssistances().subscribe(
      (data: Assist[]) => this.allAssists = data,
      error => console.error(error),
      () => console.log('Assistances loaded')
    );
  }


  addEvent(f: NgForm) {

    let event: Event = {
      id: null,
      name: f.value.eventName,
      description: f.value.eventDescription,
      eventDate: f.value.eventDate,
      user: this.myId
    }

    this.eventService.addEvent(event).subscribe(event => this.myEvents.push(event));
  };

  deleteEvent(event: Event) {
    this.eventService.deleteEvent(event.id).subscribe(
      data => {
        this.myEvents = this.myEvents.filter(h => { return h.id != event.id })
      }
    )
  };

  willAssist(event: Event) {

    let assists: Assist[];

    for (let ast of this.allAssists) {

      if (ast.event == event.id) {
        assists.push(ast);
      }
    }

    let myAst = assists.find(ast => ast.user == this.myId);

    if (myAst != null) {


      if (myAst.state != 'yes') {
        myAst.state = 'yes';
        this.eventService.updateAssistance(myAst).subscribe();
      }
      else {
        this.eventService.deleteAssistance(myAst.id).subscribe(
          data => { this.allAssists = this.allAssists.filter(ast => { return ast.id != myAst.id }) }
        );
      }

    }
    else {

      let ast: Assist = {

        id: null,
        user: this.myId,
        event: event.id,
        state: 'yes'
      }

      this.eventService.addAssistance(ast).subscribe(ast => this.allAssists.push(ast));
    }
  };

  wontAssist(event: Event) {

    let assists: Assist[];

    for (let ast of this.allAssists) {

      if (ast.event == event.id) {
        assists.push(ast);
      }
    }

    let myAst = assists.find(ast => ast.user == this.myId);

    if (myAst != null) {


      if (myAst.state != 'no') {
        myAst.state = 'no';
        this.eventService.updateAssistance(myAst).subscribe();
      }
      else {
        this.eventService.deleteAssistance(myAst.id).subscribe(
          data => { this.allAssists = this.allAssists.filter(ast => { return ast.id != myAst.id }) }
        );
      }

    }
    else {

      let ast: Assist = {

        id: null,
        user: this.myId,
        event: event.id,
        state: 'no'
      }

      this.eventService.addAssistance(ast).subscribe(ast => this.allAssists.push(ast));
    }

  };

  searchEventsByName(name: String) {

    this.eventService.searchEventsByName(name).subscribe();
  }

  searchEventsByDate(date: String) {

    this.eventService.searchEventsByDate(date).subscribe();
  }


}