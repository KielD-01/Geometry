const _ = require('lodash'),
    FileSystem = require('fs'),
    Colors = require('colors'),
    testsDir = __dirname + `/../src/tests/`,
    results = {p: 0, f: 0};

Colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
});

console.log(Colors.warn(`Tests Directory : ${testsDir}`));

FileSystem.readdir(testsDir, (err, files) => {

    console.log(`Modules to Test :`, Colors.info(files.length), "\r\n", files, "\r\n\r\n");

    files.map(file => {
        console.log(Colors.info('Test File : %s'), file);

        let script = require(`${testsDir}` + file);
        _.map(script['t'](), (value, key) => {
            results[key] += value;
        });
    });

    console.log(Colors.info('Passed Tests : %s'), results['p']);
    console.log(Colors.error('Failed Tests : %s'), results['f']);
});