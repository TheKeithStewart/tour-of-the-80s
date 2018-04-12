'use strict'; // necessary for es6 output in node

import { browser, element, by, ElementFinder, ElementArrayFinder } from 'protractor';
import { promise } from 'selenium-webdriver';

const expectedH1 = 'Tour of Dancers';
const expectedTitle = `${expectedH1}`;
const targetDancer = { id: 15, name: 'Magneta' };
const targetDancerDashboardIndex = 3;
const nameSuffix = 'X';
const newDancerName = targetDancer.name + nameSuffix;

class Dancer {
  id: number;
  name: string;

  // Factory methods

  // Dancer from string formatted as '<id> <name>'.
  static fromString(s: string): Dancer {
    return {
      id: +s.substr(0, s.indexOf(' ')),
      name: s.substr(s.indexOf(' ') + 1),
    };
  }

  // Dancer from dancer list <li> element.
  static async fromLi(li: ElementFinder): Promise<Dancer> {
    let stringsFromA = await li.all(by.css('a')).getText();
    let strings = stringsFromA[0].split(' ');
    return { id: +strings[0], name: strings[1] };
  }

  // Dancer id and name from the given detail element.
  static async fromDetail(detail: ElementFinder): Promise<Dancer> {
    // Get dancer id from the first <div>
    let _id = await detail.all(by.css('div')).first().getText();
    // Get name from the h2
    let _name = await detail.element(by.css('h2')).getText();
    return {
      id: +_id.substr(_id.indexOf(' ') + 1),
      name: _name.substr(0, _name.lastIndexOf(' '))
    };
  }
}

describe('Tutorial part 6', () => {

  beforeAll(() => browser.get(''));

  function getPageElts() {
    let navElts = element.all(by.css('app-root nav a'));

    return {
      navElts: navElts,

      appDashboardHref: navElts.get(0),
      appDashboard: element(by.css('app-root app-dashboard')),
      topDancers: element.all(by.css('app-root app-dashboard > div h4')),

      appDancersHref: navElts.get(1),
      appDancers: element(by.css('app-root app-dancers')),
      allDancers: element.all(by.css('app-root app-dancers li')),
      selectedDancerSubview: element(by.css('app-root app-dancers > div:last-child')),

      dancerDetail: element(by.css('app-root app-dancer-detail > div')),

      searchBox: element(by.css('#search-box')),
      searchResults: element.all(by.css('.search-result li'))
    };
  }

  describe('Initial page', () => {

    it(`has title '${expectedTitle}'`, () => {
      expect(browser.getTitle()).toEqual(expectedTitle);
    });

    it(`has h1 '${expectedH1}'`, () => {
      expectHeading(1, expectedH1);
    });

    const expectedViewNames = ['Dashboard', 'Dancers'];
    it(`has views ${expectedViewNames}`, () => {
      let viewNames = getPageElts().navElts.map((el: ElementFinder) => el.getText());
      expect(viewNames).toEqual(expectedViewNames);
    });

    it('has dashboard as the active view', () => {
      let page = getPageElts();
      expect(page.appDashboard.isPresent()).toBeTruthy();
    });

  });

  describe('Dashboard tests', () => {

    beforeAll(() => browser.get(''));

    it('has top dancers', () => {
      let page = getPageElts();
      expect(page.topDancers.count()).toEqual(4);
    });

    it(`selects and routes to ${targetDancer.name} details`, dashboardSelectTargetDancer);

    it(`updates dancer name (${newDancerName}) in details view`, updateDancerNameInDetailView);

    it(`cancels and shows ${targetDancer.name} in Dashboard`, () => {
      element(by.buttonText('go back')).click();
      browser.waitForAngular(); // seems necessary to gets tests to pass for toh-pt6

      let targetDancerElt = getPageElts().topDancers.get(targetDancerDashboardIndex);
      expect(targetDancerElt.getText()).toEqual(targetDancer.name);
    });

    it(`selects and routes to ${targetDancer.name} details`, dashboardSelectTargetDancer);

    it(`updates dancer name (${newDancerName}) in details view`, updateDancerNameInDetailView);

    it(`saves and shows ${newDancerName} in Dashboard`, () => {
      element(by.buttonText('save')).click();
      browser.waitForAngular(); // seems necessary to gets tests to pass for toh-pt6

      let targetDancerElt = getPageElts().topDancers.get(targetDancerDashboardIndex);
      expect(targetDancerElt.getText()).toEqual(newDancerName);
    });

  });

  describe('Dancers tests', () => {

    beforeAll(() => browser.get(''));

    it('can switch to Dancers view', () => {
      getPageElts().appDancersHref.click();
      let page = getPageElts();
      expect(page.appDancers.isPresent()).toBeTruthy();
      expect(page.allDancers.count()).toEqual(10, 'number of dancers');
    });

    it('can route to dancer details', async () => {
      getDancerLiEltById(targetDancer.id).click();

      let page = getPageElts();
      expect(page.dancerDetail.isPresent()).toBeTruthy('shows dancer detail');
      let dancer = await Dancer.fromDetail(page.dancerDetail);
      expect(dancer.id).toEqual(targetDancer.id);
      expect(dancer.name).toEqual(targetDancer.name.toUpperCase());
    });

    it(`updates dancer name (${newDancerName}) in details view`, updateDancerNameInDetailView);

    it(`shows ${newDancerName} in Dancers list`, () => {
      element(by.buttonText('save')).click();
      browser.waitForAngular();
      let expectedText = `${targetDancer.id} ${newDancerName}`;
      expect(getDancerAEltById(targetDancer.id).getText()).toEqual(expectedText);
    });

    it(`deletes ${newDancerName} from Dancers list`, async () => {
      const dancersBefore = await toDancerArray(getPageElts().allDancers);
      const li = getDancerLiEltById(targetDancer.id);

      const page = getPageElts();
      expect(page.appDancers.isPresent()).toBeTruthy();
      expect(page.allDancers.count()).toEqual(9, 'number of dancers');
      const dancersAfter = await toDancerArray(page.allDancers);
      // console.log(await Dancer.fromLi(page.allDancers[0]));
      const expectedDancers = dancersBefore.filter(h => h.name !== newDancerName);
      expect(dancersAfter).toEqual(expectedDancers);
      // expect(page.selectedDancerSubview.isPresent()).toBeFalsy();
    });

    it(`adds back ${targetDancer.name}`, async () => {
      const newDancerName = 'Alice';
      const dancersBefore = await toDancerArray(getPageElts().allDancers);
      const numDancers = dancersBefore.length;

      element(by.css('input')).sendKeys(newDancerName);
      element(by.buttonText('add')).click();

      let page = getPageElts();
      let dancersAfter = await toDancerArray(page.allDancers);
      expect(dancersAfter.length).toEqual(numDancers + 1, 'number of dancers');

      expect(dancersAfter.slice(0, numDancers)).toEqual(dancersBefore, 'Old dancers are still there');

      const maxId = dancersBefore[dancersBefore.length - 1].id;
      expect(dancersAfter[numDancers]).toEqual({ id: maxId + 1, name: newDancerName });
    });

    it('displays correctly styled buttons', async () => {
      element.all(by.buttonText('x')).then(buttons => {
        for (const button of buttons) {
          // Inherited styles from styles.css
          expect(button.getCssValue('font-family')).toBe('Arial');
          expect(button.getCssValue('border')).toContain('none');
          expect(button.getCssValue('padding')).toBe('5px 10px');
          expect(button.getCssValue('border-radius')).toBe('4px');
          // Styles defined in dancers.component.css
          expect(button.getCssValue('left')).toBe('194px');
          expect(button.getCssValue('top')).toBe('-32px');
        }
      });

      const addButton = element(by.buttonText('add'));
      // Inherited styles from styles.css
      expect(addButton.getCssValue('font-family')).toBe('Arial');
      expect(addButton.getCssValue('border')).toContain('none');
      expect(addButton.getCssValue('padding')).toBe('5px 10px');
      expect(addButton.getCssValue('border-radius')).toBe('4px');
    });

  });

  describe('Progressive dancer search', () => {

    beforeAll(() => browser.get(''));

    it(`searches for 'Ma'`, async () => {
      getPageElts().searchBox.sendKeys('Ma');
      browser.sleep(1000);

      expect(getPageElts().searchResults.count()).toBe(4);
    });

    it(`continues search with 'g'`, async () => {
      getPageElts().searchBox.sendKeys('g');
      browser.sleep(1000);
      expect(getPageElts().searchResults.count()).toBe(2);
    });

    it(`continues search with 'e' and gets ${targetDancer.name}`, async () => {
      getPageElts().searchBox.sendKeys('n');
      browser.sleep(1000);
      let page = getPageElts();
      expect(page.searchResults.count()).toBe(1);
      let dancer = page.searchResults.get(0);
      expect(dancer.getText()).toEqual(targetDancer.name);
    });

    it(`navigates to ${targetDancer.name} details view`, async () => {
      let dancer = getPageElts().searchResults.get(0);
      expect(dancer.getText()).toEqual(targetDancer.name);
      dancer.click();

      let page = getPageElts();
      expect(page.dancerDetail.isPresent()).toBeTruthy('shows dancer detail');
      let dancer2 = await Dancer.fromDetail(page.dancerDetail);
      expect(dancer2.id).toEqual(targetDancer.id);
      expect(dancer2.name).toEqual(targetDancer.name.toUpperCase());
    });
  });

  async function dashboardSelectTargetDancer() {
    let targetDancerElt = getPageElts().topDancers.get(targetDancerDashboardIndex);
    expect(targetDancerElt.getText()).toEqual(targetDancer.name);
    targetDancerElt.click();
    browser.waitForAngular(); // seems necessary to gets tests to pass for toh-pt6

    let page = getPageElts();
    expect(page.dancerDetail.isPresent()).toBeTruthy('shows dancer detail');
    let dancer = await Dancer.fromDetail(page.dancerDetail);
    expect(dancer.id).toEqual(targetDancer.id);
    expect(dancer.name).toEqual(targetDancer.name.toUpperCase());
  }

  async function updateDancerNameInDetailView() {
    // Assumes that the current view is the dancer details view.
    addToDancerName(nameSuffix);

    let page = getPageElts();
    let dancer = await Dancer.fromDetail(page.dancerDetail);
    expect(dancer.id).toEqual(targetDancer.id);
    expect(dancer.name).toEqual(newDancerName.toUpperCase());
  }

});

function addToDancerName(text: string): promise.Promise<void> {
  let input = element(by.css('input'));
  return input.sendKeys(text);
}

function expectHeading(hLevel: number, expectedText: string): void {
  let hTag = `h${hLevel}`;
  let hText = element(by.css(hTag)).getText();
  expect(hText).toEqual(expectedText, hTag);
};

function getDancerAEltById(id: number): ElementFinder {
  let spanForId = element(by.cssContainingText('li span.badge', id.toString()));
  return spanForId.element(by.xpath('..'));
}

function getDancerLiEltById(id: number): ElementFinder {
  let spanForId = element(by.cssContainingText('li span.badge', id.toString()));
  return spanForId.element(by.xpath('../..'));
}

async function toDancerArray(allDancers: ElementArrayFinder): Promise<Dancer[]> {
  let promisedDancers = await allDancers.map(Dancer.fromLi);
  // The cast is necessary to get around issuing with the signature of Promise.all()
  return <Promise<any>>Promise.all(promisedDancers);
}
