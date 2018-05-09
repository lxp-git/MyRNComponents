/**
 * 全自动flatlist，就是那种要多自动就有多自动的那种
 */


import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, ViewPropTypes } from 'react-native'
import { borderColor } from '../resources/themes/customize/colors'

export const RefreshState = {
  Idle: 0,
  HeaderRefreshing: 1,
  FooterRefreshing: 2,
  NoMoreData: 3,
  Failure: 4,
  EmptyData: 5,
}

type Props = {
  refreshState: number,
  onHeaderRefresh: Function,
  onFooterRefresh?: Function,
  data: Array<any>,

  footerContainerStyle?: ViewPropTypes.style,
  footerTextStyle?: ViewPropTypes.style,

  listRef?: any,

  footerRefreshingText?: string,
  footerFailureText?: string,
  footerNoMoreDataText?: string,
  footerEmptyDataText?: string,

  /**
   * 渲染条目的方法
   */
  renderItem: Function,

  /**
   * 获取数据的方式，
   *
   * onRefresh 和 onEndReached 会带上对应的参数（比如：页码）调用该方法
   */
  fetchData: Function,
}

type State = {
  /**
   * 最终显示的数据
   */
  finalData: Array
}

class AutoFlatList extends Component<Props, State> {
  static defaultProps = {
    footerRefreshingText: '数据加载中…',
    footerFailureText: '点击重新加载',
    footerNoMoreDataText: '已加载全部数据',
    footerEmptyDataText: '暂时没有相关数据',
  }

  constructor (props) {
    super(props)
    this.state = {
      finalData: props.data,
      refreshState: RefreshState.HeaderRefreshing,
      page: 1,
      limit: 10,
    }
  }

  componentDidMount () {
    // setTimeout(() => this.props.fetchData && this.props.fetchData({
    //   page: this.state.page,
    //   limit: this.state.limit,
    // }), 600)
    console.log('this.props.fetchData=',this.props.fetchData)
    this.props.fetchData && this.props.fetchData({
      page: this.state.page,
      limit: this.state.limit,
    })

  }

  componentWillReceiveProps (nextProps: Props) {

    if (nextProps.data !== this.props.data){
      if (nextProps.data.length > 0) {
        // 如果当前返回的有数据
        if (this.state.page === 1) {
          // 第一次加载或者是刷新
          this.setState({
            finalData: nextProps.data,
            refreshState: RefreshState.Idle,
          })
        } else {
          // 上拉加载更多
          this.setState({
            finalData: this.state.finalData.concat(nextProps.data),
            refreshState: RefreshState.Idle,
          })
        }
      } else {
        // 如果当前返回的没有数据
        if (this.state.page === 1) {
          // 当前界面没有数据
          this.setState({
            finalData: [],
            refreshState: RefreshState.EmptyData,
          })
        } else {
          // 没有更多的数据了
          this.setState({
            refreshState: RefreshState.NoMoreData,
          })
        }
      }
    }

  }

  shouldComponentUpdate (nextProps, nextState) {
    console.log('this.state === nextState',this.state === nextState);
    if (this.state === nextState) {
      return false
    } else {
      return true
    }
  }

  // componentDidUpdate (prevProps: Props, prevState: State) {
  //
  // }

  onRefresh = () => {
    this.setState({
      refreshState: RefreshState.HeaderRefreshing,
      page: 1,
    }, () => {
      this.props.fetchData && this.props.fetchData({
        page: this.state.page,
        limit: this.state.limit,
      })
    })
  }

  onEndReached = (info: { distanceFromEnd: number }) => {
    // console.log('refreshState == '+)
    if (this.state.refreshState !== RefreshState.Idle) {
      return
    }
    this.setState({
      refreshState: RefreshState.FooterRefreshing,
      page: this.state.page + 1,
    }, () => {
      this.props.fetchData && this.props.fetchData({
        page: this.state.page,
        limit: this.state.limit,
      })
    })
  }

  keyExtractor = (item, index) => item.id

  render () {
    const { renderItem, data, fetchData, ...rest} = this.props

    return (
      <FlatList
        ref={this.props.listRef}
        onEndReached={this.onEndReached}
        onRefresh={this.onRefresh}
        refreshing={this.state.refreshState === RefreshState.HeaderRefreshing}
        ListFooterComponent={this.renderFooter}
        onEndReachedThreshold={0.1}
        renderItem={renderItem}
        keyExtractor={this.keyExtractor}
        ItemSeparatorComponent={()=>(
          <View style={{backgroundColor:borderColor,height: 1,width: '100%'}}/>
        )}

        { ...rest }

        data={this.state.finalData}
      />
    )
  }

  renderFooter = () => {
    let footer = null

    const footerContainerStyle = [styles.footerContainer, this.props.footerContainerStyle]
    const footerTextStyle = [styles.footerText, this.props.footerTextStyle]
    const {
      footerRefreshingText, footerFailureText, footerNoMoreDataText, footerEmptyDataText,
    } = this.props

    switch (this.state.refreshState) {
      case RefreshState.Idle:
        footer = (<View style={footerContainerStyle}/>)
        break
      case RefreshState.Failure: {
        footer = (
          <TouchableOpacity
            style={footerContainerStyle}
            onPress={() => {
              this.props.onFooterRefresh && this.props.onFooterRefresh(RefreshState.FooterRefreshing)
            }}
          >
            <Text style={footerTextStyle}>{footerFailureText}</Text>
          </TouchableOpacity>
        )
        break
      }
      case RefreshState.EmptyData: {
        footer = (
          <TouchableOpacity
            style={footerContainerStyle}
            onPress={() => {
              this.props.onFooterRefresh && this.props.onFooterRefresh(RefreshState.FooterRefreshing)
            }}
          >
            <Text style={footerTextStyle}>{footerEmptyDataText}</Text>
          </TouchableOpacity>
        )
        break
      }
      case RefreshState.FooterRefreshing: {
        footer = (
          <View style={footerContainerStyle}>
            <ActivityIndicator size="small" color="#888888"/>
            <Text style={[footerTextStyle, {marginLeft: 7}]}>{footerRefreshingText}</Text>
          </View>
        )
        break
      }
      case RefreshState.NoMoreData: {
        footer = (
          <View style={footerContainerStyle}>
            <Text style={footerTextStyle}>{footerNoMoreDataText}</Text>
          </View>
        )
        break
      }
    }

    return footer
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 44,
  },
  footerText: {
    fontSize: 14,
    color: '#555555',
  },
})

export default AutoFlatList
