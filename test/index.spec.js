const creneau = require("../src/index")
var path = require('path');
test('first output', () => {
    var fs = require('fs');
    var input = fs.readFileSync(path.join(__dirname, '../data/input1.txt')).toString().split("\n");
    var output= fs.readFileSync(path.join(__dirname, '../data/output1.txt')).toString().split("\n");
    for(i in input) {
        //console.log(input[i]);
}
  expect(creneau(input)).toBe(output[0]);
});
test('second output', () => {
    var fs = require('fs');
    var input = fs.readFileSync(path.join(__dirname, '../data/input2.txt')).toString().split("\n");
    var output= fs.readFileSync(path.join(__dirname, '../data/output2.txt')).toString().split("\n");
    for(i in input) {
        //console.log(input[i]);
}
  expect(creneau(input)).toBe(output[0]);
});
test('third output', () => {
    var fs = require('fs');
    var input = fs.readFileSync(path.join(__dirname, '../data/input3.txt')).toString().split("\n");
    var output= fs.readFileSync(path.join(__dirname, '../data/output3.txt')).toString().split("\n");
    for(i in input) {
        //console.log(input[i]);
}
  expect(creneau(input)).toBe(output[0]);
});
test('fourth output', () => {
    var fs = require('fs');
    var input = fs.readFileSync(path.join(__dirname, '../data/input4.txt')).toString().split("\n");
    var output= fs.readFileSync(path.join(__dirname, '../data/output4.txt')).toString().split("\n");
    for(i in input) {
        //console.log(input[i]);
}
  expect(creneau(input)).toBe(output[0]);
});
test('fifth output', () => {
    var fs = require('fs');
    var input = fs.readFileSync(path.join(__dirname, '../data/input5.txt')).toString().split("\n");
    var output= fs.readFileSync(path.join(__dirname, '../data/output5.txt')).toString().split("\n");
    for(i in input) {
        //console.log(input[i]);
}
  expect(creneau(input)).toBe(output[0]);
});