/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text, Touchable,
  View
} from 'react-native'
import StepMarqueeView, { HEIGHT, LENGTH } from './components/StepMarqueeView'
import CustomService from './components/CustomService'
import AutoFlatList from './components/AutoFlatList'

type Props = {};

const winOrderList = [{
  userName: 'userName1',
  money: '50',
},{
  userName: 'userName2',
  money: '100',
},{
  userName: 'userName3',
  money: '50',
},{
  userName: 'userName4',
  money: '200',
},{
  userName: 'userName5',
  money: '50',
},]

export default class App extends Component<Props> {

  componentDidMount(){
    global.customServiceView = new CustomService();
    global.customServiceView.show();
  }

  render() {
    return (
      <View style={styles.container}>
        {winOrderList && winOrderList.length > 0 ? <StepMarqueeView
          duration={winOrderList.length * 100}
          marqueeOnMount
          scroll={false}
          style={{
            height: LENGTH * HEIGHT,
            backgroundColor: 'white',
          }}
          data={winOrderList}
          renderItem={(item, index) => {
            let {userName} = item
            userName = userName.replace(userName.substr(1, userName.length - 4), '******')
            return (
              <View
                key={'winOrderList' + index}
                style={{
                  height: HEIGHT,
                  alignItems: 'center',
                  // paddingTop: 8,
                  // paddingBottom: 8,
                  paddingLeft: 28,
                  paddingRight: 28,
                  flexDirection: 'row',
                  // marginBottom: 16,
                }}
              >
                <Text style={{
                  flex: 1,
                  fontSize: 12,
                }}>{userName}</Text>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 12,
                    color: 'red',
                    fontWeight: 'bold',
                  }}
                >
                  获得{item.money}元话费充值卡奖励
                </Text>
              </View>
            )
          }}
        /> : <Text style={{
          marginTop: 1,
          backgroundColor: 'white',
          textAlign: 'center',
          padding: 40,
        }}
        >暂无任何中奖记录
        </Text>}


        <AutoFlatList
          data={[]}
          renderItem={({item}) => (
            <Touchable
              style={{
                flexDirection: 'row',
                width: '100%',
                padding: 16,
                backgroundColor:'white'
              }}

              onPress={()=>{
                this.props.dispatch(goNewsDetails(item))
              }}
            >
              <View style={{flex:1}}>
                <Text style={{fontSize: 17}}>{item.title}</Text>
                <View style={{flexDirection: 'row', marginTop: '16'}}>
                  <Text style={{fontSize: 12}}>{item.from}</Text>
                  <Text style={{fontSize: 12, marginLeft: '16'}}>{item.cnum}</Text>
                </View>
              </View>
              <Image
                style={{
                  width: 88,
                  height: 88-28,
                }}
                source={{uri: item.banner}}
              />
            </Touchable>
          )}
          fetchData={(data) => this.props.dispatch(createAction('news/getList')({
            mid: 1046,
            page: data.page,
            limit: data.limit,
          }))}
          keyExtractor = {(item, index) => item.nid}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
