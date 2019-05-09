/* --------------------
 * srt-cut module
 * ------------------*/

'use strict';

// Modules
const subtitle = require('subtitle'),
	fs = require('fs-extra');

// Exports
/**
 * @param {string} path - Path to SRT file
 * @param {Array<Object>} parts - Array specifying how to cut SRT
 * @param {Object} [options] - Options object
 * @param {number} [options.frameRate=25] - Input frame rate
 * @returns {Promise<undefined>}
 */
module.exports = async function srtCut(path, parts, options) {
	// Validate arguments
	if (typeof path !== 'string') throw new Error('Path must be a string');
	if (!Array.isArray(parts)) throw new Error('Parts must be an array');

	// Get frame rate
	const frameRate = (options ? options.frameRate : null) || 25;

	// Conform parts array
	parts = parts.map(({path, start}, index) => { // eslint-disable-line no-shadow
		if (typeof path !== 'string') throw new Error(`path must be provided as string for each output - was not for index ${index}`);
		if (!start) throw new Error(`start must be provided for all outputs - was not for index ${index}`);
		start = timecodeToMs(start, frameRate);

		return {path, start, subs: []};
	});

	// eslint-disable-next-line no-nested-ternary
	parts.sort(({start: s1}, {start: s2}) => (s1 > s2 ? 1 : s2 < s1 ? -1 : 0));

	// Load input and parse
	const txt = await fs.readFile(path, 'utf8');
	const subs = subtitle.parse(txt);

	// Split into parts
	const lastPartIndex = parts.length - 1;
	let partSubs = null,
		partIndex = -1,
		partStart = 0,
		partEnd = parts[0].start;

	for (const sub of subs) {
		const {start} = sub;
		if (start >= partEnd) {
			partIndex++;
			partSubs = parts[partIndex].subs;
			partStart = partEnd;
			partEnd = partIndex === lastPartIndex ? Infinity : parts[partIndex + 1].start;
		}

		sub.start -= partStart;
		sub.end -= partStart;

		partSubs.push(sub);
	}

	// Write out files
	for (const part of parts) {
		// Convert to SRT file
		const txtOut = subtitle.stringify(part.subs);
		await fs.writeFile(part.path, txtOut);
	}
};

/*
 * Convert timecode string to milliseconds.
 * Numbers are passed unchanged.
 * Handles both SRT-style timecode or SMTPE timecode.
 */
function timecodeToMs(tc, frameRate) {
	if (typeof tc === 'number') return tc;
	if (typeof tc !== 'string') throw new Error(`Invalid timecode ${tc}`);

	// Convert SMTPE timecode to SRT-style timecode
	const match = tc.match(/^(\d\d:\d\d:\d\d):(\d\d)$/);
	if (match) {
		let ms = `${Math.floor(match[2] * 1 / frameRate * 1000)}`;
		while (ms.length < 3) ms = `${ms}0`;
		tc = `${match[1]},${ms}`;
	}

	return subtitle.toMS(tc);
}
