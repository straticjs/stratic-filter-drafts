/*
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

'use strict';

var through2 = require('through2'),
    isNumber = require('lodash.isnumber'),
    isString = require('lodash.isstring');

module.exports = function() {
	var stream = through2.obj(function(file, enc, callback) {
		if (!file.data.draft
		    && file.data.time
		    && isNumber(file.data.time.epoch)
		    && isString(file.data.time.utcoffset)) {
			this.push(file);
		}

		callback();
	});

	return stream;
};
