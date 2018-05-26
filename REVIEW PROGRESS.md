OK  angular.json
OK  ngsw-config.json
OK  package.json

OK  src/
OK  index.html
OK  polyfills.ts (Include web-animation-js to support all browsers)

OK  src/app/
OK  app.component.css   (Keep minimal, finalized)
OK  app.component.html  (Keep minimal, finalized)
OK  app.component.ts    (Keep minimal, finalized)
OK  app.config.ts       (Keep minimal, finalized)
OK  app.module.ts       (Keep minimal, finalized)
OK  app.routes.ts       (Structure OK, keep expanding)
OK  global.state.ts

OK  src/app/_private
OK  about
OK  home
OK  main
OK   policy
OK  profile
OK  setting
OK  themes

OK  src/app/_public
OK  401
OK  403
OK  404
OK  500
OK  forgot
-   landing             TODO: Restructure for standard app landing page
OK  lockscreen
OK  login
OK  register

OK  src/app/_system/
OK  app.translation
OK  nga.module

OK  src/app/_system/base
OK  base.component.ts           {Minimal base component}

OK  src/app/_system/_layouts
OK  doubleNavsLayout            {Standardized, minimal}
OK  landingLayout               {Standardized, minimal - due to no any setup, child components need to import AppTranslationModule}

OK  src/app/_systems/_static
OK  countries
OK  currencies
OK  timezones
OK  fontAwesome
OK  materialIcons

OK  src/app/_systems/_directives
OK  debounceClick
OK  disableControl

OK  src/app/_systems/_pipes

OK  src/app/_system/services/
OK  apiResultHandlingService    {To handle API results}
OK  auth.guard                  {Middleware, to check user authenticity}
OK  authentication              {To authenticate user}
OK  help                        {To serve help content}
OK  httpClient                  {To handle HTTP request}
OK  language                    {To handle language for app}
OK  loader                      {To handle infinite loading when interacting with server}
OK  localStorage                {To manage data persistency in local storage}
OK  menu                        {To serve menu content for sidebar}
OK  navigation                  {To handle app navigation}
OK  security                    {To manage sensitive data of app}
OK  tcode.guard                 {Middleware, to check user has Tcode}
OK  tcode                       {To manipulate tcode}
OK  user                        {To manage user once login, logout}

OK  src/app/_systems/_validators
OK  email
OK  equalPasswords
