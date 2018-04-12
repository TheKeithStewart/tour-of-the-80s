#### Tasks ####

* [Task 1](./task-1.md)
* **Task 2 <-**
* [Task 3](./task-3.md)

### Description ###

At this point we have created an effect and a unit test for that effect that ensures if a dance battle successfully completes that the `BattleOutcomeDetermined` action is returned. But what if there is an error thrown for some reason when the battle is being processed? Next we will handle when the battle has failed. If there is a error thrown then a `BattleFail` action should be returned.

### Steps ###

Sticking with the TDD method of development we start with writing our test. Like before we start with writing out `it` function. We will add it to our existing `describe` function:

```ts
describe('battle$', () => {
	/* ... */

	it('should return a BattleFail if there is an error when processing the battle', () => {

	});
});
```

Next we create the error message that will be thrown, setup the supporting data, and create the starting and completion actions:

```ts
// the error message that will be thrown
const error = 'When you error I will catch you (I will be waiting time after time)';
const challenger = new Dancer();
const challengee = new Dancer();
const action = new Battle({
	challenger: challenger,
	challengee: challengee
});
const completion = new BattleFail(error);
```

Now we can setup what will happen in the effect. The sequents of events are similar to before. However, instead of returning a value an error is thrown:

```ts
actions$.stream = hot('-a', { a: action });
// instead of returning a value an error is thrown
const battle = cold('-#', { }, error);
const expected = cold('--c', { c: completion });
dancerService.determineBattleWinnerByCategory.and.returnValue(battle);
```

And of course we need to set our expectations:

```ts
expect(effects.battle$).toBeObservable(expected);
```

The completed test should look like this:

```ts
describe('battle$', () => {
	/* ... */

	it('should return a BattleFail if there is an error when processing the battle', () => {
		// the error message that will be thrown
		const error = 'When you error I will catch you (I will be waiting time after time)';
		const challenger = new Dancer();
		const challengee = new Dancer();
		const action = new Battle({
			challenger: challenger,
			challengee: challengee
		});
		const completion = new BattleFail(error);

		actions$.stream = hot('-a', { a: action });
		// instead of returning a value an error is thrown
		const battle = cold('-#', { }, error);
		const expected = cold('--c', { c: completion });
		dancerService.determineBattleWinnerByCategory.and.returnValue(battle);

		expect(effects.battle$).toBeObservable(expected);
	});
});
```

At this point we should have a failing test. To get that test in the green, in the effect we need to catch the error and return a `BattleFail` action. Add the following to the pipe for the `determineBattleWinnerByCategory` function call:

```ts
// catch errors and return BattleFail action
catchError(err => of(new BattleFail(err)))
```

The fully updated effect should like like this:

```ts
@Effect()
battle$: Observable<Action> = this.actions$.pipe(
  // the action that will trigger this effect
  ofType<Battle>(ChallengeActionTypes.Battle),
  // determine the result of the battle
  switchMap(action => this.dancerService.determineBattleWinnerByCategory(action.payload.challenger, action.payload.challengee).pipe(
    // map the outcome to return a BattleOutcomeDetermined action
    map((outcome: BattleOutcome) => new BattleOutcomeDetermined(outcome)),
	// catch errors and return BattleFail action
	catchError(err => of(new BattleFail(err)))
  ))
);
```

Go to [Task 3](./task-3.md)
