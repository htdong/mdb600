import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/switchMap';
import { mergeMap, switchMap, map, concatMap, catchError } from 'rxjs/operators';

import { TodosActionTypes } from './todos.actions';
import { TodosServices } from './todos.services';

@Injectable()
export class TodosEffects {
  constructor (
    private actions$: Actions,
    private todosServices: TodosServices
  ) {}

  // Listen for the 'getTodos' action
  @Effect() getTodos$ = this.actions$
    .ofType(TodosActionTypes.GET_TODOS)
    .map(action => {
      this.todosServices.getTodos()
        // If successful, dispatch success action with result
        .map(todos => ({type: TodosActionTypes.GET_TODOS_SUCCESS, payload: todos}))
        // If request fails, dispatch failed action
        .catch(() => Observable.of({type: TodosActionTypes.GET_TODOS_ERROR}));
    });
      
}
