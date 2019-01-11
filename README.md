# Oreon Autocomplete Demo

User autocomplete component that can be used together with an input element. 
Typically this would be used together with inputs used as comments.

This repository contains the source code for both the demo application as well as the autocomplete component itself.  
The autocomplete component's source code can be found under `projects/oreon-autocomplete`

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

## Deployed version

This application is deployed at https://autocomplete.oreon.io 

## Building/running the demo project locally

- Clone the demo project
- Install the dependencies by running `npm install` or `yarn install`
- Run the project by running `npm start` or `yarn start`
- Run the tests by running `npm run test` or `yarn test`
- Build the app by running `npm run build` or `yarn build`

 
