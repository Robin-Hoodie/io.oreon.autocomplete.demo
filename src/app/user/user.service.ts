import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'oreon-autocomplete';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    return <Observable<User[]>> this.httpClient.get('assets/UserData.json');
  }

}
