/*\
title: $:/plugins/bramton/tw5-yyyymmdd/duntil.js
type: application/javascript
module-type: formatfilteroperator
\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/*
Export our filter function
*/
exports.duntil = function(source,operand,options) {
  let results = [];

  source(function(tiddler,title) {
    const parts = title.split("-");
    if (parts.length === 3) {
      const month = parseInt(parts[1], 10) - 1; // Month, zero based
      const day = parseInt(parts[2], 10); // Day of the month

      const lnow = new Date(); // Current LOCAL time

      // Work with UTC times to avoid Daylight Saving Time issues
      const now = new Date(Date.UTC(lnow.getFullYear(), lnow.getMonth(), lnow.getDate()));
      let target = new Date(Date.UTC(now.getUTCFullYear(), month, day));

      // Check if event already occured
      if (( target - now) < 0 ) {
        target.setUTCFullYear(target.getUTCFullYear() + 1);
      }

      const days_until = (target - now)/86400000;
      results.push( days_until.toString() );
    }
  });
  return results;
};

})();
