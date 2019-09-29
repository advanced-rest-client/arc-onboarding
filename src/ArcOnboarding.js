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
import { LitElement, html, css } from 'lit-element';
import { driveColor, ramlR, code, accountCircle, shield } from '@advanced-rest-client/arc-icons/ArcIcons.js';
import '@anypoint-web-components/anypoint-button/anypoint-button.js';
import '../onboarding-tutorial.js';
import '../onboarding-page.js';
/* eslint-disable max-len */
/**
`<arc-onboarding>` Onboarding tutorial for the ARC

### Example
```
<arc-onboarding></arc-onboarding>
```

### Styling
`<arc-onboarding>` provides the following custom properties and mixins for styling:

Custom property | Description | Default
----------------|-------------|----------
`--arc-onboarding` | Mixin applied to the element | `{}`

@group UI Elements
@element arc-onboarding
@demo demo/index.html
*/
export class ArcOnboarding extends LitElement {
  static get styles() {
    return css`
    :host {
      display: block;
    }

    .welcome-message {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .c1,
    .c3 {
      font-size: var(--arc-font-headline-font-size);
      font-weight: var(--arc-font-headline-font-weight);
      letter-spacing: var(--arc-font-headline-letter-spacing);
      line-height: var(--arc-font-headline-line-height);
    }

    .c2 {
      font-size: var(--arc-font-display3-font-size);
      font-weight: var(--arc-font-display3-font-weight);
      letter-spacing: var(--arc-font-display3-letter-spacing);
      line-height: var(--arc-font-display3-line-height);
    }

    .raml-icon {
      color: #66c4e8;
    }

    .legal-info {
      font-size: 14px;
      color: var(--arc-onboarding-legal-info-color, rgba(0, 0, 0, 0.57));
      margin-top: 40px;
    }

    a {
      color: var(--link-color);
    }
  }`;
}

render() {
  const { opened } = this;
  return html`
    <onboarding-tutorial
      id="onboarding13"
      .opened="${opened}"
      @overlay-closed="${this._closedHandler}"
      withbackdrop>
      <div class="welcome-message">
        <p class="c1">Thank you for choosing</p>
        <p class="c2">Advanced REST Client</p>
        <p class="c3">Let's walk through some key features</p>
      </div>
      <onboarding-page withimage>
        <h2 slot="title">
          Google Drive sharing
        </h2>
        <span slot="image" class="icon">${driveColor}</span>
        <div>
          <p>Save and share your data with Google Drive.</p>
          <p>You can export your data to file and share it with others.</p>
          <div class="info-button">
            <anypoint-button
              @click="${this._followLink}"
              data-href="http://restforchrome.blogspot.com/2016/04/data-sharing-options-in-new-advanced.html"
              emphasis="high"
            >
              Learn more
            </anypoint-button>
          </div>
          <p class="legal-info">
            Advanced REST Client accesses data stored in your Google Drive on your request only a
            nd limits the information to created by the application files and folders only.
            Authorization tokens are stored in memory and are cleared when you close the application.<br>
            ARC uses Google Drive to list created by the application files when using
            "Open from Drive" option. It uploads requests, projects, or backup data to Your Drive
            when you request it in application UI.<br>
            The application do not use Google Drive for anything else.
            The application do not store Google profile information.
          </p>
        </div>
      </onboarding-page>
      <onboarding-page withimage>
        <h2 slot="title">API documentation with RAML and OAS</h2>
        <span slot="image" class="icon raml-icon">${ramlR}</span>
        <div>
          <p>
            Use RAML or OAS to document your APIs and read the documentation in ARC with
            <a href="https://github.com/mulesoft/api-console" target="_blank">API Console</a>.
          </p>
          <p>
            Use API request editor with prefilled request data generated from API examples and try the API in seconds.
          </p>
          <p>
            RAML documentation viewer is a part of the Mulesoft's API Console open source project.
          </p>
          <p>
            Learn more about <a href="https://raml.org/" target="_blank">RAML</a>
            and <a href="https://github.com/OAI/OpenAPI-Specification" target="_blank">OAS</a>
          </p>
        </div>
      </onboarding-page>
      <onboarding-page withimage>
        <h2 slot="title">Hosts rules</h2>
        <span slot="image" class="icon">${code}</span>
        <anypoint-button
          slot="image"
          @click="${this._followLink}"
          data-href="https://github.com/advanced-rest-client/arc-electron/wiki/Host-rules"
          emphasis="high"
        >
          Learn more
        </anypoint-button>
        <p>
          Create host rules to redirect traffic from one host to another.
        </p>
        <p>
          No need to edit your "hosts" file anymore. You don't need administrator privileges to apply host rules.
        </p>
        <p>
          It is useful to debug virtual hosts configuration of your server, even when developping locally.
        </p>
      </onboarding-page>
      <onboarding-page withimage>
        <h2 slot="title">Session management</h2>
        <span slot="image" class="icon">${accountCircle}</span>
        <anypoint-button
          slot="image"
          @click="${this._followLink}"
          data-href="https://medium.com/@jarrodek/authenticating-to-a-web-service-cookies-session-in-advanced-rest-client-6293a869c9ac"
          emphasis="high">Learn more</anypoint-button>
        <p>
          Log in to a web service using build in web browser.
        </p>
        <p>
          Cookies are automatically applied to the request as the browser would do it.
        </p>
        <p>
          Manage session cookies in Request &gt; Web session menu.
        </p>
      </onboarding-page>
      <onboarding-page withimage>
        <h2 slot="title">Privacy</h2>
        <span slot="image" class="icon">${shield}</span>
        <anypoint-button
          slot="image"
          @click="${this._followLink}"
          data-href="https://docs.google.com/document/d/1BzrKQ0NxFXuDIe2zMA-0SZBNU0P46MHr4GftZmoLUQU/edit"
          raised="high">Read full privacy policy</anypoint-button>
        <div>
          <p>
            Protecting your data and your trust is always our first priority.
            The application never shares <b>any</b> data until you request or allow it.
          </p>
          <p>
            To provide better quality the app is collecting anonymous usage statistics.
          </p>
          <p>Data the app is using and how:</p>
          <ul>
            <li>
              Any access tokens provided by you or generated by the app are stored
              in local history along with the request.
            </li>
            <li>Google Drive file ID of opened by the app file is stored in the local history.</li>
            <li>
              (Chrome app only) You settings are synced between your profiles,
              if you are signed in to Chrome, using Google Sync service for Chrome Apps.
            </li>
            <li>
              The app collects critical errors generated by the app and send them to Google Analytics.
              Data included in the report contains information about the exception itself (error message)
              and intentionally will not collect any user or user provided data.
            </li>
          </ul>
          <p>
            You can turn off Google Analytics and local history in application settings.
          </p>
        </div>
      </onboarding-page>
    </onboarding-tutorial>
`;
  }

  static get properties() {
    return {
      // True if the tutorial is being rendered.
      opened: { type: Boolean }
    };
  }

  _followLink(e) {
    if (e.target.dataset.href) {
      return window.open(e.target.dataset.href);
    }
  }

  _closedHandler() {
    this.opened = false;
  }
}
