[![Published on NPM](https://img.shields.io/npm/v/@advanced-rest-client/arc-onboarding.svg)](https://www.npmjs.com/package/@advanced-rest-client/arc-onboarding)

[![Build Status](https://travis-ci.org/advanced-rest-client/arc-onboarding.svg?branch=stage)](https://travis-ci.org/advanced-rest-client/arc-onboarding)

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/advanced-rest-client/arc-onboarding)


# arc-onboarding

On-boarding tutorial for Advanced REST Client.

## Usage

### Installation
```
npm install --save @advanced-rest-client/arc-onboarding
```

### In a LitELement template

```javascript
import { LitElement, html } from 'lit-element';
import '@advanced-rest-client/arc-onboarding/arc-onboarding.js';

class SampleElement extends LitElement {
  render() {
    return html`
    <arc-onboarding opened @tutorial-close="${this._closeHandler}"></arc-onboarding>
    `;
  }

  _closeHandler() {
    localStorage.setItem('tutorial-passed', 'true');
  }
}
customElements.define('sample-element', SampleElement);
```

### Running the tutorial

The application should store the information when the tutorial was passed and skip
initialization when the user finished it. Handle the `tutorial-close` event to
set flag in the store.
This event is not dispatched when the user cancelled the dialog (ESC key for example).

## Development

```sh
git clone https://github.com/advanced-rest-client/arc-onboarding
cd arc-onboarding
npm i
```

### Running the demo locally

```sh
npm start
```

### Running the tests
```sh
npm test
```
