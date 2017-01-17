const passmarked  = require('passmarked');
const _           = require('underscore')

/**
* Creates the actual test
**/
var Test = passmarked.createTest(

  _.extend(

    {},
    require('./package.json'),
    require('./worker.json'),
    {

      rules: require('./lib')

    }

  )

);

/**
* Expose the test
**/
module.exports = exports = Test