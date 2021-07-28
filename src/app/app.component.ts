import { Component } from '@angular/core';
import { LanguageSwitcherService } from 'my-beautifull-intl';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng12';

  public constructor(
    private _languageSwitcher: LanguageSwitcherService
  ) {}

  public language(language: string): void {
    this._languageSwitcher.language = language;
  }
}
