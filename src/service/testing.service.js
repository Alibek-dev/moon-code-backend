const ivm = require('isolated-vm');

class TestingService {
    async startTesting(code, test) {

        const isolate = new ivm.Isolate({ memoryLimit: 128 });
        const context = isolate.createContextSync();
        const jail = context.global;

        let inputs = []
        for(let input of test.inputs) {
            inputs.push(input.value)
        }

        let result = null

        jail.setSync('output', function(arg) {
            result = arg.toString()
        });
        jail.setSync('input', function (property) {
            return inputs[property - 1]
        });

        let isPassed = false
        let errorMessage = ""

        try {
            const hostile = isolate.compileScriptSync(code)
        } catch (e) {
            errorMessage = e.toString()
            return {isPassed, errorMessage}
        }


        await hostile
            .run(context)
            .catch(err => errorMessage = err.toString());
        isPassed = result === test.outputValue.toString()
        return {isPassed, errorMessage}

    }
}

module.exports = new TestingService
