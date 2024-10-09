import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {KeycloakService} from "../../../../services/keycloak/keycloak.service";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import {Notification} from "./notification";
import {ToastrService} from "ngx-toastr";
import {NgForOf} from "@angular/common";


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit{

  socketClient: any = null;
  private notificationSubscription: any;
  unreadNotificationsCount: number = 0;
  notifications: Notification[] = [];

  constructor(
    private keycloakService: KeycloakService,
    private toastrService: ToastrService,
  ) {}

  ngOnInit() {
    this.navigationHandler();

    if (this.keycloakService.keycloak.tokenParsed?.sub) {
      let websocket = new SockJS('http://localhost:8082/api/v1/websocket');
      this.socketClient = Stomp.over(websocket);
      this.socketClient.connect(
        {'Authorization': 'Bearer ' + this.keycloakService.keycloak?.token},
        () => {
          this.notificationSubscription = this.socketClient.subscribe(
            `/user/${this.keycloakService.keycloak.tokenParsed?.sub}/notification`,
            (message: any) => {
              //console.log('Receiving notification', message);
              const notification: Notification = JSON.parse(message.body);

              if (notification) {
                this.notifications.unshift(notification);

                switch (notification.status) {
                  case 'BORROWED':
                    this.toastrService.info(notification.message, notification.bookTitle);
                    break;
                  case 'RETURNED':
                    this.toastrService.warning(notification.message, notification.bookTitle);
                    break;
                  case 'RETURN_APPROVED':
                    this.toastrService.success(notification.message, notification.bookTitle);
                    break;
                }
                this.unreadNotificationsCount++;
              }
            }
          );
        }
      );
    }
  }

  private navigationHandler() {
    const linkColor = document.querySelectorAll('.nav-link');
    linkColor.forEach(link => {
      if (window.location.href.endsWith(link.getAttribute('href') || '')) {
        link.classList.add('active');
      }
      link.addEventListener('click', () => {
        linkColor.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
  }

  async logout() {
    /*localStorage.removeItem('token');
    window.location.reload();*/
    await this.keycloakService.logout();
  }

  get username(): string {
    // @ts-ignore
    return this.keycloakService.keycloak?.tokenParsed.given_name;
  }
}
