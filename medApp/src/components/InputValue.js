import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native'
import { Button, } from 'react-native-elements';


export class InputValue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    }
  }
  render() {
    return (
      <View style={styles.inputValue}>
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
                Alert.alert('value out of range', this.props.valueName + 'は' + this.props.min + 'から' + this.props.max + 'の値を入力して下さい');
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
      pushedL: false,
      pushedR: false
    }
  }
  render() {
    return (
      <View style={styles.inputBinaryValue}>
        <View style={styles.valueNameView}>
          <Text style={styles.text}>{this.props.valueName}</Text>
        </View>
        <View style={styles.buttonsView}>
          {this.state.pushedL ?
            <Button disabled title={this.props.left} backgroundColor='#ff5622'></Button> :
            <Button title={this.props.left} onPress={() => { this.props.setValue(this.props.left); this.setState({ pushedL: true, pushedR: false }) }} backgroundColor='#ff5622'></Button>
          }
          {this.state.pushedR ?
            <Button disabled title={this.props.right} backgroundColor='#ff5622'></Button> :
            <Button title={this.props.right} onPress={() => { this.props.setValue(this.props.right); this.setState({ pushedR: true, pushedL: false }) }} backgroundColor='#ff5622'></Button>
          }
        </View>
      </View>
    )
  }
}



const styles = StyleSheet.create({
  inputValue: {
    flexDirection: 'row',
    margin: 10,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputBinaryValue: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 60,
    margin: 10
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
    fontSize: 30
  },
  buttonText: {
    fontSize: 20
  },
  Button: {
    width: 80,
    // alignItems: 'center',
    backgroundColor: '#AAAAAA',
    // padding: 10,
    // margin:10
  },
})