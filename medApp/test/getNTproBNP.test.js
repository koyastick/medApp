const getNTproBNP = require('./getNTproBNP');
testFile = './test/sample.xlsx';
outputFile = './test/output.xlsx';
sheetName = '20180612.Univ';
const DEL = 10; // %
const XLSX = require("xlsx");
book = XLSX.readFile(testFile);
let Sheet = book.Sheets[sheetName];  // シート1をデータを取得します
objs = XLSX.utils.sheet_to_json(Sheet)   // シート1のデータをJSONパースします

for (let i = 0; i < objs.length; i++) {
    let correctAns = objs[i]["NT.pro.BNP"];
    let lower = correctAns * (1 - DEL / 100), upper = correctAns * (1 - DEL / 100);

    const ans = getNTproBNP(objs[i].Age, objs[i].Sex, objs[i].Height, objs[i].Weight, objs[i].Hemoglobin, objs[i].Creatinine, objs[i].BNP, objs[i].AF);
    if (lower <= ans && ans <= upper) {
        Sheet["P" + (i + 2).toString(10)] = { t: 's', v: 'Yes', w: 'Yes' };
    }
    else {
        Sheet["P" + (i + 2).toString(10)] = { t: 's', v: 'No', w: 'No' };
    }
    Sheet["O" + (i + 2).toString(10)] = { t: 'n', v: ans, w: ans.toString(10) };
    test('sample id:' + (objs[i].id).toString(10), () => {
        expect(ans).toBeLessThanOrEqual(upper);
        expect(ans).toBeGreaterThanOrEqual(lower);
    });
}
console.log(Sheet)
book.Sheets[sheetName] = Sheet;
XLSX.writeFile(book, outputFile, { type: 'xlsx' });