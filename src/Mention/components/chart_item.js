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
} = require('react-native');
import { SmoothLine } from 'react-native-pathjs-charts'
const { Component } = React;
import Button from 'apsl-react-native-button'
const window = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import * as API from '../libs/backend'

var DATA = [];



module.exports = class ChartItem extends Component {
    render() {
        let data = [
            [{
                "name": 22,
                "y": -1000
            }, {
                "x": -9,
                "y": -729
            }, {
                "x": -8,
                "y": -512
            }, {
                "x": -7,
                "y": -343
            }, {
                "x": -6,
                "y": -216
            }, {
                "x": -5,
                "y": -125
            }, {
                "x": -4,
                "y": -64
            }, {
                "x": -3,
                "y": -27
            }, {
                "x": -2,
                "y": -8
            }, {
                "x": -1,
                "y": -1
            }, {
                "x": 0,
                "y": 0
            }, {
                "x": 1,
                "y": 1
            }, {
                "x": 2,
                "y": 8
            }, {
                "x": 3,
                "y": 27
            }, {
                "x": 4,
                "y": 64
            }, {
                "x": 5,
                "y": 125
            }, {
                "x": 6,
                "y": 216
            }, {
                "x": 7,
                "y": 343
            }, {
                "x": 8,
                "y": 512
            }, {
                "x": 9,
                "y": 729
            }, {
                "x": 10,
                "y": 1000
            }]
        ]

        let options = {
            width: 280,
            height: 280,
            color: '#2980B9',
            margin: {
                top: 20,
                left: 45,
                bottom: 25,
                right: 20
            },
            animate: {
                type: 'delayed',
                duration: 200
            },
            axisX: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'bottom',
                label: {
                    fontFamily: 'Arial',
                    fontSize: 14,
                    fontWeight: true,
                    fill: '#34495E'
                }
            },
            axisY: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'left',
                label: {
                    fontFamily: 'Arial',
                    fontSize: 14,
                    fontWeight: true,
                    fill: '#34495E'
                }
            }
        }

        return (
            <View>
                <SmoothLine data={data} options={options} xKey='name' yKey='y' />
            </View>
        )
    }
};/**
 * Created by vjtc0n on 1/11/17.
 */
/**
 * Created by vjtc0n on 1/11/17.
 */
