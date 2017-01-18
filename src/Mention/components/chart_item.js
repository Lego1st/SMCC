const React = require('react');
const {
    Dimensions,
    StyleSheet,
    ScrollView,
    View,
    TouchableHighlight,
    Image,
    ListView,
    Text,
    WebView
} = require('react-native');
const { Component } = React;
import Button from 'apsl-react-native-button'
const window = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import * as API from '../libs/backend'
import WebViewBridge from 'react-native-webview-bridge';

var DATA = [];



module.exports = class ChartItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentWillMount() {
        console.log(this.props.product_id)
        this.setState({
            object: {
                user_id: "ABC"
            }
        })

    }


    onBridgeMessage(message) {
        const { webviewbridge } = this.refs;

        switch (message) {
            case "hello from webview":
                webviewbridge.sendToBridge(JSON.stringify(this.state.object));
                break;
            case "got the message inside webview":
                console.log("we have got a message from webview! yeah");
                break;
        }
    }
    render() {
        return (
            <View style={{height: 1300}}>
                <WebViewBridge
                    //domStorageEnabled={true}
                    //scalesPageToFit={true}
                    javaScriptEnabled={true}
                    automaticallyAdjustContentInsets={false}
                    scrollEnabled={false}
                    onBridgeMessage={this.onBridgeMessage.bind(this)}
                    ref="webviewbridge"
                    source={require('./chart/chart.html')}
                    //source={{uri: 'https://google.com/'}}
                    style={{height: window.height}}
                />
            </View>
        )
    }
};/**
 * Created by vjtc0n on 1/11/17.
 */
/**
 * Created by vjtc0n on 1/11/17.
 */
