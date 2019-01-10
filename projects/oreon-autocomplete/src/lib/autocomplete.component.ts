import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { User } from './model/User';

@Component({
  selector: 'oreon-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnChanges {

  /* Users to search through */
  @Input()
  users: User[];
  /* Comment to filter users by */
  @Input()
  comment: string;
  /* HTML element that should be autocompleted */
  @Input()
  commentElement: HTMLInputElement;
  filteredUsers: User[] = [];
  private searchTermRegex = /(?<=@)\w*$/;
  private MAX_USERS_TO_SHOW = 5;

  constructor() {
  }

  /*
   * Filter users by @searchTerrmRegex, looking for a match in either the user's name or username, ignoring whitspaces in the name
   * If searchTerm is only '@', so when the user starts mentioning a user, show the first @MAX_USERS_TO_SHOW users
   * If more than 5 matches, keep only the first @MAX_USERS_TO_SHOW matches
   * If comment is falsy, or regex doesn't return any matches, reset filteredUsers to empty array
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['comment'] && changes['comment'].currentValue && this.users) {
      const regexMatch = this.searchTermRegex.exec(this.comment); // Extract searchTerm
      if (regexMatch != null) {
        let searchTerm: string = regexMatch[0];
        if (searchTerm === '@') {
          this.filteredUsers = this.users.slice(0, this.MAX_USERS_TO_SHOW);
        } else {
          searchTerm = searchTerm.toLowerCase();
          this.filteredUsers = this.users
            .filter(user => user.username.toLowerCase().startsWith(searchTerm) ||
              user.name.toLowerCase().replace(/\s/g, '').startsWith(searchTerm))
            .slice(0, this.MAX_USERS_TO_SHOW);
        }
      } else {
        this.filteredUsers = [];
      }
    } else {
      this.filteredUsers = [];
    }
  }


  /*
   * Add username to the input's value.
   * Always add username (keeping the '@' to signify username in comment)
   * as there is no way of knowing whether a user meant to search for a username or name
   * Focus the input element and reset the list of filteredUsers after adding the username to the input's value
   * Purposely not using Renderer2 as this app is solely meant for the browser platform
   */
  onClickOption(username: string): void {
    let inputValue = this.commentElement.value;
    inputValue = `${inputValue.replace(this.searchTermRegex, username)} `;
    this.commentElement.value = inputValue;
    this.commentElement.dispatchEvent(new Event('input')); // Trigger valueChanges on input's formControl
    this.commentElement.focus();
    this.filteredUsers = [];
  }

  trackByUsername(index, user) {
    return user.username;
  }

}
