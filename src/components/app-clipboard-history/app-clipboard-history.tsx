import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-clipboard-history',
  styleUrl: 'app-clipboard-history.css',
})
export class AppClipboardHistory {

  render() {
    return [
      <ion-header>
        <ion-toolbar color="light">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/" />
          </ion-buttons>
          <ion-title>History</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
       
      </ion-content>,
    ];
  }
}
