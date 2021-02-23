import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-music',
    templateUrl: './music.component.html',
    styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {

    public form: FormGroup;
    public isNewSong = true;

    constructor(
        public dialogRef: MatDialogRef<MusicComponent>,
        @Inject(MAT_DIALOG_DATA) public data) {

        this.form = new FormGroup({
            artist: new FormControl('', [Validators.required]),
            song: new FormControl('', [Validators.required]),
            duration: new FormControl('', [Validators.required, Validators.pattern('\^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?\$')])
        });
    }

    ngOnInit() {

        if (!!this.data) {
            this.isNewSong = false;
            this.form.patchValue(this.data);
        }
    }

    public cancel() {
        this.dialogRef.close();
    }

    public submit() {
        if (!!this.form.valid) {
            this.dialogRef.close(this.form.value);
        }
    }

}
