import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image } from 'react-native';


class Greeting extends Component {
  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <Text>Hello {this.props.name}!</Text>
      </View>
    );
  }
}
class Blink extends Component {
  constructor(props) {
    super(props);
    this.state = { isShowingText: true };

    // 每1000毫秒对showText状态做一次取反操作
    setInterval(() => {
      this.setState(previousState => {
        return { isShowingText: !previousState.isShowingText };
      });
    }, 1000);
  }

  render() {
    // 根据当前showText的值决定是否显示text内容
    if (!this.state.isShowingText) {
      return null;
    }

    return (
      <Text style={this.props.style}>{this.props.text}</Text>
    );
  }
}

export default class HelloWorldApp extends Component {
  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
        <View style={{alignItems: 'center',height: 300, backgroundColor: 'red' }}>
          <View style={{flex: 1, backgroundColor: 'steelblue'}} >
            <Text>Hello world!</Text>
            <Image source={pic} style={{width: 193, height: 110}} />
          </View>
          <View style={{flex: 2, backgroundColor: 'skyblue'}} >
            <Greeting name='Rexxar' />
            <Greeting name='Jaina' />
            <Greeting name='Valeera' />
          </View>
          <View style={{flex: 3, backgroundColor: 'steelblue'}} >
            <Blink style={styles.bigblue} text='I love to blink' />
            <Blink style={[styles.bigblue, styles.red]} text='Yes blinking is so great' />
            <Blink style={[styles.red, styles.bigblue]} text='Why did they ever take this out of HTML' />
            <Blink style={[styles.red, styles.bigblue]} text='Look at me look at me look at me' />
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});