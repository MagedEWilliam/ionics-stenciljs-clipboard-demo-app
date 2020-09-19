import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {

  render() {
    return [
      <ion-grid class="fill-first-row">
        <ion-row>
          <ion-col class="textarea-wrapper">
            <ion-textarea autoGrow={true} autofocus={true} placeholder="Type something..."></ion-textarea>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-button 
              expand="full"
              color="light">
                <ion-icon name="send"></ion-icon>
                <p>Send</p>
            </ion-button>

            <ion-button 
              expand="full"
              color="light">
                <ion-icon name="copy"></ion-icon>
                <p>Copy</p>
            </ion-button>

            <ion-button 
              expand="full"
              color="light">
                <ion-icon name="timer"></ion-icon>
                <p>History</p>
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>,
    ];
  }
}
