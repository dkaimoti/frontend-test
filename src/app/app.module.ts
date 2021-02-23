import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlaylistComponent } from './playlist/playlist.component';
import {
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatTableModule,
    MatToolbarModule
} from '@angular/material';
import { MusicComponent } from './music/music.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { playListReducer } from './playlist.reducer';

@NgModule({
    declarations: [
        AppComponent,
        PlaylistComponent,
        MusicComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatMenuModule,
        StoreModule.forRoot({ playlist: playListReducer })
    ],
    entryComponents: [
        MusicComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
