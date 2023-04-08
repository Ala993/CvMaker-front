// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: 'http://192.168.1.7:8080/',
  defaultLang: 'fr',
  defaultLangName: 'Français (France)',
  firebase: ({
    apiKey: "AIzaSyDF7Il36HpbFMMHBvcq0bfJZ4GINohiK7M",
    authDomain: "mmeetings-5a90f.firebaseapp.com",
    projectId: "mmeetings-5a90f",
    storageBucket: "mmeetings-5a90f.appspot.com",
    messagingSenderId: "239899806869",
    appId: "1:239899806869:web:c4cdbc4c4bc424e4bf5f9c",
    measurementId: "G-94MH3FZC55"
  })
};

