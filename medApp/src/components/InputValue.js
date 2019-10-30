import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native'
import {Button, } from 'react-native-elements';


export class InputValue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    }
  }
  render() {
    return (
      <View style={{ flexDirection: 'row', backgroundColor: '', margin: 10}}>
        <View style={styles.valueNameView}>
          <Text style={styles.text}>{this.props.valueName}</Text>
        </View>
        <View style={styles.inputView}>
          <TextInput
            ref={TextInput => { this.TextInput = TextInput }}
            style={styles.TextInput}
            keyboardType='decimal-pad'
            placeholder="Type here"
            value={this.state.value}
            onChangeText={(text) => this.setState({ text })}
            textAlign={'center'}
            onChangeText={(input) => {
              this.setState({ value: input });
            }}
            onBlur={() => {
              let value = this.state.value;
              if (value == null) {
                // do nothing
              }
              else if (this.props.min <= value && value <= this.props.max) {
                this.props.setValue(value);
              }
              else {
                this.state.value = null;
                this.TextInput.clear();
                Alert.alert('value out of range', this.props.valueName + 'は'+this.props.min+'から' +this.props.max+'の値を入力して下さい');
              }
            }}
          />
        </View>
        <View style={styles.unitView}>
          <Text style={styles.text}>{this.props.valueUnit}</Text>
        </View>
      </View>
    )
  }
}

export class InputBinaryValue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    }
  }
  render() {
    return (
      <View style={{ flexDirection: 'row', backgroundColor: '', justifyContent: 'space-evenly', alignItems: 'center', margin: 10 }}>
        <View style={styles.valueNameView}>
          <Text style={styles.text}>{this.props.valueName}</Text>
        </View>
        <View style={styles.buttonsView}>
          {/* <Button onPress={this.props.setValue(true)} raised title={this.props.left} style={styles.Button}/>
          <Button onPress={this.props.setValue(false)} raised title={this.props.right} style={styles.Button}/> */}
        </View>
      </View>
    )
  }
}

const stylesColor = StyleSheet.create({
  valueNameView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00FF00',
  },
  inputView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0000FF',
  },
  unitView: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FF0000',
  },
  buttonsView: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'skyblue'
  },
  TextInput: {
    height: 40,
    width: 150,
    fontSize: 20
  },
  text: {
    fontSize:30
  },
  buttonText: {
    fontSize:20
  },
  Button: {
    width:80,
    // alignItems: 'center',
    backgroundColor: '#AAAAAA',
    // padding: 10,
    // margin:10
  },
})


const styles = StyleSheet.create({
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
  buttonsView: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  TextInput: {
    height: 40,
    width: 150,
    fontSize: 20
  },
  text: {
    fontSize:30
  },
  buttonText: {
    fontSize:20
  },
  Button: {
    width:80,
    // alignItems: 'center',
    backgroundColor: '#AAAAAA',
    // padding: 10,
    // margin:10
  },
})