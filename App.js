import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default class FlatListBasics extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[
            {key: 'Devin', value: 'durant1'},
            {key: 'Jackson', value: 'durant2'},
            {key: 'James', value: 'durant3'},
            {key: 'Joel', value: 'durant4'},
            {key: 'John', value: 'durant5'},
            {key: 'Jillian', value: 'durant6'},
            {key: 'Jimmy', value: 'durant7'},
            {key: 'Julie', value: 'durant8'},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item.key + ',' + item.value}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})