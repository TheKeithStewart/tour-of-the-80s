import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { _throw } from 'rxjs/observable/throw';

import { Dancer } from './models/dancer.model';
import { BattleOutcome } from './reducers/challenge.reducer';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DancerService {

  private dancersUrl = 'api/dancers';  // URL to web api

  constructor(private http: HttpClient) { }

  /** GET dancers from the server */
  getDancers(): Observable<Dancer[]> {
    return this.http.get<Dancer[]>(this.dancersUrl)
      .pipe(
        tap(dancers => this.log(`fetched dancers`)),
        catchError(this.handleError('getDancers', []))
      );
  }

  /** GET dancer by id. Return `undefined` when id not found */
  getDancerNo404<Data>(id: number): Observable<Dancer> {
    const url = `${this.dancersUrl}/?id=${id}`;
    return this.http.get<Dancer[]>(url)
      .pipe(
        map(dancers => dancers[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} dancer id=${id}`);
        }),
        catchError(this.handleError<Dancer>(`getDancer id=${id}`))
      );
  }

  /** GET dancer by id. Will 404 if id not found */
  getDancer(id: number): Observable<Dancer> {
    const url = `${this.dancersUrl}/${id}`;
    return this.http.get<Dancer>(url).pipe(
      tap(_ => this.log(`fetched dancer id=${id}`)),
      catchError(this.handleError<Dancer>(`getDancer id=${id}`))
    );
  }

  /* GET dancers whose name contains search term */
  searchDancers(term: string): Observable<Dancer[]> {
    if (!term.trim()) {
      // if not search term, return empty dancer array.
      return of([]);
    }
    return this.http.get<Dancer[]>(`api/dancers/?name=${term}`).pipe(
      tap(_ => this.log(`found dancers matching "${term}"`)),
      catchError(this.handleError<Dancer[]>('searchDancers', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new dancer to the server */
  addDancer(dancer: Dancer): Observable<Dancer> {
    return this.http.post<Dancer>(this.dancersUrl, dancer, httpOptions).pipe(
      tap((dancer: Dancer) => this.log(`added dancer w/ id=${dancer.id}`)),
      catchError(this.handleError<Dancer>('addDancer'))
    );
  }

  /** DELETE: delete the dancer from the server */
  deleteDancer(dancer: Dancer | number): Observable<Dancer> {
    const id = typeof dancer === 'number' ? dancer : dancer.id;
    const url = `${this.dancersUrl}/${id}`;

    return this.http.delete<Dancer>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted dancer id=${id}`)),
      catchError(this.handleError<Dancer>('deleteDancer'))
    );
  }

  /** PUT: update the dancer on the server */
  updateDancer(dancer: Dancer): Observable<any> {
    return this.http.put(this.dancersUrl, dancer, httpOptions).pipe(
      tap(_ => this.log(`updated dancer id=${dancer.id}`)),
      catchError(this.handleError<any>('updateDancer'))
    );
  }

  /**
   * Compare each of the dance rating categories for the two given dancers. Determine
   * the winner by seeing which dancer wins the most total categories.
   */
  determineBattleWinnerByCategory(challenger: Dancer, challengee: Dancer): Observable<BattleOutcome> {
    try {
      let challengerWinCount = 0;
      let challengeeWinCount = 0;
      
      Object.keys(challenger.ratings).forEach(key => {
        if (challenger.ratings[key] > challengee.ratings[key]) {
          challengerWinCount++;
        } else if (challenger.ratings[key] < challengee.ratings[key]) {
          challengeeWinCount++;
        }
      });
  
      let result: BattleOutcome = BattleOutcome.Tie;
      if (challengerWinCount > challengeeWinCount) {
        result = BattleOutcome.ChallengerWins;
      } else if (challengerWinCount < challengeeWinCount) {
        result = BattleOutcome.ChallengeeWins;
      }
  
      return of(result);
    } catch(e) {
      return _throw(e);
    }
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
  }
}
