const _ = require('lodash')

/**
 * Returns random integer between min and max
 *
 * @param min
 * @param max
 * @returns {number}
 */
module.exports.getRandomIntInclusive = function (min = -65563, max = 65563) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 *
 * @param func
 */
module.exports.callable = function (func) {
    this[func].apply(this, Array.prototype.slice.call(arguments, 1));
};

/**
 *
 * @param obj1
 * @param obj2
 * @returns {boolean}
 */
const objDiffBool = function (obj1, obj2) {
    let diff = true;

    _.mapKeys(obj1, (o, k) => {
        if (!_.has(obj2, k)) {
            diff = true;
        }
    });

    return diff;
};

module.exports.objDiffBool = objDiffBool;

/**
 *
 * @param testMethods
 * @param functions
 * @returns {{p: number, f: number}}
 */
module.exports.runTests = function (testMethods, functions = {}) {
    let results = {p: 0, f: 0},
        rl = times => '='.repeat(times);

    _.map(testMethods, (tests, figure) => {
        console.log(`Test Figure :`, figure);

        _.map(tests, (list, callable) => {
            if (list.length) {
                let textString = "\r\n" + rl(10) + ` Testing \`${callable}\` ` + rl(10),
                    testNo = 1;
                console.log(textString);

                _.has(functions, callable) ?
                    _.map(list, test => {
                        console.log('Test no.', testNo);

                        let result = functions[callable].apply(null, test.c),
                            pass = false;

                        if (["object"].includes(typeof result)) pass = objDiffBool(result, test.r);
                        if (['integer', "number", "float"].includes(typeof result)) pass = result === test.r;
                        if (["string"].includes(typeof result)) pass = result.includes(test.r);


                        console.log('Arguments', test.c);
                        console.log('Expected Result', test.r);
                        console.log('Given Result', result);

                        results[pass ? 'p' : 'f']++;

                        console.log("Test pass :", pass);

                        testNo++;
                        console.log(rl(textString.length - 2))
                    }) : console.log("\r\n" + `Callable \`${callable}\` is not defined on the list of functions`);
            } else {
                console.log(`No tests has been defined for \`${callable}\`` + "\r\n" + rl(`No tests has been defined for \`${callable}\``.length) + "\r\n");
            }
        });
    });

    return results;
};