import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Dancer } from './models/dancer.model';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const dancers: Dancer[] = [
      {
        id: 1, name: 'Madonna', ratings: {
          moonwalk: 1,
          sprinkler: 2,
          worm: 3,
          disco: 4
        },
        images: {
          profileUrl: 'assets/madonna.jpg',
          danceUrl: 'assets/battle-gif/madonna.gif'
        }
      },
      {
        id: 2, name: 'Michael Jackson', ratings: {
          moonwalk: 10,
          sprinkler: 2,
          worm: 3,
          disco: 4
        },
        images: {
          profileUrl: 'assets/michealJackson.jpg',
          danceUrl: 'assets/battle-gif/mJackson.gif'
        }
      },
      {
        id: 3, name: 'Axel Rose', ratings: {
          moonwalk: 1,
          sprinkler: 2,
          worm: 3,
          disco: 4
        },
        images: {
          profileUrl: 'assets/axelRose.jpg',
          danceUrl: 'assets/battle-gif/aRose.gif'
        }
      },
      {
        id: 4, name: 'Susanna Hoffs', ratings: {
          moonwalk: 1,
          sprinkler: 2,
          worm: 3,
          disco: 4
        },
        images: {
          profileUrl: 'assets/susannaHoffs.jpg',
          danceUrl: 'assets/battle-gif/sHoffs.gif'
        }
      },
      {
        id: 5, name: 'Debbie Harry', ratings: {
          moonwalk: 1,
          sprinkler: 2,
          worm: 3,
          disco: 4
        },
        images: {
          profileUrl: 'assets/debbieHarry.jpg',
          danceUrl: 'assets/battle-gif/dHarry.gif'
        }
      },
      {
        id: 6, name: 'David Bowie', ratings: {
          moonwalk: 1,
          sprinkler: 2,
          worm: 3,
          disco: 4
        },
        images: {
          profileUrl: 'assets/davidBowie.jpg',
          danceUrl: 'assets/battle-gif/dBowie.gif'
        }
      },
      {
        id: 7, name: 'Mick Jagger', ratings: {
          moonwalk: 1,
          sprinkler: 2,
          worm: 3,
          disco: 4
        },
        images: {
          profileUrl: 'assets/mickJagger.jpg',
          danceUrl: 'assets/battle-gif/mJagger.gif'
        }
      },
      {
        id: 8, name: 'Stevie Nicks', ratings: {
          moonwalk: 1,
          sprinkler: 2,
          worm: 3,
          disco: 4
        },
        images: {
          profileUrl: 'assets/stevieNicks.jpg',
          danceUrl: 'assets/battle-gif/sNicks.gif'
        }
      },
      {
        id: 9, name: 'Elton John', ratings: {
          moonwalk: 1,
          sprinkler: 2,
          worm: 3,
          disco: 4
        },
        images: {
          profileUrl: 'assets/eltonJohn.jpg',
          danceUrl: 'assets/battle-gif/eJohn.gif'
        }
      },
      {
        id: 10, name: 'James Hetfield', ratings: {
          moonwalk: 1,
          sprinkler: 2,
          worm: 3,
          disco: 4
        },
        images: {
          profileUrl: 'assets/jamesHetfield.jpg',
          danceUrl: 'assets/battle-gif/jHetfield.gif'
        }
      }
    ];
    return { dancers };
  }
}
