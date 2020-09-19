import { Event, EventEmitter, Component, h } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {

  @Event() shareDialog: EventEmitter;
  @Event() copyData: EventEmitter;

  copybody: String;

  get_copyBody = ()=>{
    const getUrlQueries = window.location.search;
    const regex = /copybody=(.*)&/;
    let m;

    if(getUrlQueries){
      if ((m = regex.exec(getUrlQueries)) !== null) {
        return m[1];
      }
    }
    return '';
  }

  exec_copyData(){
    const el = document.querySelector('#textarea textarea') as HTMLInputElement;
    el.select();
    document.execCommand('copy');
  }

  share(e) {
    if(navigator.share){
        navigator
        .share({
            title: document.title,
            text: this.get_copyBody(),
            url: window.location.href
        })
        .then(() => console.log('Successful share! 🎉'))
        .catch(err => console.error(err));
    }
    this.shareDialog.emit(e);
  }

  componentWillLoad(){
    this.copybody = this.get_copyBody();    
    console.log(this.copybody)
  }

  render() {
    return [
      <ion-grid class="fill-first-row">
        <ion-row>
          <ion-col class="textarea-wrapper">
            <ion-textarea 
              id="textarea"
              autoGrow={true} 
              autofocus={true} 
              placeholder="Type something..." 
              value={this.get_copyBody()}></ion-textarea>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>

            <ion-button 
              onClick={(e) => this.share(e)}
              expand="full"
              color="light">
                <ion-icon name="send" class="rotate-90"></ion-icon>
                <p>Send</p>
            </ion-button>

            <hr color="light"></hr>

            <ion-button 
              onClick={(e) => this.exec_copyData()}
              expand="full"
              color="light"
              disabled={!this.copybody}>
                <ion-icon name="copy"></ion-icon>
                <p>Copy</p>
            </ion-button>

            <ion-button 
              expand="full"
              fill="clear">
                <ion-icon name="timer"></ion-icon>
                <p>History</p>
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>,
    ];
  }
}
