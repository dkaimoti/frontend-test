import { createAction, props } from '@ngrx/store';
import { Playlist } from './configuration/playlist';

export const add = createAction('[Playlist Component] Add', props<{ music: Playlist }>());
export const edit = createAction('[Playlist Component] Edit', props<{ music: Playlist, index: number }>());
export const remove = createAction('[Playlist Component] Remove', props<{ index: number }>());
export const set = createAction('[Playlist Component] Set', props<{ list: [] }>());
