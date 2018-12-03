import React, { Component } from "react";
import { Platform, Image, StyleSheet, FlatList, Text, View } from "react-native";

const BigButton = require("./button");

var REQUEST_URL =
  "https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json";

var MOCKED_MOVIES_DATA = [
  {
    title: "标题",
    year: "2015",
    posters: { thumbnail: "https://i.imgur.com/UePbdph.jpg" }
  }
];

export default class FetchExample extends React.Component {
  constructor(props) {
    super(props);   //这一句不能省略，照抄即可
    this.state = {
      data: [],
      loaded: false,
    };
    // 在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向不对
    // 像下面这行代码一样，在constructor中使用bind是其中一种做法（还有一些其他做法，如使用箭头函数等）
    this.fetchData = this.fetchData.bind(this);
  }
  //componentDidMount是 React 组件的一个生命周期方法，它会在组件刚加载完成的时候调用一次，以后不会再被调用
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
        this.setState({
          data: this.state.data.concat(responseData.movies),
          loaded: true,
        });
      });
  }
  
  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <FlatList
        data={this.state.data}
        renderItem={this.renderMovie}
        style={styles.list}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          正在加载电影数据……
        </Text>
      </View>
    );
  }

  renderMovie({ item }) {
    // { item }是一种“解构”写法，请阅读ES2015语法的相关文档
    // item也是FlatList中固定的参数名，请阅读FlatList的相关文档
    return (
      <View style={styles.container}>
        <Image
          source={{uri: item.posters.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.year}>{item.year}</Text>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    ...Platform.select({
      ios: {
        height: 81
      },
      android: {
        height: 51
      }
    })
  },
  list: {
    paddingTop: Platform.OS === "ios" ? 20 : 10,  //Platform.OS在 iOS 上会返回ios
    backgroundColor: '#F5FCFF',
  }
});

// //针对不同平台返回不同的组件
// const Component = Platform.select({
//   ios: () => require("ComponentIOS"),
//   android: () => require("ComponentAndroid")
// })();

// <Component />;

// Android 版本
if (Platform.Version === 25) {
  console.log("Running on Nougat!");
}

// iOS 版本 Platform.Version => 10.3
const majorVersionIOS = parseInt(Platform.Version, 10);
if (majorVersionIOS <= 9) {
  console.log("Work around a change in behavior");
}