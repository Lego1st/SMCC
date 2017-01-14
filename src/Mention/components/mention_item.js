const React = require('react');
const {
    Dimensions,
    StyleSheet,
    Linking,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    ListView,
    Text,
} = require('react-native');
const { Component } = React;
import Button from 'apsl-react-native-button'
import HTMLView from 'react-native-htmlview'
const window = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import * as API from '../libs/backend'

var DATA = [];
const BACON_IPSUM = 'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket. ';


const styles = StyleSheet.create({
    menu: {
        flex: 1,
        width: 250,
        height: window.height,
        backgroundColor: '#222822',
        position: 'absolute',
        opacity: 1
    },
    avatarContainer: {
        marginBottom: 20,
    },
    name: {
        backgroundColor: '#1A1D1C',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 14,
        width: 250,
        height: window.height / 20,
        textAlign: 'center',
        color: 'white'
    },
    item: {
        fontSize: 14,
        fontWeight: '300',
        paddingTop: 5,
    },
    header: {
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
    },
    content: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
});


module.exports = class MentionItem extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(DATA),
            activeSection: false,
            collapsed: true,
        };
    }

    componentDidMount() {
        Linking.addEventListener('url', this._handleOpenURL);
    }
    componentWillUnmount() {
        Linking.removeEventListener('url', this._handleOpenURL);
    }
    _handleOpenURL(event) {
        console.log(event.url);
    }

    render() {
        let rate;
        let color;
        if (this.props.rowData.sentiment_score == 0) {
            rate = 'Tiêu cực'
            color= 'red'
        } else if(this.props.rowData.sentiment_score == 1){
            rate = 'Trung tính'
        }else{
            rate = 'Tích cực'
            color = 'green'
        }

        return (
            <TouchableOpacity
                onPress={() => Linking.openURL('https://www.facebook.com').catch(err => console.error('An error occurred', err))}
                style={{
          flexGrow: 1,
          flexDirection: 'column',
          backgroundColor: '#FFFFFF',
                marginBottom: 0,
                borderWidth: 0
        }}>
                <View style={{
                  flexDirection: 'row',
                  flex: 2/3,
                }}>
                    <Image
                        source={{uri: this.props.rowData.author_avatar_url}}
                        style={{flex: 2/10, width: 50, height: 50}}/>
                    <View style={{
                      paddingLeft: 10,
                      flexDirection: 'column',
                      flex: 6/10
                    }}>
                        <Text style={{fontSize: 18, color: '#000'}}> {this.props.rowData.author_real_name} </Text>
                        <Text style={{paddingLeft: 2, color: '#9AAE8A'}}> {this.props.rowData.created_date} </Text>
                    </View>
                    <View style={{flex: 2/10}}>
                        <Text style={{color: color}}> {rate} </Text>
                    </View>
                </View>
                <HTMLView
                    value={this.props.rowData.content_oryginal}
                    style={{flex: 1/3, color: '#000'}}
                />

            </TouchableOpacity>
        );
    }
};/**
 * Created by vjtc0n on 1/11/17.
 */
