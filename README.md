<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Funn frontend</h3>

  <p align="center">
    Frontend for the Funn project, a project for IDATT2105 at NTNU.
    <br />
    ![pipeline status](https://gitlab.stud.idi.ntnu.no/ntcc/fullstack-frontend/badges/main/pipeline.svg)
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

This is a project task made for the course IDATT2105 at NTNU. This repository is for the frontend part of the task.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

To run this application you will need

- node version 16 or higher
- yarn

### Installation and running

1. Clone the repo
   ```sh
   git clone git@gitlab.stud.idi.ntnu.no:ntcc/fullstack-frontend.git
   ```
2. Change directory into the downloaded repo
   ```sh
   cd fullstack-frontend
   ```
3. Install all dependencies using yarn

   ```sh
   yarn
   ```

   note: all yarn dependencies can be found in the `package.json` file.

4. Running frontend locally
   ```sh
   yarn dev
   ```
   > No data appearing in the application after running? Make sure you also run the [backend](https://gitlab.stud.idi.ntnu.no/ntcc/fullstack-backend)

### Other commands

- `yarn build` - Compile and minify for production
- `yarn test:unit`- Run unit tests
- `yarn test:e2e` - Run cypress end to end tests
- `yarn test:e2e:dev` - Open and run cypress tests
- `yarn prettier` - Format source code
- `yarn api-generate` - Automatically generates models and service functions based on the locally running instance of the backend. Provided by OpenAPI and Swagger.

### Project structure

- [static](https://gitlab.stud.idi.ntnu.no/ntcc/fullstack-frontend/-/tree/main/static) - Static images
- [components](https://gitlab.stud.idi.ntnu.no/ntcc/fullstack-frontend/-/tree/main/src/components) - Reusable components that are used several places in the application
- [views](https://gitlab.stud.idi.ntnu.no/ntcc/fullstack-frontend/-/tree/main/src/views) - Pages in the application
- [locales](https://gitlab.stud.idi.ntnu.no/ntcc/fullstack-frontend/-/tree/main/src/components) - English and Norwegian translations. All text is added here and loaded dynamically in the application
- [API](https://gitlab.stud.idi.ntnu.no/ntcc/fullstack-frontend/-/tree/main/src/api) - Automatically generated API
- [store](https://gitlab.stud.idi.ntnu.no/ntcc/fullstack-frontend/-/tree/main/src/components) - Global state handled by Pinia
- [tests](https://gitlab.stud.idi.ntnu.no/ntcc/fullstack-frontend/-/tree/main/cypress/e2e) - End to end tests
- [router](https://gitlab.stud.idi.ntnu.no/ntcc/fullstack-frontend/-/tree/main/src/router) - Router
- [enums](https://gitlab.stud.idi.ntnu.no/ntcc/fullstack-frontend/-/tree/main/src/enums) - Typescript enums
- [types](https://gitlab.stud.idi.ntnu.no/ntcc/fullstack-frontend/-/tree/main/src/enums) - Typescript types

### Technologies used

- Vue 3: JavaScript Framework
- Vite: Build tool
- Vitest: Unit testing
- TypeScript: JavaScript, but with types
- Pinia: Global state handling
- Axios: Sending http requests
- OpenAPI: Generating typescript models and services based on locally running instance of the backend
- Vue Router: Routing
- Prettier: Formatting
- Cypress: End to end testing
- Leaflet: Interactive map

And some minor things that can be found in the `package.json` file.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

Some issues are marked with the `further-work` label. These are features we would have liked to include in the final project, but were not implemented due to time constraits. Some features may also require changes in the [backend](https://gitlab.stud.idi.ntnu.no/ntcc/fullstack-backend).

Some issues are marked with the `known-bug` label. These are bugs we have identified and are yet to fix.

See the [open issues](https://gitlab.stud.idi.ntnu.no/ntcc/fullstack-frontend/-/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
2. Commit your Changes (`git commit -m 'Add some AmazingFeature'`). Remember to run `yarn prettier` to format the code.
3. Push to the Branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Testing -->

## Testing

We have had a lot of pain and issues with Vitest (issues include mounting, stores, and other pains that we did not seem to have with cypress), we have opted to rather use cypress tests, and testing components and integration with these tests instead.

<!-- Known Faults -->

## Known Faults

### E2E Running

Some Systems have issuse with running e2e test, a workaround for this is to run `yarn vite dev --port 4173` and in another terminal run `yarn cypress open --e2e`

### Runners in pipeline

The runners on the pipeline sometimes fails without a known reason. For this, i recommend re-running the tests.

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- CONTACT -->

## Contact

Nicolai H. Brand - nicolahb@stud.ntnu.no
Callum Gran - callumg@stud.ntnu.no
Carl Gützkow - carljgu@stud.ntnu.no
Thomas H. Svendal - thosve@stud.ntnu.no

Frontend repo Link: [frontend](https://gitlab.stud.idi.ntnu.no/ntcc/fullstack-frontend)

Backend repo Link: [backend](https://gitlab.stud.idi.ntnu.no/ntcc/fullstack-backend)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
