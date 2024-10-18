import http from 'k6/http';
import { sleep, check } from 'k6';

/**
 * options for the k6 test runner,
 * users can define the number of virtual users
 * the test duration, thresholds, etc.
 */
export const options = {
  vus: 100,
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(99)<1000']
  }
};

/**
 * k6's setup function that is executed once before the test
 * useful when getting auth tokens, etc.
 */
export function setup() {
  const loginResponse = http.get('http://localhost:3000/auth');
  check(loginResponse, {
    'auth successful': (response) => response.status === 200,
    'token received': (response) => !!response.json('token')
  });

  const token = loginResponse.json('token');
  return { token };
}

/**
 * the test itself, this logic is performed by each virtual users
 * information can be passed from setup to the test function
 */
export default function (setupData) {
  const headers = {
    Authorization: `${setupData.token}`
  };

  const response = http.get('http://localhost:3000/random', { headers });
  const receivedNumber = response.json().number;

  check(response, {
    'response status code should be 200': (response) => response.status === 200,
    "response body's number property's value should be between 1 and 10": (response) => receivedNumber >= 1 && receivedNumber <= 10
  });

  sleep(0.001);
}

// teardown function is also available, in case some test data needs to be deleted after testing, etc.
