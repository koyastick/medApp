import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, Alert, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import { InputValue, InputBinaryValue } from './src/components/InputValue.js';
import { matchesPattern } from '@babel/types';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calced: false
    }
    this.age = null;
    this.sex = "Man";
    this.height = null;
    this.weight = null;
    this.hem = null;
    this.cre = null;
    this.bnp = null;
    this.af = "Yes";
    this.ans = null;

    this.os = null;
    if (Platform.OS == 'ios') {
      this.keybordAvoidingViewStile = "padding";
    }
    else {
      this.os = "padding";
    }
  }
  loggingValue() {
    console.log(
      this.age,
      this.sex,
      this.height,
      this.weight,
      this.hem,
      this.cre,
      this.bnp,
      this.af,
      this.ans,
    )
  }

  calc() {
    if (this.age == null || this.sex == null || this.height == null || this.weight == null || this.hem == null || this.cre == null || this.bnp == null || this.af == null) {
      Alert.alert('記入漏れがあります')
      return 0;
    }
    this.ans = getNTproBNP(this.age, this.sex, this.height, this.weight, this.hem, this.cre, this.bnp, this.af);
    this.setState({ calced: true })
  }

  willReCalc = () => {
    this.setState({ calced: false })
    this.ans = null
  }

  reset = () => {
    this.setState({ calced: false });
    this.age = null;
    this.InputValueYear.reset();
    this.sex = "Man";
    this.InputValueSex.reset();
    this.height = null;
    this.InputValueHeight.reset();
    this.weight = null;
    this.InputValueWieght.reset();
    this.hem = null;
    this.InputValueHe.reset();
    this.cre = null;
    this.InputValueCr.reset();
    this.bnp = null;
    this.InputValueBNP.reset();
    this.af = "Yes";
    this.InputValueAF.reset();
    this.ans = null;
    this.InputValueYear.fucusAgeTextInput();

    console.log("reset");
  }

  render() {
    return (
      <View style={styles.main}>
        {/* safety space for ios */}
        {Platform.OS == "android" ?
          <View style={{ height: 10, backgroundColor: 'white' }} /> :
          <View style={{ height: 33, backgroundColor: 'white' }} />
        }
        {/* アプリケーションタイトル */}
        <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 0 }}>
          <Text style={styles.textTitle}>NT-proBNP calculator</Text>
        </View>
        <Divider style={styles.divider}></Divider>
        {/* 数値入力 */}
        <KeyboardAvoidingView style={{ flex: 5 }} behavior={this.keybordAvoidingViewStile} enabled>
          <ScrollView>
            <Divider style={styles.divider}></Divider>

            <InputValue ref={InputValue => { this.InputValueYear = InputValue }} valueName='Age' bigChar='A' valueUnit='y/o' min={20} max={120} setValue={(value) => { this.age = value; this.willReCalc(); }} />

            <Divider style={styles.divider}></Divider>

            <InputBinaryValue ref={InputBinaryValue => { this.InputValueSex = InputBinaryValue }} bigChar='S' valueName='Sex' left='Man' right='Woman' setValue={(ret) => { this.sex = ret; this.willReCalc() }} />

            <Divider style={styles.divider}></Divider>

            <InputValue ref={InputValue => { this.InputValueHeight = InputValue }} valueName='Height' bigChar='H' valueUnit='cm' min={120} max={200} setValue={(value) => { this.height = value; this.willReCalc(); }} />

            <Divider style={styles.divider}></Divider>

            <InputValue ref={InputValue => { this.InputValueWieght = InputValue }} valueName='Weight' bigChar='W' valueUnit='kg' min={25} max={130} setValue={(value) => { this.weight = value; this.willReCalc(); }} />

            <Divider style={styles.divider}></Divider>

            <InputValue ref={InputValue => { this.InputValueHe = InputValue }} valueName='Hemoglobin' bigChar='He' valueUnit='g/dl' min={5} max={20} setValue={(value) => { this.hem = value; this.willReCalc(); }} />

            <Divider style={styles.divider}></Divider>

            <InputValue ref={InputValue => { this.InputValueCr = InputValue }} valueName='Creatinine' bigChar='Cr' valueUnit='md/dl' min={0} max={3.0} setValue={(value) => { this.cre = value; this.willReCalc(); }} />

            <Divider style={styles.divider}></Divider>

            <InputValue ref={InputValue => { this.InputValueBNP = InputValue }} valueName='BNP' bigChar='BNP' valueUnit='pg/dl' min={4} max={4000} setValue={(value) => { this.bnp = value; this.willReCalc(); }} />

            <Divider style={styles.divider}></Divider>

            <InputBinaryValue ref={InputBinaryValue => { this.InputValueAF = InputBinaryValue }} valueName='AF' bigChar="AF" left='Yes' right='No' setValue={(ret) => { this.af = ret; this.willReCalc() }} />

            <Divider style={styles.divider}></Divider>
          </ScrollView>
        </KeyboardAvoidingView>

          {/* 計算実行ボタン */}
        <View style={{ margin: 0 }}>
          {
            this.state.calced ?
              <Button disabled title='calculate' backgroundColor='#0076fe'></Button> :
              <Button buttonStyle={{ backgroundColor: '#0074ff' }} title='calculate' onPress={() => { this.calc() }} backgroundColor='red'></Button>
          }
        </View>

        {/* 計算結果表示 */}
        <Divider style={styles.divider}></Divider>
        <View style={styles.inputValue}>
          <View style={styles.valueNameView}>
            <Text style={styles.textResult}>NT-proBNP </Text>
          </View>
          <View style={styles.inputView}>
            {this.ans == null ? <Text></Text> : <Text style={styles.text}>{this.ans.toFixed(1)}</Text>}
          </View>
          <View style={styles.unitView}>
            <Text style={styles.textResult}>pg/ml</Text>
          </View>
          <View style={styles.unitView}>
            <Button buttonStyle={{ backgroundColor: '#f44336' }} title='reset' onPress={this.reset}></Button>
          </View>
        </View>
        <Divider style={styles.divider}></Divider>
      </View >
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // backgroundColor: '#FF00FF',
    justifyContent: 'space-evenly',
    // alignItems:'center',
    paddingTop: 33,
    paddingBottom: 0,
    paddingHorizontal: 5
  },
  inputValue: {
    flexDirection: 'row',
    margin: 10,
    height: 37,
  },
  divider: {
    backgroundColor: '#20202020',
    height: 2
  },
  textTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#0076fe',
    // fontFamily: 'courier',
    // fontFamily: 'courier'
  },
  textResult: {
    fontSize: 25
  },
  text: {
    fontSize: 20
  },
  valueNameView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unitView: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  Button: {

  }
})


//********************************************************************
// 各種演算
//====================================================================
// <演算式>
// BMI = 体重(kg) / (身長(cm)/100)^2
// CCr = (140-年齢) * 体重 / (72*Cre) * IF(Mele, 1, 0.85)
// NT-proBNP = 10^(2.05
// 					+ 0.907 * log10(BNP)
// 					- 0.00522 * 年齢
// 					+ 0.00283 * BMI
// 					- 0.00866 * Hb
// 					- 0.0422 * CCr
// 					+ 0.000530 * CCr^2
// 					- 0.00000214 * CCr^3
// 					- 0.00000278 * MAX(0, (CCr - 56.5)^3)
// 					- 0.00000621 * MAX(0, (CCr - 72.4)^3)
// 					- 0.00000133 * MAX(0, (CCr - 93.7)^3)
// 					+ IF(Male, 0, 0.0164)
// 					+ IF(non-AF, 0, 0.194))
//====================================================================
// Change Record
//  Date		Ver		By			Article
// -------------------------------------------------------------------
//  2019.03.27	1.00 	Chart2		初版
// 
// 
//********************************************************************

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
  console.log(res)
  return res;
}
