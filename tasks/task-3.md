#### Tasks ####

* [Task 1](./task-1.md)
* [Task 2](./task-2.md)
* **Task 3 <-**

### Description ###

Ok. We have created an effect that determines the outcome of a dance battle and handles errors that might get thrown when processing the battle. The only problem is that this all happens tooooo fast! Let's add a little delay into the processing of the battle so that the audience can see the dancers sweet moves.

To help us accomplish this the `Battle` action takes an optional delay value in its payload. We just need to take that value and delay when the `BattleOutcomeDetermined` action is returned.

### Steps ###

Again, let's start with writing our test. Add the following to our `describe`:

```ts
it('should return a BattleOutcomeDetermined action on completion with a 50 frame delay', () => {

});
```

Then we add our supporting data and setup our starting and completion actions. In this case we will be including a delay value representing how much of a delay there should be before determining who the winner of the dance battle is:

```ts
const battleOutcome = BattleOutcome.ChallengerWins;
const challenger = new Dancer();
const challengee = new Dancer();
// this time the payload for the Battle action includes a delay value
const action = new Battle({
    challenger: challenger,
    challengee: challengee,
    delay: 50
});
const completion = new BattleOutcomeDetermined(battleOutcome);
```

With that in place we can go ahead and set what will happen during the effect. One difference this time is that we are going to need to take into account the delay that we are introducing:

```ts
actions$.stream = hot('-a', { a: action });
const battle = cold('-b', { b: battleOutcome });
const expected = cold('-------c', { c: completion });
dancerService.determineBattleWinnerByCategory.and.returnValue(battle);
```

Notice here that in the `expected` observable we are expecting a 70 frame delay before the completion is returned. This is because there is a 10 frame delay in each of the two previous observables before having to account for the 50 frame delay dictacted by the `Battle` action.

Again, we finish this off with our expectations:

```ts
expect(effects.battle$).toBeObservable(expected);
```

The completed test should look like this:

```ts
describe('battle$', () => {
    /* ... */

    it('should return a BattleOutcomeDetermined action on completion with a 50 frame delay', () => {
        const battleOutcome = BattleOutcome.ChallengerWins;
		const challenger = new Dancer();
		const challengee = new Dancer();
        // this time the payload for the Battle action includes a delay value
        const action = new Battle({
            challenger: challenger,
            challengee: challengee,
            delay: 50
        });
        const completion = new BattleOutcomeDetermined(battleOutcome);

        actions$.stream = hot('-a', { a: action });
        const battle = cold('-b', { b: battleOutcome });
        const expected = cold('-------c', { c: completion });
        dancerService.determineBattleWinnerByCategory.and.returnValue(battle);

        expect(effects.battle$).toBeObservable(expected);
    });
});
```

We should again be left with a failing test because we haven't implemented this delay in the effect. Let's do that now by adding the following to the pipe for the `determineBattleWinnerByCategory` function call:

```ts
// if a delay is provided by the action then apply it
// also allow the scheduler to be overriden by in unit tests
delay(action.payload.delay || 0, this.scheduler || async),
```

The fully updated effect should look like this:

```ts
@Effect()
battle$: Observable<Action> = this.actions$.pipe(
  // the action that will trigger this effect
  ofType<Battle>(ChallengeActionTypes.Battle),
  // determine the result of the battle
  switchMap(action => this.dancerService.determineBattleWinnerByCategory(action.payload.challenger, action.payload.challengee).pipe(
    // if a delay is provided by the action then apply it
    // also allow the scheduler to be overriden by in unit tests
    delay(action.payload.delay || 0, this.scheduler || async),
    // map the outcome to return a BattleOutcomeDetermined action
    map((outcome: BattleOutcome) => new BattleOutcomeDetermined(outcome)),
	// catch errors and return BattleFail action
	catchError(err => of(new BattleFail(err)))
  ))
);
```

#### You're done! Peace out yo! ####
