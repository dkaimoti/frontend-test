import { createReducer, on } from '@ngrx/store';
import { add, edit, remove, set } from './playlist.actions';
import { playlist } from '../app/configuration/playlist';

export const initialState = playlist;

const _playlistReducer = createReducer(
    initialState,
    on(add, (playlist, { music }) => ([...playlist, music])),
    on(edit, (playlist, { music, index }) => {
        console.log(index);
        playlist[index] = music;

        console.log(playlist);
        return [...playlist];
    }),
    on(remove, (playlist, { index }) => {

        return playlist.length > 1
            ? [
                ...playlist.slice(0, index),
                ...playlist.slice(index + 1)
            ]
            : [];
    }),
    on(set, (playlist, { list }) => {
        playlist = list
        return [...playlist];
    })
);

export function playListReducer(state, action) {
    return _playlistReducer(state, action);
}

