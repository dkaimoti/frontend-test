import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTable } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MusicComponent } from '../music/music.component';
import { add, edit, remove, set } from '../playlist.actions';

@Component({
    selector: 'app-playlist',
    templateUrl: './playlist.component.html',
    styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

    @ViewChild('playlistTable', { static: false }) playlistTable: MatTable<any>;

    public displayedColumns = ['artist', 'song', 'duration', 'actions'];
    public dataSource: Observable<any>;
    private selectedSong = Object.assign({});
    private list = [];

    constructor(
        public dialog: MatDialog,
        private store: Store<any>
    ) {
    }

    ngOnInit() {
        this.dataSource = this.store.select('playlist');

        if (!!window.sessionStorage.getItem('playlist')) {
            this.store.dispatch(set({ list: JSON.parse(window.sessionStorage.getItem('playlist')) }));
        }

        this.store.select('playlist').subscribe((data: any) => {
            this.list = data;
        });

    }

    public addSong() {
        const dialogRef = this.dialog.open(MusicComponent, {
            width: '450px',
        });

        dialogRef.afterClosed().subscribe(result => {
            if (!!result) {
                this.store.dispatch(add({ music: result }));
                this.updateLocalStorage();
            }
        });
    }

    public editSong() {
        const dialogRef = this.dialog.open(MusicComponent, {
            width: '450px',
            data: this.selectedSong
        });

        dialogRef.afterClosed().subscribe(result => {
            if (!!result) {
                const id = this.list.indexOf(this.selectedSong);
                this.store.dispatch(edit({ music: result, index: id }));
                this.updateLocalStorage();
            }
        });
    }

    public setSong(song) {
        this.selectedSong = Object.assign(song);
    }


    public deleteSong() {
        const id = this.list.indexOf(this.selectedSong);
        this.store.dispatch(remove({ index: id }));
        this.updateLocalStorage();
    }

    private updateLocalStorage() {
        this.store.select('playlist').subscribe((data: any) => {
            this.list = data;
            window.sessionStorage.setItem('playlist', JSON.stringify(data));
        });
    }
}
