import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  componentWillLoad()  {
    /* Switch theme based on user prefrence */

    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  
    toggleDarkTheme(prefersDark.matches);
  
    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addListener((mediaQuery) => toggleDarkTheme(mediaQuery.matches));
  
    // Add or remove the "dark" class based on if the media query matches
    function toggleDarkTheme(shouldAdd) {
      document.body.classList.toggle('dark', shouldAdd);
    }
  }

  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route url="/?" component="app-home" />
          <ion-route url="/:" component="app-home" />
          <ion-route url="/history/" component="app-clipboard-history" />
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
