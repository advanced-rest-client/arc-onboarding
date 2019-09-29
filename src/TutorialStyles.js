import { css } from 'lit-element';

export default css`
:host {
  display: flex;
  flex-direction: column;

  margin: 24px 40px;
  -webkit-overflow-scrolling: touch;
  background: var(--anypoint-dialog-background-color, #fff);
  color: var(--arc-onboarding-color, #000);
  box-shadow: var(--box-shadow-16dp);

  width: 800px;
  height: 600px;
}

.content {
  flex: 1;
  overflow: auto;
}

.actions {
  position: relative;
  padding: 8px 8px 8px 24px;
  margin: 0;
  color: var(--anypoint-dialog-button-color, --primary-color);
  background: var(--anypoint-dialog-background-color, --primary-background-color);
  flex-direction: row;
  display: flex;
}

.flex {
  flex: 1;
}

.action-button {
  height: 40px;
}

:host ::slotted([hidden]) {
  display: none !important;
}

:host ::slotted(*) {
  height: 100%;
}

@media (max-width: 600px) {
  :host .actions {
    flex-direction: column;
    align-items: center;
    display: flex;
  }
}
`;
