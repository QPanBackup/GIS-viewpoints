
function processCsv(data) {
  var start = new Date().getTime();
  /*
        Given a csv file as a big string blob, parse
        it by interpreting the first line as the title
        line, then the following lines as data rows
        which are comma separated. Return a dictionary
        which contains 'titles' and 'rows' keys.
   */
  var rows = data.trim().split('\n');
  var columns = [];
  var titles = rows.splice(0, 1)[0];
  titles = titles.split(',');

  var enums = titles.map(function() {
    return new Map();
  });

  // TODO: figure out how to parse files that have a bunch of unique strings.
  // Interning definitely does not work because of all the set math.
  // var maxUnique = 10;
  // var partialLists = [];

  var rowsFinal = [];
  for (let i = 0; i < rows.length;i++) {
    var rowFinal = [];

    var rowSplit = rows[i].split(',');
    for (var j = 0; j < rowSplit.length;j++) {
      var val = rowSplit[j];

      var parsed = parseFloat(val);
      if (isNaN(parsed)) {
        // It was a string. Let's see, is this
        // string already interned?
        var location = enums[j].get(val);
        if (typeof location !== 'undefined') {
          val = location;
        }
        else {
          var proxyVal = enums[j].size;
          enums[j].set(val, proxyVal);
          val = proxyVal;
        }
      }
      else {
        val = parsed;
      }
      rowFinal.push(val);
    }
    rowsFinal.push(rowFinal);
  }
  rows = rowsFinal;

  for (let i = 0; i < titles.length; i++) {
    let column = [];
    for (let j = 0; j < rows.length; j++) {
      column.push(rows[j][i]);
    }
    columns.push(column);
  }

  var end = new Date().getTime();
  var time = end - start;
  console.log("csv parse took: ", time);
  return {
    'titles': titles,
    'columns': columns
  };
}

module.exports = processCsv;
