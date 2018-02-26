# `stratic-filter-drafts`

[Gulp][1] plugin to filter out [Stratic][2] posts that are drafts

## Installation

    npm install stratic-filter-drafts

## Usage

Put this somewhere in a Gulp pipeline of Vinyl file objects to filter out posts that are drafts.

Files are considered drafts if they meet any of these conditions:

1. `file.data.draft` exists and is truthy
2. `file.data.time` doesn't exist
3. `file.data.time.epoch` doesn't exist or isn't a number
4. `file.dta.time.utcoffset` doesn't exist or isn't a string

You probably want to put this as early as possible in the pipeline (ideally right after metadata is extracted) to avoid doing unnecessary work on files that are just going to be dropped later. See below for examples on where to put this.

## Example

Minimal example:

```js
var gulp = require('gulp');
var frontMatter = require('gulp-grey-matter');
var straticFilterDrafts = require('stratic-filter-drafts');
var straticDateInPath = require('stratic-date-in-path');

gulp.task('posts', function() {
	return gulp.src('*.md')
	           .pipe(frontMatter())
	           .pipe(straticFilterDrafts());
});
```

Full example:

```js
var gulp = require('gulp');
var remark = require('gulp-remark');
var remarkHtml = require('remark-html');
var frontMatter = require('gulp-grey-matter');
var straticFilterDrafts = require('stratic-filter-drafts');
var addsrc = require('gulp-add-src');
var pug = require('gulp-pug');
var straticDateInPath = require('stratic-date-in-path');

gulp.task('posts', function() {
	return gulp.src('*.md')
	           .pipe(frontMatter())
	           .pipe(straticFilterDrafts())
	           .pipe(remark().use(remarkHtml))
	           .pipe(straticDateInPath())
	           .pipe(addsrc('src/blog/post.pug'))
	           .pipe(attachToTemplate('post.pug'))
	           .pipe(pug({basedir: __dirname}))
	           .pipe(rename({ extname: '.html' }))
	           .pipe(gulp.dest('dist'));
});
```

## Draft examples

All of these posts will be considered drafts.

```md
---
title: "Example post 1"
time:
  epoch: 1494649337
  utcoffset: UTC-0
author: "Jane Doe"
categories:
  - example
draft: true
---

Example post that's a draft because `file.data.draft` is set to something truthy (`true`).
```

```md
---
title: "Example post 2"
time:
  epoch:
  utcoffset:
author: "Jane Doe"
categories:
  - example
---

Example post that's a draft both because `file.data.time.epoch` is undefined and because `file.data.time.utcoffset` is undefined.
```

```md
---
title: "Example post 3"
author: "Jane Doe"
categories:
  - example
---

Example post that's a draft because `file.data.time` is missing entirely.
```

## Code of Conduct

Please note that StraticJS is developed under the [Contributor Covenant][3] Code of Conduct. Project contributors are expected to respect these terms.

For the full Code of Conduct, see [CODE_OF_CONDUCT.md][4]. Violations may be reported to <alex@strugee.net>.

## License

LGPL 3.0+

## Author

AJ Jordan <alex@strugee.net>

 [1]: http://gulpjs.com/
 [2]: https://github.com/strugee/generator-stratic
 [3]: http://contributor-covenant.org/
 [4]: https://github.com/straticjs/stratic-filter-drafts/blob/master/CODE_OF_CONDUCT.md

