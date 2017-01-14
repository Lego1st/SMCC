import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    Platform,
    Dimensions
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae, Hoshi } from 'react-native-textinput-effects';
import Button from 'apsl-react-native-button'
import styles from '../styles/style';
import * as API from '../libs/backend'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as LoginActions from '../actions/login';
const window = Dimensions.get('window');

function mapStateToProps(state) {
    return {
        global: state.global
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...LoginActions}, dispatch)
    };
}


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    onChangeUsername (text) {
        this.setState({
            username: text
        })
    }

    onChangePassword (text) {
        //console.log(text)
        this.setState({
            password: text
        })
    }

    login() {
      console.log(this.state.username)
      this.props.actions.login(this.state.username, this.state.pass)
    }

    render() {
        return (
          <View style={styles.container}>
            <View style={{justifyContent: 'center'
              ,flexDirection: 'row',alignItems:'flex-start', flex: 1/9}}>
              <View style={{flex: 1/10}}/>
              <View style={{flexDirection: 'row', flex: 8/10}}>
                <View style={{flex: 1/5, alignItems: 'flex-end', justifyContent: 'center'}}>
                  <Image source={require('./../images/logo.png')} style={styles.logo}/>
                </View>

                <View style={{flex: 4/5, flexDirection: 'column',justifyContent: 'center'}}>
                  <Text style={{fontSize: 10}}>SMCC Việt Nam</Text>
                  <Text style={{fontSize: 10}}>Công cụ thu thập, phân tích dữ liệu Mạng xã hội</Text>
                </View>
              </View>
              <View style={{flex: 1/10}}/>
            </View>

            <View style={{flex: 1/9}}></View>

            <View style={{
              flexDirection: 'column',alignItems:'flex-start',flex: 7/9}}>
              <View style={{alignSelf: 'stretch',marginBottom: 10,}}>
                <Hoshi
                  label='Email'
                  onChangeText={(text) => this.onChangeUsername(text)}
                  borderColor={'#1791D6'}
                  labelStyle={{ color: '#1791D6', fontSize: 12}}
                  inputStyle={{ color: '#808080', fontSize: 10, height: 5}}
                  activeColor={'#da7071'}
                  style={{height: 20, width: window.width,
                    marginLeft: 30,marginRight: 30, color: '#808080'}}
                />
              </View>

              <View style={{alignSelf: 'stretch',}}>
                <Hoshi
                  label='Password (optional)'
                  onChangeText={(text) => this.onChangePassword(text)}
                  borderColor={'#1791D6'}
                  secureTextEntry={true}
                  labelStyle={{ color: '#1791D6', fontSize: 12 }}
                  inputStyle={{ color: '#808080', fontSize: 10 }}
                  style={{height: 20, width: window.width,
                    marginLeft: 30,marginRight: 30}}
                />
              </View>

              <View style={{flexDirection: 'row',marginTop: 20,marginLeft: 30,marginRight: 30,}}>
                <View style={{flex: 1/4}}/>
                <Button
                    onPress={() => this.login()}
                    style={{borderColor: '#1791D6', flex: 2/4, backgroundColor: 'white', height: 30, borderRadius: 22}} textStyle={{fontSize: 10}}>
                  ĐĂNG NHẬP
                </Button>
                <View style={{flex: 1/4}}/>
              </View>
            </View>
          </View>

        )
    }


}

//module.exports = Login;
export default connect(mapStateToProps, mapDispatchToProps)(Login);