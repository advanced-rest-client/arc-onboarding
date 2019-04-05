[![Published on NPM](https://img.shields.io/npm/v/@advanced-rest-client/arc-onboarding.svg)](https://www.npmjs.com/package/@advanced-rest-client/arc-onboarding)

[![Build Status](https://travis-ci.org/advanced-rest-client/arc-onboarding.svg?branch=stage)](https://travis-ci.org/advanced-rest-client/arc-onboarding)

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/advanced-rest-client/arc-onboarding)


# arc-onboarding

Onboarding tutorial for the ARC.

## Example:

```html
<arc-onboarding></arc-onboarding>
```

## API components

This components is a part of [API components ecosystem](https://elements.advancedrestclient.com/)

## Usage

### Installation
```
npm install --save @advanced-rest-client/arc-onboarding
```

### In an html file

```html
<html>
  <head>
    <script type="module">
      import './node_modules/@advanced-rest-client/arc-onboarding/arc-onboarding.js';
    </script>
  </head>
  <body>
    <arc-onboarding></arc-onboarding>
  </body>
</html>
```

### In a Polymer 3 element

```js
import {PolymerElement, html} from './node_modules/@polymer/polymer/polymer-element.js';
import './node_modules/@advanced-rest-client/arc-onboarding/arc-onboarding.js';

class SampleElement extends PolymerElement {
  static get template() {
    return html`
    <arc-onboarding></arc-onboarding>
    `;
  }
}
customElements.define('sample-element', SampleElement);
```

### Installation

```sh
git clone https://github.com/advanced-rest-client/arc-onboarding
cd api-url-editor
npm install
npm install -g polymer-cli
```

### Running the demo locally

```sh
polymer serve --npm
open http://127.0.0.1:<port>/demo/
```

### Running the tests
```sh
polymer test --npm
```
