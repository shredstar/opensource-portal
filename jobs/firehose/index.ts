//
// Copyright (c) Microsoft.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
//

/*eslint no-console: ["error", { allow: ["log"] }] */

'use strict';

import moment from 'moment';

// To skip this WebJob, setting WEBJOB_REPOS_FIREHOSE_SKIP should be set to '1'
if (process.env.WEBJOB_REPOS_FIREHOSE_SKIP == '1' /* loose */) {
  console.log('Firehose job is configured to skip execution.');
  process.exit(0);
}

if (!process.env.DEBUG) {
  process.env.DEBUG = 'redis,restapi,querycache';
}

const started = moment().utc();
const startedString = started.format();

const painlessConfigResolver = require('painless-config-resolver')();

painlessConfigResolver.resolve((configurationError, config) => {
  if (configurationError) {
    throw configurationError;
  }
  require('./task')(started, startedString, config);
});
