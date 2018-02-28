import { Component, OnInit } from '@angular/core';  
import { Router, NavigationEnd } from '@angular/router';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry
    .addSvgIcon('camera',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/images/icon-camera.svg'))
      .addSvgIcon("alert",sanitizer.bypassSecurityTrustResourceUrl('/assets/images/icon-alert.svg'));
  }

  ngOnInit(){
        this.router.events.subscribe((evt) => {
          if (!(evt instanceof NavigationEnd)) {
            return;
          }
          window.scrollTo(0, 0)
        });
      }
}
