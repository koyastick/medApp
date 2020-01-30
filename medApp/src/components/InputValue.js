import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, TextInput, Alert, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { Button, } from 'react-native-elements';
import SegmentedControlTab from "react-native-segmented-control-tab";

export class InputValue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    }
  }
  reset = () => {
    this.TextInput.clear();
  }

  fucusAgeTextInput = () => {
    this.props.valueName === 'Age' ? this.TextInput.focus() : {};
  }

  render() {
    return (
      <View style={styles.inputValue}>
        <ValueName valueName={this.props.valueName} bigChar={this.props.bigChar}></ValueName>
        <KeyboardAvoidingView style={styles.inputView} behavior='padding' enabled>
          <TextInput
            ref={TextInput => { this.TextInput = TextInput }}
            style={styles.TextInput}
            returnKeyType='done'
            keyboardType='decimal-pad'
            clearTextOnFocus={true}
            placeholder="Type here"
            value={this.state.value}
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
                this.props.setValue(null)
                Alert.alert('value out of range', this.props.valueName + 'は' + this.props.min + 'から' + this.props.max + 'の値を入力して下さい');
                this.TextInput.focus();
              }
            }}
          />
        </KeyboardAvoidingView>
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
      selectedIndex: 0
    }
  }
  reset = () => {
    this.setState({
      ...this.state,
      selectedIndex: 0
    });
  }
  handleIndexChange = index => {
    if (index == 0) {
      this.props.setValue(this.props.left)
    }
    else if (index == 1) {
      this.props.setValue(this.props.right)
    }
    this.setState({
      ...this.state,
      selectedIndex: index
    });
  };

  render() {
    return (
      <View style={styles.inputBinaryValue}>
        <ValueName valueName={this.props.valueName} bigChar={this.props.bigChar}></ValueName>
        <View style={styles.buttonsView}>
          <SegmentedControlTab
            values={[this.props.left, this.props.right]}
            selectedIndex={this.state.selectedIndex}
            onTabPress={this.handleIndexChange}
            fontSize={30}
          />
        </View>
      </View >
    )
  }
}

export class ValueName extends Component {
  CinS(c, str) {
    let occ = false;
    for (let i = 0; i < str.length; i++) {
      if (c == str[i])
        occ = true;
    }
    return occ
  }
  render() {
    let text = []
    for (let i = 0; i < this.props.valueName.length; i++) {
      if (this.CinS(this.props.valueName[i], this.props.bigChar)) {
        text.push(
          <Text style={styles.textBold}>{this.props.valueName[i]}</Text>
        )
      }
      else {
        text.push(
          <Text style={styles.text}>{this.props.valueName[i]}</Text>
        )
      }
    }
    return (
      <View style={styles.valueNameView}>
        {text}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  inputValue: {
    flexDirection: 'row',
    margin: 0,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',

  },
  inputBinaryValue: {
    flexDirection: 'row',
    margin: 0,
    height: 60,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  valueNameView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginLeft: 5
  },
  inputView: {
    flex: 0.7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5
  },
  unitView: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 5
  },
  buttonsView: {
    flex: 1.2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginRight: 5
  },
  TextInput: {
    height: 50,
    width: 120,
    fontSize: 25
  },
  text: {
    fontSize: 25
  },
  textBold: {
    fontSize: 25,
    fontWeight: "bold"
  },
  buttonText: {
    fontSize: 20
  },
  Button: {
    width: 80,
    // alignItems: 'center',
    // '#66cdaa'
    // padding: 10,
    // margin:10
  },
})