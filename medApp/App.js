import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, Alert, Image } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import { InputValue, InputBinaryValue } from './src/components/InputValue.js';
import { matchesPattern } from '@babel/types';

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
  return res;
}


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calced: false
    }
    this.age = null;
    this.sex = null;
    this.height = null;
    this.weight = null;
    this.hem = null;
    this.cre = null;
    this.bnp = null;
    this.af = null;
    this.ans = null;
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

  render() {
    return (
      <View style={styles.main}>
        <ScrollView>
          <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 10, backgroundColor: '#FFFFFF' }}>
            <Text style={{ fontSize: 40 }}>NT-proBNP calculator</Text>
          </View>
          <Divider style={styles.divider}></Divider>
          <InputValue valueName='Age ' valueUnit='yaer' min={20} max={120} setValue={(value) => { this.age = value; this.willReCalc(); }} />
          <Divider style={styles.divider}></Divider>
          <InputBinaryValue valueName='Sex' left='Man' right='Woman' setValue={(ret) => { this.sex = ret; this.willReCalc() }} />
          <Divider style={styles.divider}></Divider>
          <InputValue valueName='Height ' valueUnit='cm' min={120} max={200} setValue={(value) => { this.height = value; this.willReCalc(); }} />
          <Divider style={styles.divider}></Divider>
          <InputValue valueName='Weight ' valueUnit='kg' min={25} max={130} setValue={(value) => { this.weight = value; this.willReCalc(); }} />
          <Divider style={styles.divider}></Divider>
          {/* <InputValue valueName='BMI ' valueUnit='kg/m^2' min={12} max={43} setValue={(value)=>{this.setState({height:value})}}/> */}
          <InputValue valueName='Hemoglobin ' valueUnit='g/dl' min={5} max={20} setValue={(value) => { this.hem = value; this.willReCalc(); }} />
          <Divider style={styles.divider}></Divider>
          <InputValue valueName='Creatinine ' valueUnit='md/dl' min={0} max={3.0} setValue={(value) => { this.cre = value; this.willReCalc(); }} />
          <Divider style={styles.divider}></Divider>
          <InputValue valueName='BNP ' valueUnit='pg/dl' min={4} max={4000} setValue={(value) => { this.bnp = value; this.willReCalc(); }} />
          <Divider style={styles.divider}></Divider>
          <InputBinaryValue valueName='AF' left='Yes' right='No' setValue={(ret) => { this.af = ret; this.willReCalc() }} />
          <Divider style={styles.divider}></Divider>

          {this.state.calced ?
            <Button disabled title='calculate' backgroundColor='#ff5622'></Button> :
            <Button title='calculate' onPress={() => { this.calc() }} backgroundColor='#ff5622'></Button>
          }

          <View style={styles.inputValue}>
            <View style={styles.valueNameView}>
              <Text style={styles.text}> NT-proBNP </Text>
            </View>
            <View style={styles.inputView}>
              {this.ans == null ? <Text></Text> : <Text style={styles.text}>{this.ans.toFixed(1)}</Text>}
            </View>
            <View style={styles.unitView}>
              <Text style={styles.text}>pg/ml</Text>
            </View>
          </View>

        </ScrollView>
        {/* 引用 */}
        {/* <View style={styles.cmt}>
          <Text>
            NT-proBNP calculator cannot and will not be held legally, financially, or medically
            responsible for calculated NT-proBNP values and decisions made based on the NT-proBNP values obtained using this auto-calculation tool.
          </Text>
        </View> */}
        {/* 機関情報 */}
        {/* <View style={{ flexDirection: "row" }}>
          <Image source={require('./src/fig/med_logo1_25.png')} style={{ width: 100, height: 100 }} />
          <View style={styles.container}>
            <Text style={{ margin: 5 }}>
              Kasahara S, Shimokawa H et al. Int J Cardiol. 2019;280:184-189.
             </Text>
            <Text style={{ margin: 5 }}>
              Department of Cardiovascular Medicine, Tohoku University Graduate School of Medicine
            </Text>
          </View>
        </View> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // backgroundColor: '#FF00FF',
    justifyContent: 'center',
    // alignItems:'center',
    paddingTop: 33,
    paddingBottom: 30
  },
  inputValue: {
    flexDirection: 'row',
    margin: 10,
    height: 70
  },
  divider: {
    backgroundColor: '#20202020',
    height: 2
  },
  text: {
    fontSize: 30
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