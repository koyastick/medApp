//NT-proBNP演算用
const K1 = 2.047041;
const K2 = 0.9073734;
const K3 = -0.005224782;
const K4 = 0.00283043;
const K5 = -0.008663586;
const K6 = -0.04215072;
const K7 = 0.0005299286;
const K8 = -0.000002139456;
const K9 = -0.000002775467;
const K10 = 0.000006208488;
const K11 = -0.000001329049;
const K12 = 0.01644141;
const K13 = 0.1938035;
const CCR1 = 56.52597;
const CCR2 = 72.42262;
const CCR3 = 93.71528;

function getNTproBNP(age, sex, height, weight, hem, cre, bnp, af) {
    let bmi = weight / Math.pow((height / 100), 2);
    let ccr = (140 - age) * weight / (72 * cre) * (sex == "Man" ? 1 : 0.85);
    let res = Math.pow(10, (
        K1
        + K2 * Math.log10(bnp)
        + K3 * age
        + K4 * bmi
        + K5 * hem
        + K6 * ccr
        + K7 * Math.pow(ccr, 2)
        + K8 * Math.pow(ccr, 3)
        + K9 * Math.max(0, Math.pow(ccr - CCR1, 3))
        + K10 * Math.max(0, Math.pow(ccr - CCR2, 3))
        + K11 * Math.max(0, Math.pow(ccr - CCR3, 3))
        + (sex == 'Man' ? 0 : K12)
        + (af == 'No' ? 0 : K13)
    )
    )
    
    return res;
}
module.exports = getNTproBNP;