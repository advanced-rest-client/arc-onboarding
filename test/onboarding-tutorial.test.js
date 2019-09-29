import { fixture, assert, html } from '@open-wc/testing';
// import * as MockInteractions from '@polymer/iron-test-helpers/mock-interactions.js';
import * as sinon from 'sinon/pkg/sinon-esm.js';
import '../onboarding-tutorial.js';
import '../onboarding-page.js';

describe('<onboarding-tutorial>', function() {
  async function basicFixture() {
    return await fixture(html`
      <onboarding-tutorial id="test">
        <onboarding-page>test</onboarding-page>
        <onboarding-page>test</onboarding-page>
      </onboarding-tutorial>
    `);
  }

  async function openedFixture() {
    return await fixture(html`
      <onboarding-tutorial id="test" opened>
        <onboarding-page>test</onboarding-page>
        <onboarding-page>test</onboarding-page>
      </onboarding-tutorial>
    `);
  }

  async function emptyFixture() {
    return await fixture(html`
      <onboarding-tutorial id="test"></onboarding-tutorial>
    `);
  }

  describe('Initialization', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('selected is 0 by default', function() {
      assert.equal(element.selected, 0);
    });

    it('previousEnabled false', function() {
      assert.isFalse(element.previousEnabled);
    });

    it('lastPage false', function() {
      assert.isFalse(element.lastPage);
    });

    it('nextLabel false', function() {
      assert.equal(element.nextLabel, 'Next');
    });

    it('showSkip is true by default', function() {
      assert.isTrue(element.showSkip);
    });

    it('noPagination is computed', function() {
      assert.isFalse(element.noPagination);
    });

    it('renderPrev is computed', function() {
      assert.isTrue(element.renderPrev);
    });

    it('renders next page', function() {
      element.next();
      assert.equal(element.selected, 1);
      assert.isTrue(element.lastPage);
      assert.equal(element.nextLabel, 'Close');
      assert.isFalse(element.showSkip);
    });

    it('hides items that ar enot selected', () => {
      const pages = element.querySelectorAll('onboarding-page');
      assert.isFalse(pages[0].hasAttribute('hidden'), 'first page is visible');
      assert.isTrue(pages[1].hasAttribute('hidden'), 'other page is hidden');
    });
  });

  describe('#renderPrev', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('is true when more han one item', () => {
      assert.isTrue(element.renderPrev);
    });

    it('is false when no items', () => {
      element._items = undefined;
      assert.isFalse(element.renderPrev);
    });
  });

  describe('#previousEnabled', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('is true when selection above 0', () => {
      element.selected = 1;
      assert.isTrue(element.previousEnabled);
    });

    it('is false when selection is 0', () => {
      element.selected = 0;
      assert.isFalse(element.previousEnabled);
    });
  });

  describe('#lastPage', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('is true when selection is at last page', () => {
      element.selected = 1;
      assert.isTrue(element.lastPage);
    });

    it('is false when selection is other page', () => {
      element.selected = 0;
      assert.isFalse(element.lastPage);
    });

    it('is false when no items', () => {
      element._items = undefined;
      assert.isFalse(element.lastPage);
    });
  });

  describe('#nextLabel', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('is "close" when at last page', () => {
      element.selected = 1;
      assert.equal(element.nextLabel, 'Close');
    });

    it('is "next" when selection is other page', () => {
      element.selected = 0;
      assert.equal(element.nextLabel, 'Next');
    });
  });

  describe('#showSkip', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('is false when at last page', () => {
      element.selected = 1;
      assert.isFalse(element.showSkip);
    });

    it('is true when selection is other page', () => {
      element.selected = 0;
      assert.isTrue(element.showSkip);
    });
  });

  describe('#noPagination', () => {
    it('is true when no items', async () => {
      const element = await emptyFixture();
      assert.isTrue(element.noPagination);
    });

    it('is false when has more than one item', async () => {
      const element = await basicFixture();
      assert.isFalse(element.noPagination);
    });
  });

  describe('next()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Calls selectNext()', () => {
      const spy = sinon.spy(element, 'selectNext');
      element.next();
      assert.isTrue(spy.called);
    });

    it('Calls completeTutorial() when last page', () => {
      element.selected = 1;
      const spy = sinon.spy(element, 'completeTutorial');
      element.next();
      assert.isTrue(spy.called);
    });
  });

  describe('prev()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Calls selectPrevious()', () => {
      const spy = sinon.spy(element, 'selectPrevious');
      element.prev();
      assert.isTrue(spy.called);
    });
  });

  describe('completeTutorial()', () => {
    let element;
    beforeEach(async () => {
      element = await openedFixture();
    });

    it('Calls close() only when no id', () => {
      const spy1 = sinon.spy(element, 'close');
      const spy2 = sinon.spy();
      element.addEventListener('tutorial-close', spy2);
      element.id = '';
      element.completeTutorial();
      assert.isTrue(spy1.called);
      assert.isFalse(spy2.called);
    });

    it('Dispatches tutorial-close event', () => {
      const spy = sinon.spy();
      element.addEventListener('tutorial-close', spy);
      element.completeTutorial();
      assert.isTrue(spy.called);
    });
  });

  describe('skip()', () => {
    let element;
    beforeEach(async () => {
      element = await openedFixture();
    });

    it('Calls completeTutorial()', () => {
      const spy = sinon.spy(element, 'completeTutorial');
      element.skip();
      assert.isTrue(spy.called);
    });

    it('Dispatches send-analytics event', () => {
      const spy = sinon.spy();
      element.addEventListener('send-analytics', spy);
      element.skip();
      assert.isTrue(spy.called);
    });
  });
});
