import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import { InputValue, InputBinaryValue } from './src/components/InputValue.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // parameters
      // control
      calced: false
    }
    this.age= null;
    this.sex= null;
    this.height= null;
    this.weight= null;
    this.bmi= null;
    this.hem= null;
    this.cre= null;
    this.bnp= null;
    this.af= null;
    this.res= null;
  }
  calc=()=>{
    this.res=1
  }
  willReCalc=()=>{
    this.setState({calced:false})
  }
  render() {
    return (
      <View style={styles.main}>
        <View style={{justifyContent:'center', alignItems:'center', paddingBottom:20}}>
          <Text style={{fontSize:40}}>NY-proBNP calculator</Text>
        </View>
        
        <ScrollView>
          <Divider style={styles.divider}></Divider>
          <InputValue valueName='Age ' valueUnit='yaer' min={20} max={120} setValue={(value) => { this.yaer=value;this.willReCalc(); }} />
          <Divider style={styles.divider}></Divider>
          <InputBinaryValue valueName='Sex' left='Man' right='Woman' setValue={(left)=>{ (left?this.sex=0:this.sex=1);this}}   />
          <Divider style={styles.divider}></Divider>
          <InputValue valueName='Height ' valueUnit='cm' min={120} max={200} setValue={(value) => { this.height=value;this.willReCalc(); }} />
          <Divider style={styles.divider}></Divider>
          <InputValue valueName='Weight ' valueUnit='kg' min={25} max={130} setValue={(value) => { this.weight=value;this.willReCalc(); }} />
          <Divider style={styles.divider}></Divider>
          {/* <InputValue valueName='BMI ' valueUnit='kg/m^2' min={12} max={43} setValue={(value)=>{this.setState({height:value})}}/> */}
          <InputValue valueName='Hemoglobin ' valueUnit='g/dl' min={5} max={20} setValue={(value) => { this.hem=value;this.willReCalc(); }} />
          <Divider style={styles.divider}></Divider>
          <InputValue valueName='Creatinine ' valueUnit='md/dl' min={0} max={3.0} setValue={(value) => { this.cre=value;this.willReCalc(); }} />
          <Divider style={styles.divider}></Divider>
          <InputValue valueName='BNP ' valueUnit='pg/dl' min={4} max={4000} setValue={(value) => { this.height=this.bnp;this.willReCalc(); }} />
          <Divider style={styles.divider}></Divider>
          <InputBinaryValue valueName='AF' left='Yes' right='No' setValue={(left)=>{ (left?this.af=0:this.af=1);this.willReCalc()}}/>
          <Divider style={styles.divider}></Divider>
        </ScrollView>

        {this.state.calced?
          <Button disabled title='calculate' onPress={this.calc} backgroundColor='#ff5622'></Button>:
          <Button title='calculate' onPress={ ()=>{this.calc();this.setState({calced:true})}} backgroundColor='#ff5622'></Button>
        }

        <View style={{ flexDirection: 'row' }}>
          <View style={styles.valueNameView}>
            <Text style={styles.text}> NT-proBNP </Text>
          </View>
          <View style={styles.inputView}>
            {this.res==null?<Text>???</Text>:<Text style={styles.text}>{this.res}</Text>}
          </View>
          <View style={styles.unitView}>
            <Text style={styles.text}>pg/ml</Text>
          </View>
        </View>
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