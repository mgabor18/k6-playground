# K6 Load Testing Playground

This repository contains a simple Express-based API that returns a random number between 1 and 10, along with a load testing setup using the [K6 load testing tool](https://k6.io/). The purpose of this project is to demonstrate basic functionalities of k6 and how to perform load testing with this tool.

## Prerequisites

1. [Node.js and NPM](https://nodejs.org/)
   You need to have Node.js and npm installed on your system. You can download and install them from [here](https://nodejs.org/).

2. [K6 load testing tool](https://k6.io/)
   The K6 tool is required to run the load tests. You can install it globally by running:

```bash
brew install k6 # for macOS (using Homebrew)
choco install k6 # for Windows (using Chocolatey)
sudo apt install k6 # for Ubuntu/Debian Linux
```

For more information, refer to the official [K6 installation guide](https://grafana.com/docs/k6/latest/set-up/install-k6/).

## Installation

Clone this repository:

```bash
git clone https://github.com/yourusername/k6-playground.git
cd k6-playground
```

Install dependencies:

```bash
npm install
```

## Authorization

The `/random` endpoint requires an authorization token. The token must be passed in the `Authorization` header as part of the request. If the token is missing or incorrect, the API will respond with a `401 Unauthorized` status.

To obtain the token, use the `/auth` endpoint.

## Running the API

To start the API, use the following command:

```bash
npm start
```

This will start the Express server on `http://localhost:3000`. The API has the following endpoint:

- GET `/random`: Returns a random number between 1 and 10.

Example response from `/random`:

```json
{
  "number": 7
}
```

- GET `/auth`: Returns a token that can be used for authentication in the `Authorization` header.

Example response from `/auth`:

```json
{
  "token": "secret"
}
```

## Load Testing the API with K6

A simple load testing script is provided in this repository to test the `/random` API. You can run the load test with the following command:

```bash
npm run test
```

This will execute the K6 script and simulate multiple users hitting the `/random` endpoint to test how the API performs under load.

## K6 Script

The K6 script is designed to send requests to the `/random` endpoint and measure the performance.
You can adjust the number of virtual users, duration, and other parameters as needed.

## Environment Variables for K6

If you want to customize the K6 run using environment variables (e.g., enabling the K6 web dashboard), you can set the following environment variables before running the test:

- `K6_WEB_DASHBOARD=true`: Enables the K6 web dashboard that can be used to observe the testing activity and it's results.
- `K6_WEB_DASHBOARD_EXPORT=reports/k6-report.html`: Specifies the filename to export the HTML report after the test run.

with the help of these environment variables, reports can be generated.

## Available Commands

`npm start`: Starts the Express API on http://localhost:3000.

`npm run test`: Runs the K6 load test on the `/random` endpoint.

`npm run test:report`: Runs the K6 load test on the `/random` endpoint and generate report.
