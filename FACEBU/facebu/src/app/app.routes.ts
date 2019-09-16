import { Routes, RouterModule } from '@angular/router';
import { StoriesComponent } from './components/stories/stories.component';
import { FriendsComponent } from './components/friends/friends.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EventsComponent } from './components/events/events.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';

const routes: Routes = [

    { path: '', component: StoriesComponent },
    { path: 'friends', component: FriendsComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'events', component: EventsComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);