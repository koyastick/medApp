const getNTproBNP = require('./getNTproBNP');

let XLSX     = require("xlsx");
let workbook = XLSX.readFile("./sample.xlsx");
// let sheet_name_list = workbook.SheetNames
// let Sheet1          = workbook.Sheets[sheet_name_list[0]]  // シート1をデータを取得します
// let Sheet1_json     = XLSX.utils.sheet_to_json( Sheet1 )   // シート1のデータをJSONパースします

test('検証します', () => {
    for (let i = 0; i < 5; i++) {
        console.log("hello")
        let lower = 0, upper = 1000;
        expect(getNTproBNP(81, "Man", 159.2, 59.5, 15.5, 1.11, 149, "No")).toBeGreaterThanOrEqual(lower);
        expect(getNTproBNP(81, "Man", 159.2, 59.5, 15.5, 1.11, 149, "No")).toBeLessThanOrEqual(upper);
    }
}) 