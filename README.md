# MyRNComponents
稍微整理了下React Native项目中手写的简单组件，类似：跑马灯，全局悬浮窗，全自动FlatList

## 部分效果图
![image](https://github.com/lxp-git/MyRNComponents/raw/master/src/resources/images/gifs/2018-05-07_09.36.08.gif)

## 全自动FlatList
一个思路，自动管理页码，只需要告诉他如何fetchData以及如何处理page，limit字段

```
<AutoFlatList
  data={newsList}
  renderItem={({item}) => (
    <Touchable
      style={{
        flexDirection: 'row',
        width: '100%',
        padding: horizontalSpace,
        backgroundColor:white
      }}

      onPress={()=>{
        this.props.dispatch(goNewsDetails(item))
      }}
    >
      <View style={{flex:1}}>
        <Text style={{fontSize: fontSizeTitle}}>{item.title}</Text>
        <View style={{flexDirection: 'row', marginTop: verticalSpace}}>
          <Text style={{fontSize: 12}}>{item.from}</Text>
          <Text style={{fontSize: 12, marginLeft: horizontalSpace}}>{item.cnum}</Text>
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
/>
```
