/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform
} from 'react-native';
import Button from 'apsl-react-native-button'
import CheckBox from 'react-native-custom-checkbox'
import Modal from 'react-native-modalbox'

export default class donut extends Component {
  state = {
    isDisabled: false,
  }
  openModal1(id) {
    this.refs.modal1.open();
  }
  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.openModal1.bind(this)}>Mở Filter</Button>

        <Modal style={{justifyContent: 'center',alignItems: 'center', height: 400,width: 400}} position={"center"} ref={"modal1"} isDisabled={this.state.isDisabled}>
          <View style={styles.container}>
            <Text style = {{textAlign: 'center', margin: 30, fontSize: 20}}> SẮC THÁI </Text>

            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1/4}} />
              <View style={{flex: 1/4, flexDirection: 'row', margin: 10}}>
                <CheckBox
                  style = {{color: 'blue'}}
                />
                <Text style={{paddingLeft: 10, textAlignVertical: 'center', fontSize: 14}}>Tích cực</Text>
              </View>
              <View style={{flex: 1/4, flexDirection: 'row', margin: 10}}>
                <CheckBox
                  style = {{color: 'blue'}}
                />
                <Text style={{paddingLeft: 10, textAlignVertical: 'center', fontSize: 14}}>Tiêu cực</Text>
              </View>
              <View style={{flex: 1/4}} />
            </View>

            <Text style = {{textAlign: 'center', margin: 30, fontSize: 20}}> NGUỒN </Text>

            <View style={{paddingLeft: 20, flexDirection: 'row'}}>
              <View style={{flex: 1/3, flexDirection: 'row', margin: 10}}>
                <CheckBox
                  style = {{color: 'blue'}}
                />
                <Text style={{paddingLeft: 10, textAlignVertical: 'center', fontSize: 14}}>Báo chí</Text>
              </View>
              <View style={{flex: 1/3, flexDirection: 'row', margin: 10}}>
                <CheckBox
                  style = {{color: 'blue'}}
                />
                <Text style={{paddingLeft: 10, textAlignVertical: 'center', fontSize: 14}}>Diễn đàn</Text>
              </View>
              <View style={{flex: 1/3, flexDirection: 'row', margin: 10}}>
                <CheckBox
                  style = {{color: 'blue'}}
                />
                <Text style={{paddingLeft: 10, textAlignVertical: 'center', fontSize: 14}}>Bình luận</Text>
              </View>
            </View>

            <View style={{paddingLeft: 20, flexDirection: 'row'}}>
              <View style={{flex: 1/3, flexDirection: 'row', margin: 10}}>
                <CheckBox
                  style = {{color: 'blue'}}
                />
                <Text style={{paddingLeft: 10, textAlignVertical: 'center', fontSize: 14}}>Fanpage</Text>
              </View>
              <View style={{flex: 1/3, flexDirection: 'row', margin: 10}}>
                <CheckBox
                  style = {{color: 'blue'}}
                />
                <Text style={{paddingLeft: 10, textAlignVertical: 'center', fontSize: 14}}>Group</Text>
              </View>
              <View style={{flex: 1/3, flexDirection: 'row', margin: 10}}>
                <CheckBox
                  style = {{color: 'blue'}}
                />
                <Text style={{paddingLeft: 10, textAlignVertical: 'center', fontSize: 14}}>Cá nhân</Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', padding: 15}}>
              <Button style={{flex: 1/2, borderWidth: 1, borderColor: 'blue', borderRadius: 20, margin: 10}}> Lọc </Button>
              <Button style={{flex: 1/2, borderWidth: 1, borderColor: 'blue', borderRadius: 20, margin: 10}}> Hủy </Button>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
