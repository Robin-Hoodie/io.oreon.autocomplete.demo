# Oreon Autocomplete

This user autocomplete component can be used together with an input element. 
Typically this would be used together with inputs used as comments.

# Usage

Follow the instructions below, start typing, 
and as soon as you hit the `@` a list of users will appear from which you can autocomplete by clicking on the relevant user

The autocomplete component can be used as follows:
```
  <oreon-autocomplete [users]="users$ | async"
                      [inputValue]="comment"
                      [inputElement]="commentElement">
  </oreon-autocomplete>
```


- `users` is an array of objects that should have the following properties
  - `username` 
  - `name` 
  - `avatar_url`
  
  A model interface `User` is exposed that has these properties defined
- `inputValue` is the value of the comment `<input>` element
- `inputElement` is a reference to the comment `<input>` element itself

## Installation

Install it by running `npm install oreon-autocomplete` or `yarn add oreon-autocomplete`

## Tests

Tests can be run by cloning the demo project and running `ng test oreon-autocomplete` 
