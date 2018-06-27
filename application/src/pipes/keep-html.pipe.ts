import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'keepHtml', pure: false })
export class EscapeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }
  //safe render html for icon and image base64 usage and other
  transform(content) {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}