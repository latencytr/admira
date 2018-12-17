import Raven from "raven-js";

function init() {
  Raven.config("https://d30bfaaf89fc49858975bdeb029f052e@sentry.io/1352682", {
    release: "1-0-0",
    environment: "development-test"
  }).install();
}

function log(error) {
  Raven.captureException(error);
}

export default {
  init,
  log
};
