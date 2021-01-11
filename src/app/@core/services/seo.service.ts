import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable()
export class SeoService {
  // readonly siteTitle = environment.appName;
  readonly siteTitle = 'Taxi Deals';
  constructor(private title: Title, private meta: Meta) {}

  setTitle(title: string[]): SeoService {
    title.push(this.siteTitle);
    this.title.setTitle(title.join(' | '));
    return this;
  }

  setDescription(description: string): SeoService {
    this.meta.updateTag({
      name: 'description',
      content: description
    });
    return this;
  }
}
