/**
@license
Copyright 2019 The Advanced REST client authors <arc@mulesoft.com>
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
import {PolymerElement} from '../../@polymer/polymer/polymer-element.js';
import '../../@polymer/iron-flex-layout/iron-flex-layout.js';
import {html} from '../../@polymer/polymer/lib/utils/html-tag.js';
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
class OnboardingPage extends PolymerElement {
  static get template() {
    return html`
    <style>
    :host {
      overflow: auto;
      @apply --layout-vertical;
      @apply --layout-flex;
      font-size: 19px;
    }

    :host > ::slotted(:first-child) {
      margin-top: 24px;
    }

    :host > ::slotted(h2) {
      position: relative;
      margin: 0;
      padding: 24px;
      @apply --paper-font-display1;
      @apply --paper-dialog-title;
    }

    .page {
      padding: 0 24px;
      overflow: hidden;
      @apply --layout-horizontal;
      @apply --layout-flex;
    }

    .page > * {
      @apply --layout-flex;
    }

    :host([with-image]) .image {
      @apply --layout-vertical;
    }

    .image ::slotted(iron-icon) {
      color: var(--onboarding-page-image-color, rgba(0, 0, 0, 0.57));
      width: 140px;
      height: 140px;
      margin-bottom: 40px;
    }

    .image {
      display: none;
      @apply --layout-center-center;
    }

    .info {
      overflow: auto;
      @apply --layout-vertical;
      @apply --layout-center;
    }
    </style>
    <slot name="title"></slot>
    <div class="page">
      <div class="image">
        <slot name="image"></slot>
      </div>
      <div class="info">
        <slot></slot>
      </div>
    </div>`;
  }
  static get properties() {
    return {
      withImage: {type: Boolean, reflectToAttribute: true}
    };
  }
}
window.customElements.define('onboarding-page', OnboardingPage);
