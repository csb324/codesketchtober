const fs = require('fs');

function fetchPathsFromSomeExternalSource() {
  const files = fs.readdirSync(`${__dirname}/src/pieces`);

  let entries = {};
  files.forEach((f) => {
     entries[f] = { 
       import: `./src/pieces/${f}`,
       filename: `/pieces/${f}`
     }
  })  
  return entries;
}

module.exports = {
  entry() {
    return fetchPathsFromSomeExternalSource(); // returns a promise that will be resolved with something like ['src/main-layout.js', 'src/admin-layout.js']
  },
  output: {
    filename: "[name].js", // string (default)
  },
};