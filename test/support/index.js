/* --------------------
 * srt-cut
 * Tests utilities
 * ------------------*/

'use strict';

/*
 * Throw any unhandled promise rejections
 */
process.on('unhandledRejection', (err) => {
	throw err;
});
