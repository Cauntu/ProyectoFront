import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user';

import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private myUser : User;

  constructor(private profService: ProfileService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    

  }

}
