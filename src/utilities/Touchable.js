import React from 'react'

import { TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'

// const Touchable = props => <TouchableOpacity activeOpacity={0.8} {...props} />

const Touchable = props => <TouchableOpacity  {...props} />
// const Touchable = (props: Props) => {
//   const { onPress, children, ...other } = props;
//   return (
//     <TouchableWithoutFeedback onPress={onPress && onPress}>
//       <View {...other}>{children}</View>
//     </TouchableWithoutFeedback>
//   );
// };
export default Touchable
