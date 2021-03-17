import { Event, EventEmitter, Component, h } from '@stencil/core';
import { toastController } from '@ionic/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {

  @Event() shareDialog: EventEmitter;
  @Event() copyData: EventEmitter;
  @Event() changeURL: EventEmitter;

  copybody: String;

  get_copyBody = ()=> {
    const getUrlQueries = window.location.search;
    const regex = /\?copybody=(.*)/;
    let m;

    if(getUrlQueries){
      if ((m = regex.exec(getUrlQueries)) !== null) {
        return decodeURIComponent(decodeURIComponent(m[1]));
      }
    }
    return '';
  }

  async presentToast(msg) {
    const toast = await toastController.create({
      message: msg,
      duration: 1500
    });
    toast.present();
  }

  exec_copyData (){
    const el = document.querySelector('#textarea textarea') as HTMLInputElement;
    el.select();
    document.execCommand('copy');
    this.presentToast('Copied.');
  }

  share(e) {
    if(navigator.share){
        navigator
        .share({
            title: document.title,
            text: this.get_copyBody(),
            url: window.location.href
        })
        .then(() => this.presentToast('Successful share! 🎉'))
        .catch(err => {
          this.presentToast('error');
          console.log(err)
        });
    }
    this.shareDialog.emit(e);
  }

  componentWillLoad(){
    this.copybody = this.get_copyBody();
    console.log(  this.copybody.toString() )
  }

  updateURL(e){
    if (history.pushState) {
      var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?copybody='+ encodeURIComponent(e.target.value);
      window.history.pushState({path:newurl},'',newurl);
    }
  }

  render() {
    return [
      <ion-grid class="fill-first-row">
        <ion-row>
          <ion-col class="textarea-wrapper">
            <ion-textarea 
              id="textarea"
              onIonChange={(e) => this.updateURL(e)}
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
              onClick={() => this.exec_copyData()}
              expand="full"
              color="light"
              disabled={!this.copybody}>
                <ion-icon name="copy"></ion-icon>
                <p>Copy</p>
            </ion-button>

            {/* 
            <ion-button 
              href="/history/"
              expand="full"
              fill="clear">
                <ion-icon name="timer-outline"></ion-icon>
                <p>History</p>
            </ion-button> */}
          </ion-col>
        </ion-row>
      </ion-grid>,
    ];
  }
}
