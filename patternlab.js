const config = require('./patternlab-config.json');
const patternlab = require('@pattern-lab/patternlab-node')(config);
// const ui_builder = require('@pattern-lab/patternlab-node/core/lib/ui_builder');
const ae = require('@pattern-lab/patternlab-node/core/lib/annotation_exporter');
const path = require('path');
const fs = require('fs-extra'); //eslint-disable-line prefer-const
const eol = require('os').EOL;


// build, optionally watching or choosing incremental builds
patternlab.patternsonly({
  cleanPublic: true,
  watch: false
}).then(() => {
  console.log('PL done!');

  const annotation_exporter = new ae(patternlab);
  const paths = config.paths;

  //write out the data
  let output = '';

  //config
  output += 'var config = ' + JSON.stringify(config) + ';\n';

  //navItems
  output += 'var navItems = {"patternTypes": ' + JSON.stringify(patternlab.patternTypes) + '};' + eol;

  //patternPaths
  output += 'var patternPaths = ' + JSON.stringify(patternlab.patternPaths) + ';' + eol;

  //viewAllPaths
  output += 'var viewAllPaths = ' + JSON.stringify(patternlab.viewAllPaths) + ';' + eol;


  //write all output to patternlab-data
  fs.outputFileSync(path.resolve(paths.public.data, 'patternlab-data.js'), output);

  // annotations
  const annotationsJSON = annotation_exporter.gather();
  const annotations = 'var comments = { "comments" : ' + JSON.stringify(annotationsJSON) + '};';
  fs.outputFileSync(path.resolve(paths.public.annotations, 'annotations.js'), annotations);

  console.log('PL Export done!');
});

