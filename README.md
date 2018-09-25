# Core Scaling UI

This repository contains the source code for the Core Scaling UI.

## Developing the UI

* Start the Qlik Associative Engine in a Docker container.
  Note that before you deploy, you need to set the `ACCEPT_EULA` environment variable,
  otherwise the Qlik Associative Engine won't start.

  ```bash
  ACCEPT_EULA=yes docker-compose up -d
  ```

* Install dependencies:
  ```bash
  npm install
  ```
* Run the application:
  ```bash
  npm run start
  ```
* Open a browser and navigate to [http://localhost:8080](http://localhost:8080) to view the UI.

## The data

The data used in the UI is from [The World Bank Open Data](https://data.worldbank.org/) and [UN Data](http://data.un.org).
World Development Indicators: Urban Population, Rural population and Population, total, Life expectancy at birth, total (years), Access to electricity, rural (% of rural population), GDP per capita, PPP (constant 2011 international $), Births attended by skilled health staff (% of total), Land area (sq. km), Population using improved drinking-water sources (%).
Also State of the World´s cities 2006/7. United Nations Human Settlements Programme. London:Earthscan Publications;2006
