import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

import {Message} from '../models/message';
import {User} from '../models/user';

const SERVER_URL = 'http://localhost:3000/my-namespace';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;

  public constructor() {
  }

  public initConnect() {
    console.log('initConnect');
    this.socket = io(SERVER_URL);

  }

  public send(message: Message): void {
    this.socket.emit('message', message);
  }

  public join(user: User): void {
    this.socket.emit('new-member', user);
  }

  public onMessage(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on('message', (data: Message) => observer.next(data));
    });
  }

  public onEvent(event: Event): Observable<any> {
    return new Observable<User>(observer => {
      this.socket.on(event, (user: User) => observer.next(user));
    });
  }

  public onNewMember(): Observable<User> {
    return new Observable<User>(observer => {
      this.socket.on('new-member', (user: User) => observer.next(user));
    });
  }

  public onOnlineUsers(): Observable<User[]> {
    return new Observable<User[]>(observer => {
      this.socket.on('online-users', (users: User[]) => observer.next(users));
    });
  }


}
