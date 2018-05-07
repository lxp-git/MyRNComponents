import { Platform, StatusBar, Dimensions } from 'react-native'
import {PixelRatio} from 'react-native';

if (!StatusBar.currentHeight) {
  StatusBar.currentHeight = 0
}

export const dp2px = dp=>PixelRatio.getPixelSizeForLayoutSize(dp);
export const px2dp = px=>PixelRatio.roundToNearestPixel(px);


export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight
export const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56

export const SCREEN_WIDTH = Dimensions.get('window').width
export const SCREEN_HIGHT = Dimensions.get('window').height

function uniquelize (array) {
  var ra = new Array()
  for (var i = 0; i < array.length; i++) {
    if (!ra.contains(array[i])) {
      ra.push(this[i])
    }
  }
  return ra
}
export const intersect = (a: Array, b: Array) => {

  return a.forEach((o) => {return b.includes(o) ? o : null})
}


//自定义一个阶乘函数，就是有n个数相乘，从m开始，每个数减1，如factorial(5,4)就是5*(5-1)*(5-2)*(5-3),相乘的数有4个
export const  factorial = (m,n) => {
  var num = 1;
  var count = 0;
  for(var i = m;i > 0;i--){
    if(count == n){//当循环次数等于指定的相乘个数时，即跳出for循环
      break;
    }
    num = num * i;
    count++;
  }
  return num;
}
//自定义组合函数(就是数学排列组合里的C)
export const MATH_C = (m,n) => {
  if(m<n){
    return 0;
  }
  return factorial(m,n)/factorial(n,n);//就是Cmn(上面是n，下面是m) = Amn(上面是n，下面是m)/Ann(上下都是n)
}


//自定义排列函数(就是数学排列组合里的A)
export const MATH_A = (m,n) => {
  return factorial(m,n);//就是数学里的Amn,上面是n，下面是m
}
