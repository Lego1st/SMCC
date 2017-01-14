import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    Platform,
    ListView,
    ScrollView,
    TouchableOpacity,
    Dimensions
} from 'react-native';
const SideMenu = require('react-native-side-menu');
import Button from 'apsl-react-native-button'
import Icon from 'react-native-vector-icons/FontAwesome'
import Menu from '../components/menu_item';
import MentionItem from '../components/mention_item';
import ChartItem from '../components/chart_item';
import * as API from  '../libs/backend'
import TabBar from '../components/tabBar';
import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';

const window = Dimensions.get('window');


const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 20,
    padding: 10,
      borderWidth: 1
  },
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
      marginTop: 20
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 5,
    fontSize: 20,
  },
});

function mapStateToProps(state) {
    return {
        global: state.global
    };
}

class Basic extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            DATA: [],
            listMention: ds.cloneWithRows([]),
            Mentions: {},
            Analysis: {},
            statePage: 0,
            isOpen: false,
            selectedItem: '',
        };
    }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen, });
  }

    onItemMentionSelected = (item, keyword) => {
        console.log(keyword)
    this.setState({
      isOpen: false,
      selectedItem: item,
      statePage: 0,
      keyWord: keyword
    });
      API.getAllMentions(keyword, this.props.global.user.user_name, this.props.global.user.password)
          .then((results) => {
              console.log(results)
              const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
              this.setState({
                  Mentions: results,
                  listMention: ds.cloneWithRows(results.results)
              })
          })
  }

    onItemAnalysisSelected = (item, keyword) => {
        this.setState({
            isOpen: false,
            selectedItem: item,
            statePage: 1,
            keyWord: keyword
        });
        // API.getAllAnalysis(keyword, 'admin@orm.vn', '1b4727a96eb05921e68228341642b529')
        //     .then((results) => {
        //         console.log(results)
        //         this.setState({
        //             Analysis: results
        //
        //         })
        //     })
    }

  componentDidMount() {
    API.getAllProjects(this.props.global.user.user_id, this.props.global.user.user_name, this.props.global.user.password)
        .then((results) => {
          //console.log(results)
            this.setState({
              DATA: results,
              selectedItem: results[0]["project_name"]
            })
            API.getAllMentions(results[0]["project_keyword_value"], this.props.global.user.user_name, this.props.global.user.password)
                .then((results) => {
                    console.log(results)
                    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                    this.setState({
                        Mentions: results,
                        listMention: ds.cloneWithRows(results.results)
                    })
                })
        })

  }

  render() {
      //console.log(this.state.DATA)
      console.log(this.props.global.user)
    const menu = <Menu
                    DATA={this.state.DATA}
                    onItemMentionSelected={this.onItemMentionSelected}
                    onItemAnalysisSelected={this.onItemAnalysisSelected}/>;

    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}>
        <View style={{flexDirection: 'column', flex: 1}}>
            <View style={{flexDirection: 'row', borderWidth:0
            , backgroundColor: 'black', height: window.height/15
            , alignItems: 'center', justifyContent: 'space-between'
            , paddingLeft: 10, paddingRight: 15}}>
              <Button
                  onPress={() => this.toggle()}
                  style={{height: 30, width: 30, borderWidth: 1, alignSelf: 'center'
                            , justifyContent: 'center'
                            , marginBottom: 0, alignItems: 'center'}}>
                  <Icon
                      name="bars" size={20} style={{color: '#FFF'}} />
              </Button>
              <Text style={styles.instructions}>
                  {this.state.selectedItem}
              </Text>
              <Text style={{color: 'white'}}>Lọc</Text>
            </View>
            <View style={{backgroundColor: 'white', flex: 1}}>
                <ScrollableTabView
                    style={{backgroundColor: 'white' }}
                    tabBarPosition="bottom"
                    renderTabBar={() => <TabBar />}
                >
                    <ScrollView tabLabel="ios-paper" style={{height: 700, backgroundColor: 'white'}}>
                        <ListView
                            renderSeparator={(sectionId, rowId) => <View key={rowId}
                                                                     style={{ flex: 1, backgroundColor: '#F8F8F8'
                                                                         , height: 5}} />}
                            enableEmptySections={true}
                            dataSource={this.state.listMention}
                            renderRow={(rowData) => <MentionItem rowData={rowData}/>}
                        />
                    </ScrollView>
                    <ScrollView tabLabel="ios-papers" style={{height: 700, backgroundColor: 'white'}}>
                        <ChartItem/>
                    </ScrollView>
                    <ScrollView tabLabel="ios-people" style={{height: 700, backgroundColor: 'white'}}>
                        <ChartItem/>
                    </ScrollView>
                </ScrollableTabView>
            </View>
        </View>

      </SideMenu>
    );
  }
};

export default connect(mapStateToProps)(Basic);
