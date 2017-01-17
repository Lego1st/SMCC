import React, { Component } from 'react';
import {
    Alert,
    AppRegistry,
    ActivityIndicator,
    AsyncStorage,
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    Platform,
    ListView,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    RefreshControl
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
import Filter from '../components/filter'
const window = Dimensions.get('window');
import Modal from 'react-native-modalbox'

import CheckBox from 'react-native-custom-checkbox'

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
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => {
          r1 !== r2
        }});
        this.state = {
            DATA: [],
            listMention: ds.cloneWithRows([]),
            Mentions: {},
            Analysis: {},
            statePage: 0,
            isOpen: false,
            selectedItem: '',
            isRefreshing: false,
            keyWord: '',
            p: 1,
            rt: '',
            se: '',
            isFilter: false,
            isLoading: true,
            isLoadDisabled: false,
            fanpage: false,
        };
    }
    onRefresh() {
        this.setState({
          isRefreshing: true,
          p: 1
        }, () => {
          //console.log("ooooooooooooo")
          //console.log(this.state.keyWord)
          //console.log("ooooooooooooo")

          API.getAllMentions(this.state.keyWord, this.props.global.user.user_name, this.props.global.user.password, this.state.p, this.state.rt, this.state.se)
              .then((results) => {
                  //console.log(results)
                  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                  this.setState({
                      Mentions: results,
                      listMention: ds.cloneWithRows(results.results),
                      isRefreshing: false
                  })
              })
              .catch((error) => {
                this.setState({
                    Mentions: results,
                    listMention: ds.cloneWithRows(results.results),
                    isRefreshing: false
                })
                //console.log("something goes wrongggggg")
              });
        });
        //this.setState({ isRefreshing: false });
    }

    searchWhileScrolling() {
        //console.log("Searching...")
        p_new = this.state.p + 1
        this.setState({
          p: p_new
        }, () => {
          API.getAllMentions(this.state.keyWord, this.props.global.user.user_name, this.props.global.user.password, this.state.p, this.state.rt, this.state.se)
              .then((results) => {
                  //console.log(results)
                  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                  this.setState({
                      Mentions: results,
                      listMention: ds.cloneWithRows(results.results)
                  })
              })
        });
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
        //console.log(keyword)
    this.setState({
      isOpen: false,
      selectedItem: item,
      statePage: 0,
      keyWord: keyword
    });
      API.getAllMentions(keyword, this.props.global.user.user_name, this.props.global.user.password, this.state.p, this.state.rt, this.state.se)
          .then((results) => {
              //console.log(results)
              const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 });
              this.setState({
                  isLoading: true,
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
              keyWord: results[0]["project_keyword_value"],
              selectedItem: results[0]["project_name"]
            })
            API.getAllMentions(results[0]["project_keyword_value"], this.props.global.user.user_name, this.props.global.user.password, this.state.p, this.state.rt, this.state.se)
                .then((results) => {
                    //console.log(results)
                    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                    this.setState({
                        Mentions: results,
                        listMention: ds.cloneWithRows(results.results)
                    })
                })
        })

  }

  onFilterPress() {
    this.setState({isFilter: true});
  }

  onFanpageChange(name, cheked) {
    this.setState({rt: this.state.rt + '1'})
  }

  testtt() {
    Alert.alert(
      '',
      'My Alert Msg',
      [
      ]
    )
  }
  render() {
      //console.log(this.state.DATA)
      //console.log(this.props.global.user)
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
              <Text
                  onPress={this.onFilterPress.bind(this)}
                  style={{color: 'white'}}>Lọc</Text>


            </View>
            <View style={{backgroundColor: 'white', flex: 1}}>

                <ScrollableTabView
                    style={{backgroundColor: 'white' }}
                    tabBarPosition="bottom"
                    renderTabBar={() => <TabBar />}
                >

                <View style={{flex: 1}}
                tabLabel="ios-paper">
                    <ListView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={() => this.onRefresh()}
                                colors={['#EA0000']}
                                tintColor="black"
                                title="loading..."
                                titleColor="black"
                                progressBackgroundColor="white"
                                removeClippedSubviews={true}
                            />
                        }
                        onEndReachedThreshold={10}
                        onEndReached={() => this.searchWhileScrolling()}
                        renderSeparator={(sectionId, rowId) => <View key={rowId}
                                                                     style={{ flex: 1, backgroundColor: '#F8F8F8'
                                                                         , height: 5}} />}
                        enableEmptySections={true}
                        dataSource={this.state.listMention}
                        renderRow={(rowData) => <MentionItem rowData={rowData}/>}
                    />
                    <Modal
                      style = {{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 100, width: 200, borderRadius: 10}}
                      position={"center"}
                      isDisabled = {this.state.isLoadDisabled}
                      onOpened={() => {
                        this.setState({isLoadDisabled: true})
                        setInterval(() => {
                          this.setState({isLoadDisabled: false, isLoading: false})
                        }, 3000);
                      }}
                      isClose={!this.state.isLoading}
                      isOpen={this.state.isLoading}>
                        <ActivityIndicator
                          style={{justifyContent: 'center', alignItems: 'center'}}
                          size = "large"
                          color = "blue"
                        />
                        <Text textAlign='center'> Đang tải </Text>
                    </Modal>
                    <Modal
                        style={{justifyContent: 'center',alignItems: 'center', height: 400,width: 400}}
                        position={"center"} ref={"modal1"}
                        isDisabled={false}
                        onClosed={()=>this.setState({isFilter: false})}
                        isOpen={this.state.isFilter}>
                      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF'}}>
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
                              style = {{color: 'blue', backgroundColor: '#FFF',}}
                              onChange={() => this.setState({fanpage: false})}
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
                          <Button
                          onPress = {this.testtt.bind(this)}
                          style={{flex: 1/2, borderWidth: 1, borderColor: 'blue', borderRadius: 20, margin: 10}}> Lọc </Button>
                          <Button style={{flex: 1/2, borderWidth: 1, borderColor: 'blue', borderRadius: 20, margin: 10}}> Hủy </Button>
                        </View>
                      </View>
                    </Modal>
                    </View>
                    <ScrollView tabLabel="ios-papers" style={{height: 700, backgroundColor: 'white'}}>
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
