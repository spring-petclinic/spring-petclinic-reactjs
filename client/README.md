# React Frontend for Spring Boot PetClinic demo

## Install and run

Note: Spring Boot App must be running before starting the client

1. `npm install` (installs the node modules, the TS definition files and builds the CSS files)
2. `run.sh` 
3. Open `http://localhost:4444`


## Static CSS generation

I have taken the LESS files nearly unmodified from the original demo project (only the import of bootstrap differs due to different folder structure). 
Since the styles doesn't change here, they are not included in the React App (using `require('styles.css')` or similiar) but are only built once using
the npm command `npm run build:styles`. That builds the CSS files from the LESS sources and puts the resulting file in `public/dist/petclinic.css`. The
`index.html`-page includes this file. 
Advantage: slightly faster application build when the app is re-built (during development)
Disadvantage: No hot reloading/rebuild for styles.

If styles were under active development it's better to include them in the app build (`webpack.config.js`).

