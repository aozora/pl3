const config = require('./patternlab-config.json');
const patternlab = require('@pattern-lab/patternlab-node')(config);

// build, optionally watching or choosing incremental builds
const data = patternlab.patternsonly({
  cleanPublic: true,
  watch: false
});

console.log('Data:');
console.dir(data);
