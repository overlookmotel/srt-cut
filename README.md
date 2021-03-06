[![NPM version](https://img.shields.io/npm/v/srt-cut.svg)](https://www.npmjs.com/package/srt-cut)
[![Build Status](https://img.shields.io/travis/overlookmotel/srt-cut/master.svg)](http://travis-ci.org/overlookmotel/srt-cut)
[![Dependency Status](https://img.shields.io/david/overlookmotel/srt-cut.svg)](https://david-dm.org/overlookmotel/srt-cut)
[![Dev dependency Status](https://img.shields.io/david/dev/overlookmotel/srt-cut.svg)](https://david-dm.org/overlookmotel/srt-cut)
[![Greenkeeper badge](https://badges.greenkeeper.io/overlookmotel/srt-cut.svg)](https://greenkeeper.io/)
[![Coverage Status](https://img.shields.io/coveralls/overlookmotel/srt-cut/master.svg)](https://coveralls.io/r/overlookmotel/srt-cut)

# Cut up SRT subtitle file into parts

## Usage

### ```srtCut(path, outputs [, options])```

Provide an existing SRT subtitle file and array of cut points. The SRT file will be cut up into several new SRT files.

Timecodes in output files will be relative to the start point of each file.

```js
const srtCut = require('srt-cut');

await srtCut(
  '/path/to/input/subtitle/file.srt',
  [
    {
      start: '00:00:00:00',
      path: '/path/to/1st/output.srt'
    },
    {
      start: '00:04:40:00',
      path: '/path/to/2nd/output.srt'
    },
    {
      start: '00:12:10:00',
      path: '/path/to/3rd/output.srt'
    }
  ],
  {
    frameRate: 25
  }
);
```

`start` can be provided as integer (milliseconds), or timecode in either SMTPE format (`00:00:00:00`) or SRT-style format (`00:00:00,000`).

Options object is optional. `options.frameRate` defaults to `25`. Frame rate is only used if using SMTPE timecode to specify cut points.

## Versioning

This module follows [semver](https://semver.org/). Breaking changes will only be made in major version updates.

All active NodeJS release lines are supported (v10+ at time of writing). After a release line of NodeJS reaches end of life according to [Node's LTS schedule](https://nodejs.org/en/about/releases/), support for that version of Node may be dropped at any time, and this will not be considered a breaking change. Dropping support for a Node version will be made in a minor version update (e.g. 1.2.0 to 1.3.0). If you are using a Node version which is approaching end of life, pin your dependency of this module to patch updates only using tilde (`~`) e.g. `~1.2.3` to avoid breakages.

## Tests

There are no tests at present. But it works fine!

Use `npm test` to run the tests. Use `npm run cover` to check coverage.

## Changelog

See [changelog.md](https://github.com/overlookmotel/srt-cut/blob/master/changelog.md)

## Issues

If you discover a bug, please raise an issue on Github. https://github.com/overlookmotel/srt-cut/issues

## Contribution

Pull requests are very welcome. Please:

* ensure all tests pass before submitting PR
* add tests for new features
* document new functionality/API additions in README
