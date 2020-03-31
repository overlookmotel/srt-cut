/* --------------------
 * srt-cut module
 * Tests
 * ------------------*/

'use strict';

// Modules
const srtCut = require('../index.js');

// Init
require('./support/index.js');

// Tests

describe('tests', () => {
	it.skip('all', () => { // eslint-disable-line jest/no-disabled-tests
		expect(srtCut).not.toBeUndefined();
	});
});
