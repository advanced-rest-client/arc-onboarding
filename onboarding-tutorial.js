/**
@license
Copyright 2017 The Advanced REST client authors <arc@mulesoft.com>
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/
/**
An overlay that displays onboarding tutorial for ARC.

### Styling
`<arc-onboarding>` provides the following custom properties and mixins for styling:

Custom property | Description | Default
----------------|-------------|----------
`--onboarding-tutorial` | Mixin applied to the element | `{}`

@element onboarding-tutorial
@demo demo/index.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import {PolymerElement} from '../../@polymer/polymer/polymer-element.js';
import {mixinBehaviors} from '../../@polymer/polymer/lib/legacy/class.js';
import {html} from '../../@polymer/polymer/lib/utils/html-tag.js';
import {FlattenedNodesObserver} from '../../@polymer/polymer/lib/utils/flattened-nodes-observer.js';
import {NeonAnimationRunnerBehavior} from '../../@polymer/neon-animation/neon-animation-runner-behavior.js';
import {IronResizableBehavior} from '../../@polymer/iron-resizable-behavior/iron-resizable-behavior.js';
import {IronOverlayBehavior} from '../../@polymer/iron-overlay-behavior/iron-overlay-behavior.js';
import '../../@polymer/neon-animation/neon-animated-pages.js';
import '../../@polymer/neon-animation/animations/slide-from-right-animation.js';
import '../../@polymer/neon-animation/animations/slide-from-left-animation.js';
import '../../@polymer/neon-animation/animations/slide-left-animation.js';
import '../../@polymer/neon-animation/animations/slide-right-animation.js';
import '../../@polymer/paper-radio-group/paper-radio-group.js';
import '../../@polymer/paper-radio-button/paper-radio-button.js';
import '../../@polymer/paper-button/paper-button.js';
import '../../@polymer/iron-flex-layout/iron-flex-layout.js';
/**
 * `onboarding-page`
 *
 * ## Styling
 *
 * `<onboarding-page>` provides the following custom properties and mixins for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--onboarding-page` | Mixin applied to this elment | `{}`
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 * @memberof ApiElements
 */
class OnboardingTutorial extends
  mixinBehaviors([IronOverlayBehavior, IronResizableBehavior, NeonAnimationRunnerBehavior], PolymerElement) {
  static get template() {
    return html`<style>
    :host {
      display: block;
      margin: 24px 40px;
      -webkit-overflow-scrolling: touch;

      background: var(--paper-dialog-background-color, --primary-background-color);
      color: var(--paper-dialog-color, --primary-text-color);

      @apply --paper-font-body1;
      @apply --shadow-elevation-16dp;
      @apply --paper-dialog;
      width: 800px;
      height: 600px;
      overflow: hidden;
    }

    .actions {
      position: relative;
      padding: 8px 8px 8px 24px;
      margin: 0;
      color: var(--paper-dialog-button-color, --primary-color);
      background: var(--paper-dialog-background-color, --primary-background-color);
      @apply --layout-horizontal;
    }

    neon-animated-pages {
      height: calc(100% - 60px);
    }

    .flex {
      @apply --layout-flex;
    }

    .action-button {
      height: 40px;
      background-color: var(--primary-color);
      color: var(--primary-action-color, #fff);
      @apply --action-button;
    }

    .action-button:hover {
      @apply --action-button-hover;
    }

    @media (max-width: 600px) {
      :host .actions {
        @apply --layout-vertical;
        @apply --layout-center;
      }

      :host neon-animated-pages {
        height: calc(100% - 108px);
      }
    }
    </style>
    <neon-animated-pages
      id="pages"
      selected="{{selectedPage}}"
      entry-animation="slide-from-right-animation"
      exit-animation="slide-left-animation">
      <slot id="content"></slot>
    </neon-animated-pages>
    <div class="actions">
      <div class="pages" hidden\$="[[noPagination]]">
        <paper-radio-group selected="{{selectedPage}}">
        <template is="dom-repeat" items="[[pages]]">
          <paper-radio-button name\$="[[index]]"></paper-radio-button>
        </template>
        </paper-radio-group>
      </div>
      <div class="flex"></div>
      <div class="buttons">
        <template is="dom-if" if="[[showSkip]]">
          <paper-button on-click="skip">Skip</paper-button>
        </template>
        <template is="dom-if" if="[[renderPrev]]">
          <paper-button on-click="prev" disabled\$="[[!previousEnabled]]">Previous</paper-button>
        </template>
        <template is="dom-if" if="[[renderPrev]]">
          <paper-button on-click="next" class="action-button" raised="">[[nextLabel]]</paper-button>
        </template>
      </div>
    </div>`;
  }
  static get is() {
    return 'onboarding-tutorial';
  }
  static get properties() {
    return {
      /**
       * Delay tutorial show after attaching this element to the DOM.
       * Use with combination with `auto`. It will do nothing if auto is not set.
       */
      delay: {
        type: Number,
        value: 2000
      },
      /**
       * If true the tutorial will open itself automatically.
       * Use with combination with `delay`.
       * @type {Boolean}
       */
      auto: Boolean,
      // Number of pages to display
      pages: {
        type: Array,
        value: []
      },
      // Currently selected tutorial page.
      selectedPage: {
        type: Number,
        value: 0
      },
      // Computed value, true if the "previous" button is enabled
      previousEnabled: {
        type: Boolean,
        computed: '_computeShowPrevious(selectedPage)'
      },
      // Compyted value, true if the tutorial displays last page.
      lastPage: {
        type: Boolean,
        computed: '_computeLastPage(selectedPage, pages)'
      },
      // Label for the "next" button
      nextLabel: {
        type: String,
        computed: '_computeNextLabel(lastPage)'
      },
      // Computed value, true if to show "skip" button
      showSkip: {
        type: Boolean,
        computed: '_computeShowSkip(lastPage)'
      },
      /**
       * True when hide the pagination for tutorial pages.
       */
      noPagination: {type: Boolean, computed: '_computeNoPagination(pages)'},
      /**
       * True to render "previous" button
       */
      renderPrev: {
        type: Boolean,
        value: false,
        computed: '_computeRenderPrev(pages)'
      },
      // Computed value if local storage is available.
      _hasLocalStoreage: {
        type: Boolean,
        value() {
          try {
            localStorage.setItem('__test', 'a');
            localStorage.removeItem('__test');
            return true;
          } catch (e) {
            return false;
          }
        }
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'dialog');
    }
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '-1');
    }
    this._nodeObserver = new FlattenedNodesObserver(this.$.content, (info) => {
      this._processNewNodes(info.addedNodes);
      this._processRemovedNodes(info.removedNodes);
    });
    this._checkTutorialOpen();
    this.addEventListener('neon-animation-finish', this._onNeonAnimationFinish);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('neon-animation-finish', this._onNeonAnimationFinish);
    this._nodeObserver.disconnect();
  }

  _renderOpened() {
    this.cancelAnimation();
    this.playAnimation('entry');
  }

  _renderClosed() {
    this.cancelAnimation();
    this.playAnimation('exit');
  }

  _onNeonAnimationFinish() {
    if (this.opened) {
      this._finishRenderOpened();
    } else {
      this._finishRenderClosed();
    }
  }

  _checkTutorialOpen() {
    if (!this.auto || this._openedChecked) {
      return;
    }
    this._openedChecked = true;
    if (this.delay) {
      setTimeout(() => this.openTutorial(), this.delay);
    } else {
      this.openTutorial();
    }
  }

  _processNewNodes(nodes) {
    if (!nodes) {
      return;
    }
    nodes = nodes.filter((node) => node.nodeType === Node.ELEMENT_NODE);
    if (!nodes.length) {
      return;
    }
    let pages = this.pages || [];
    pages = pages.concat(nodes);
    this.set('pages', pages);
  }

  _processRemovedNodes(nodes) {
    if (!nodes) {
      return;
    }
    nodes = nodes.filter((node) => node.nodeType === Node.ELEMENT_NODE);
    if (!nodes.length) {
      return;
    }
    let pages = this.pages;
    if (!pages || !pages.length) {
      return;
    }
    pages = Array.from(pages);
    for (let i = 0, len = nodes.length; i < len; i++) {
      const index = pages.indexOf(nodes[i]);
      if (index === -1) {
        return;
      }
      pages.splice(i, 1);
    }
    this.set('pages', pages);
  }

  _computeNoPagination(pages) {
    return !!(pages && pages.length <= 1);
  }

  _computeRenderPrev(pages) {
    return !!(pages && pages.length > 1);
  }
  /**
   * Check if tutorial can be opened (wasn't finished already) and opens it.
   * @return {Promise}
   */
  openTutorial() {
    return this._getTutorialState()
    .then((state) => {
      if (state) {
        return;
      }
      this.dispatchEvent(new CustomEvent('tutorial-open', {
        bubbles: true,
        composed: true
      }));
      this.open();
    });
  }

  _computeShowPrevious(selectedPage) {
    selectedPage = Number(selectedPage);
    return selectedPage > 0;
  }

  next() {
    if (this.lastPage) {
      this.dispatchEvent(new CustomEvent('send-analytics', {
        bubbles: true,
        composed: true,
        detail: {
          type: 'event',
          category: 'Onboarding',
          action: 'Passed'
        }
      }));
      this.completeTutorial();
      return;
    }
    this.$.pages.entryAnimation = 'slide-from-right-animation';
    this.$.pages.exitAnimation = 'slide-left-animation';
    this.$.pages.selectNext();
  }

  prev() {
    this.$.pages.entryAnimation = 'slide-from-left-animation';
    this.$.pages.exitAnimation = 'slide-right-animation';
    this.$.pages.selectPrevious();
  }

  completeTutorial() {
    this.close();
    if (!this.id) {
      return;
    }
    this._saveTutorialPassed();
    this.dispatchEvent(new CustomEvent('tutorial-close', {
      bubbles: true,
      composed: true
    }));
  }

  skip() {
    this.completeTutorial();
    this.dispatchEvent(new CustomEvent('send-analytics', {
      bubbles: true,
      composed: true,
      type: {
        type: 'event',
        category: 'Onboarding',
        action: 'Skipped'
      }
    }));
  }

  _tutorialId() {
    if (!this.id) {
      return;
    }
    return 'tutorial_' + this.id;
  }

  _getTutorialState() {
    const id = this._tutorialId();
    if (!id) {
      return Promise.resolve(false);
    }

    if (this._hasLocalStoreage) {
      const value = localStorage.getItem(id);
      return Promise.resolve(!!value);
    }
    return this.__getStateChrome(id);
  }

  _saveTutorialPassed() {
    const id = this._tutorialId();
    if (!id) {
      return Promise.resolve();
    }
    if (this._hasLocalStoreage) {
      localStorage.setItem(id, true);
      return Promise.resolve();
    }
    return this.__setStateChrome(id);
  }
  /**
   * Saves information about the tutorial in Chrome store.
   * @param {String} key Tutorial key
   * @return {Promise} Promise resolved to boolean value. True if the tutorial
   * has been presented to the user already.
   */
  __getStateChrome(key) {
    return new Promise((resolve) => {
      /* global chrome */
      chrome.storage.sync.get(key, (data) => {
        if (!data || !data[key]) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }
  /**
   * Saves information about the tutorial in Chrome store.
   * @param {String} key Storage key
   * @return {Promise}
   */
  __setStateChrome(key) {
    return new Promise((resolve) => {
      const obj = {};
      obj[key] = true;
      chrome.storage.sync.set(obj, () => resolve());
    });
  }
  /**
   * Computes label for the "next" button.
   * @param {Boolean} lastPage Current value for `lastPage` property.
   * @return {String}
   */
  _computeNextLabel(lastPage) {
    return lastPage ? 'Close' : 'Next';
  }
  /**
   * Computes value for the `lastPage` property.
   * @param {Number} selectedPage
   * @param {Number} pages
   * @return {Boolean}
   */
  _computeLastPage(selectedPage, pages) {
    if (!pages) {
      return false;
    }
    selectedPage = Number(selectedPage);
    return selectedPage === pages.length - 1;
  }
  /**
   * Computes value for `showSkip` value.
   * @param {Boolean} lastPage Current value for `lastPage` property.
   * @return {Boolean}
   */
  _computeShowSkip(lastPage) {
    return lastPage ? false : true;
  }
}
window.customElements.define(OnboardingTutorial.is, OnboardingTutorial);
