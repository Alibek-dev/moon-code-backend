const Parcel = require('../models/Parcel')
const ivm = require('isolated-vm');

class TestingService {
    async startTesting(req, res) {
        const isolate = new ivm.Isolate({ memoryLimit: 128 });
        const context = isolate.createContextSync();
        const jail = context.global;

        const props = {
            a: 1,
            b: 3,
            c: "Строка"
        }

        jail.setSync('output', function(...args) {
            console.log(...args);
        });
        jail.setSync('input', function (property) {
            return props[property]
        });

        context.evalSync('output("Вот это")');

        const hostile = isolate.compileScriptSync(`
                c = input('c')
                output(c)   
                const storage = [];
                const twoMegabytes = 1024 * 1024 * 2;
                while (true) {
                    const array = new Uint8Array(twoMegabytes);
                    for (let ii = 0; ii < twoMegabytes; ii += 4096) {
                        array[ii] = 1; // we have to put something in the array to flush to real memory
                    }
                    storage.push(array);
                    output('I\\'ve wasted '+ (storage.length * 2)+ 'MB');
                }
            `);
        await hostile.run(context).catch(err => console.error(err));

        console.log("Прекол")
    }
}

module.exports = TestingService
