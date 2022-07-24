import { BlurView } from "expo-blur";
import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground, StyleSheet, useColorScheme,
  View
} from "react-native";
import Animated, {
  SensorType, SlideInDown, SlideInUp, useAnimatedSensor,
  useAnimatedStyle
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

const earthUrl = require("./assets/earth.png")

export default SendModal = ({}) => {
  const colorScheme = useColorScheme();


  const animatedSensor = useAnimatedSensor(SensorType.ROTATION, {
    interval: 100,
  });

  const style = useAnimatedStyle(() => {
    const { pitch, yaw } = animatedSensor.sensor.value;
    let yawValue =
      64 * (yaw < 0 ? 2.5 * Number(yaw.toFixed(2)) : Number(yaw.toFixed(2)));
    let pitchValue = 36 * pitch.toFixed(2);
    return {
      transform: [
        {
          translateX: pitchValue,
        },
        {
          translateY: yawValue,
        },
        {
          rotate: pitchValue / 2 + "deg",
        },
        {
          skewX: "4deg",
        },
      ],
    };
  });

  const rocketStyle = useAnimatedStyle(() => {
    const { yaw } = animatedSensor.sensor.value;
    let yawValue =
      54 * (yaw < 0 ? 2.5 * Number(yaw.toFixed(2)) : Number(yaw.toFixed(2)));
    return {
      transform: [
        {
          translateY: yawValue / 3,
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={
          colorScheme === "light"
            ? require("./assets/bg6.png")
            : require("./assets/bg8.png")
        }
        resizeMode="cover"
        style={styles.image}
      >
        <BlurView intensity={50} style={styles.blurView}></BlurView>
        <View
          style={[
            styles.centeredView,
            {
              backgroundColor:
                colorScheme === "light"
                  ? "rgba(0,0,0,0.85)"
                  : "rgba(0,0,0,0.65)",
            },
          ]}
        >
          <Image
            source={require("./assets/stars.png")}
            style={[
              {
                position: "absolute",
                zIndex: -1,
                width: width,
                height: height,
                opacity: 1
              },
            ]}
            resizeMode="cover"
          />
          <Animated.Image
            entering={SlideInUp.duration(24000)}
            source={require("./assets/moon.png")}
            style={[
              {
                position: "absolute",
                zIndex: -1,
                width: width,
                height: width,
                top: -width / 2.5,
                right: -width / 2.5,
                shadowColor: "white",
                shadowOffset: { width: 0, height: 0 },
                shadowRadius: 30,
                shadowOpacity: 0.6,
              },
            ]}
            resizeMode="contain"
          />
          <Animated.Image
            entering={SlideInDown.duration(9000).randomDelay()}
            source={require("./assets/spaceman.png")}
            style={[
              style,
              {
                position: "absolute",
                zIndex: 99,
                width: height / 1.5,
                height: height / 1.5,
                shadowColor: "plum",
                shadowOffset: { width: 0, height: 0 },
                shadowRadius: 30,
                shadowOpacity: 0.8,
              },
            ]}
            resizeMode="contain"
          />

          <Animated.Image
            entering={SlideInDown.duration(48000)}
            source={require("./assets/rocket.png")}
            style={[
              rocketStyle,
              {
                position: "absolute",
                zIndex: 8,
                top: width / 4,
                left: 12,
                width: width / 3,
                height: width / 3,
                shadowColor: "plum",
                shadowOffset: { width: 0, height: 0 },
                shadowRadius: 10,
                shadowOpacity: 0.6,
              },
            ]}
            resizeMode="contain"
          />
          <Animated.Image
            entering={SlideInUp.duration(15000)}
            source={earthUrl}
            style={[
              {
                position: "absolute",
                top: width,
                left: -width / 2,
                zIndex: 1,
                width: height,
                height: height * 1.5,
                shadowColor: "blue",
                shadowOffset: { width: 0, height: 0 },
                shadowRadius: 100,
                shadowOpacity: 0.8,
              },
            ]}
            resizeMode="contain"
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  image: {
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  modalBk: {
    width: width,
    height: height,
    position: "absolute",
    top: 0,
    zIndex: 1,
    backgroundColor: "transparent",
  },
  gradient: {
    height: height,
    width: width,
    position: "absolute",
    bottom: 0,
    zIndex: -1,
    opacity: 0.1,
  },
  centeredView: {
    height: height,
    width: width,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  blurView: {
    position: "absolute",
    top: 0,
    width: width,
    height: height,
  },
  modalView: {
    width: width - 48,
    minHeight: width,
    paddingTop: 24,
    borderRadius: 24,
    marginVertical: "33.3%",
    margin: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
  },
  button: {
    backgroundColor: "transparent",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    position: "absolute",
    bottom: 48,
    zIndex: 1,
    alignSelf: "center",
    paddingVertical: 12,
    backgroundColor: "rgba(255,255,255,0.5)",
    paddingHorizontal: 48,
    borderRadius: 99,
  },
  textStyle: {
    color: "grey",
    fontWeight: "bold",
    textAlign: "center",
  },
});
