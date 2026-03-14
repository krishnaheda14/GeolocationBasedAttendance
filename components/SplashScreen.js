import {Dimensions,SafeAreaView,StyleSheet,Text,View,Image,Animated} from "react-native";
import React, { Component } from 'react';

class ImageLoader extends Component {
    state = {
      opacity: new Animated.Value(0),
    }
  
    onLoad = () => {
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  
    render() {
      return (
        <Animated.Image
          onLoad={this.onLoad}
          {...this.props}
          style={[
            {
              opacity: this.state.opacity,
              transform: [
                {
                  scale: this.state.opacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.85, 1],
                  })
                },
              ],
            },
            this.props.style,
          ]}
        />
      );
    }
  }
  

export default function CustomSplashScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.photoView}>
                <ImageLoader
                    style={{ width: 200, height: 200, marginBottom: 10 }}
                    source={require("../assets/PawSOS.png")}
                />
            </View>
            <View style={styles.labelView}>
                <ImageLoader
                    resizeMode="contain"
                    style={{ height: 100 }}
                    source={require("../assets/label.png")}
                />
                <Image
                    source={require("../assets/animation.gif")}
                    resizeMode="contain"
                    style={{ width: 400, height: 400 }}
                />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffe2c2",
        alignItems: "center",
        justifyContent: "center",
    },
    photoView: {
        flex: 2,
        justifyContent: "flex-end",
    },
    labelView: {
        flex: 3,
        justifyContent: "space-between",
        alignItems: "center",
    },
});
