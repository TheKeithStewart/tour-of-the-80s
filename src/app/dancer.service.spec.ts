import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { DancerService } from './dancer.service';
import { Dancer } from './models/dancer.model';
import { BattleOutcome } from './reducers/challenge.reducer';

describe('DancerService', () => {
  let service: DancerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DancerService],
      imports: [
        HttpClientModule
      ]
    });

    service = TestBed.get(DancerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('determineBattleWinnerByCategory()', () => {
    let dancer1: Dancer, dancer2: Dancer;

    beforeEach(() => {
      dancer1 = new Dancer();
      dancer2 = new Dancer();
    });

    it('should return ChallengerWins if Dancer1 has a higher rating in 3 categories and Dancer2 has a higher rating in 1', () => {
      dancer1.ratings = { moonwalk: 10, sprinkler: 6, worm: 5, disco: 3 };
      dancer2.ratings = { moonwalk: 8, sprinkler: 5, worm: 4, disco: 10 };

      service.determineBattleWinnerByCategory(dancer1, dancer2).subscribe(result => {
        expect(result).toEqual(BattleOutcome.ChallengerWins);
      });
    });

    it('should return ChallengerWins if Dancer1 has a higher rating in 1 categories and the dancers tie in 3', () => {
      dancer1.ratings = { moonwalk: 10, sprinkler: 6, worm: 5, disco: 3 };
      dancer2.ratings = { moonwalk: 8, sprinkler: 6, worm: 5, disco: 3 };

      service.determineBattleWinnerByCategory(dancer1, dancer2).subscribe(result => {
        expect(result).toEqual(BattleOutcome.ChallengerWins);
      });
    });
    
    it('should return ChallengeeWins if Dancer2 wins 2 categories, Dancer1 wins 1, and they tie 1', () => {
      dancer1.ratings = { moonwalk: 10, sprinkler: 5, worm: 4, disco: 3 };
      dancer2.ratings = { moonwalk: 8, sprinkler: 6, worm: 5, disco: 3 };
  
      service.determineBattleWinnerByCategory(dancer1, dancer2).subscribe(result => {
        expect(result).toEqual(BattleOutcome.ChallengeeWins);
      });
    });
    
    it('should return Tie if both dancers win 2 categories', () => {
      dancer1.ratings = { moonwalk: 10, sprinkler: 10, worm: 4, disco: 3 };
      dancer2.ratings = { moonwalk: 8, sprinkler: 6, worm: 10, disco: 10 };
  
      service.determineBattleWinnerByCategory(dancer1, dancer2).subscribe(result => {
        expect(result).toEqual(BattleOutcome.Tie);
      });
    });
    
    it('should return Tie if the dancers tie in each category', () => {
      dancer1.ratings = { moonwalk: 10, sprinkler: 10, worm: 10, disco: 10 };
      dancer2.ratings = { moonwalk: 10, sprinkler: 10, worm: 10, disco: 10 };
  
      service.determineBattleWinnerByCategory(dancer1, dancer2).subscribe(result => {
        expect(result).toEqual(BattleOutcome.Tie);
      });
    });
  });
});
