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
import { LitElement, html } from 'lit-element';
import { ArcResizableMixin } from '@advanced-rest-client/arc-resizable-mixin/arc-resizable-mixin.js';
import { ArcOverlayMixin } from '@advanced-rest-client/arc-overlay-mixin/arc-overlay-mixin.js';
import '@anypoint-web-components/anypoint-radio-button/anypoint-radio-button.js';
import '@anypoint-web-components/anypoint-radio-button/anypoint-radio-group.js';
import '@anypoint-web-components/anypoint-button/anypoint-button.js';
import { AnypointSelectableMixin } from '@anypoint-web-components/anypoint-selector/anypoint-selectable-mixin.js';
import styles from './TutorialStyles.js';
/**
 * `onboarding-page`
 *
 * @customElement
 * @demo demo/index.html
 * @memberof ApiElements
 */
export class OnboardingTutorial extends AnypointSelectableMixin(ArcOverlayMixin(ArcResizableMixin(LitElement))) {
  static get styles() {
    return styles;
  }

  render() {
    return html`
    <div class="content">
      <slot id="content"></slot>
    </div>
    ${this._paginationTemplate()}
    `;
  }

  _paginationTemplate() {
    if (this.noPagination) {
      return;
    }
    const items = this.items || [];
    const { selected, showSkip, renderPrev, previousEnabled, nextLabel } = this;
    return html`<div class="actions">
      <div class="pages">
        <anypoint-radio-group
          .selected="${selected}"
          @selected-changed="${this._radioHandler}"
        >
        ${items.map((item, index) => html`<anypoint-radio-button name="${index}"></anypoint-radio-button>`)}
        </anypoint-radio-group>
      </div>
      <div class="flex"></div>
      <div class="buttons">
        ${showSkip ? html`
          <anypoint-button @click="${this.skip}">Skip</anypoint-button>
        ` : ''}
        ${renderPrev ? html`
          <anypoint-button
            @click="${this.prev}"
            ?disabled="${!previousEnabled}"
          >
            Previous
          </anypoint-button>
        ` : ''}
        ${renderPrev ? html`
          <anypoint-button
            @click="${this.next}"
            class="action-button"
            emphasis="high"
          >
            ${nextLabel}
          </anypoint-button>
        ` : ''}
      </div>
    </div>`;
  }

  /**
   * @return {Boolean} true if the "previous" button is enabled
   */
  get previousEnabled() {
    const { selected } = this;
    return !!selected && selected > 0;
  }
  /**
   * @return {Boolean} true if the tutorial displays last page.
   */
  get lastPage() {
    const { selected, items } = this;
    if (!items || !items.length) {
      return false;
    }
    return selected === items.length - 1;
  }
  /**
   * @return {String} Label for the "next" button
   */
  get nextLabel() {
    const { lastPage } = this;
    return lastPage ? 'Close' : 'Next';
  }
  /**
   * @return {Boolean} true if to show "skip" button
   */
  get showSkip() {
    const { lastPage } = this;
    return lastPage ? false : true;
  }
  /**
   * @return {Boolean} True when hide the pagination for tutorial pages.
   */
  get noPagination() {
    const { items } = this;
    return !!(items && items.length <= 1);
  }
  /**
   * @return {Boolean} True to render "previous" button
   */
  get renderPrev() {
    const { items } = this;
    return !!(items && items.length > 1);
  }

  constructor() {
    super();

    this.selected = 0;
    this._itemsHandler = this._itemsHandler.bind(this);
  }

  connectedCallback() {
    this.addEventListener('items-changed', this._itemsHandler);
    if (super.connectedCallback) {
      super.connectedCallback();
    }
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'dialog');
    }
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '-1');
    }
  }

  disconnectedCallback() {
    if (super.disconnectedCallback) {
      super.disconnectedCallback();
    }
    this.removeEventListener('items-changed', this._itemsHandler);
  }

  _itemsHandler(e) {
    const { value } = e.detail;
    if (!value || !value.length) {
      return;
    }
    const { selected } = this;
    value.forEach((node, index) => {
      if (selected === index) {
        return;
      }
      if (!node.hasAttribute('hidden')) {
        node.setAttribute('hidden', '');
      }
    });
  }

  _updateSelected() {
    super._updateSelected();
    const { selected, items } = this;
    if (!items || !items.length || selected === undefined) {
      return;
    }
    items.forEach((node, index) => {
      if (selected === index) {
        if (node.hasAttribute('hidden')) {
          node.removeAttribute('hidden', '');
        }
      } else {
        if (!node.hasAttribute('hidden')) {
          node.setAttribute('hidden', '');
        }
      }
    });
    this.requestUpdate();
  }

  _radioHandler(e) {
    this.selected = e.target.selected;
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
    this.selectNext();
  }

  prev() {
    this.selectPrevious();
  }

  skip() {
    this.dispatchEvent(new CustomEvent('send-analytics', {
      bubbles: true,
      composed: true,
      type: {
        type: 'event',
        category: 'Onboarding',
        action: 'Skipped'
      }
    }));
    this.completeTutorial();
  }

  completeTutorial() {
    this.close();
    if (!this.id) {
      return;
    }
    this.dispatchEvent(new CustomEvent('tutorial-close', {
      bubbles: true,
      composed: true
    }));
  }
}
