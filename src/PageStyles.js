import { css } from 'lit-element';

export default css`
:host {
  overflow: auto;
  display: flex;
  flex-direction: column;
  flex: 1;
  font-size: 20px;
  color: var(--arc-onboarding-color, #000);
}

:host > ::slotted(:first-child) {
  margin-top: 24px;
}

:host > ::slotted(h2) {
  position: relative;
  margin: 0;
  padding: 24px;
  font-size: var(--arc-font-display1-font-size);
  font-weight: var(--arc-font-display1-font-weight);
  letter-spacing: var(--arc-font-display1-letter-spacing);
  line-height: var(--arc-font-display1-line-height);
}

.page {
  padding: 0 24px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  flex: 1;
}

.page > * {
  flex: 1;
}

:host([withimage]) .image {
  display: flex;
  flex-direction: column;
}

.image ::slotted(.icon) {
  fill: var(--onboarding-page-image-color, rgba(0, 0, 0, 0.57));
  width: 140px;
  height: 140px;
  margin-bottom: 40px;
}

.image {
  display: none;
  align-items: center;
  justify-content: center;
}

.info {
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
`;
