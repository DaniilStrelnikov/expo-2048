import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { Text, TextType } from "../Text/Text";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import style from "./style";

export const ResultWrapper = () => {
	const isLoosed = useSelector((root: RootState) => root.GameReducer.isLoosed);

	const opacity = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.timing(opacity, {
			toValue: isLoosed ? 1 : 0,
			duration: 200,
			useNativeDriver: false,
		}).start();
	}, [isLoosed]);

	return (
		<Animated.View
			pointerEvents="none"
			style={{
				...style.container,
				opacity,
			}}
		>
			<Text type={TextType.game}>GAME OVER</Text>
		</Animated.View>
	);
};
