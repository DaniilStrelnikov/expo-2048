import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text, TextType } from "../Text/Text";
import style from "./style";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { newGame } from "../Redux/GameSlice";

export const Footer = () => {
	const dispatch = useDispatch();
	const { score, lastScore, highScore, isLoosed, isWin } = useSelector(
		(root: RootState) => root.GameReducer
	);

	const handleNewGame = () => {
		dispatch(newGame());
	};

	return (
		<View style={style.container}>
			{isLoosed || isWin ? (
				<>
					<Text>Last score: {lastScore}</Text>
					<View style={style.marginWrapper}>
						<Text>Top score: {highScore}</Text>
					</View>

					<TouchableOpacity
						activeOpacity={0.6}
						style={style.button}
						onPress={handleNewGame}
					>
						<Text type={TextType.header}>PLAY MORE</Text>
					</TouchableOpacity>
				</>
			) : (
				<Text type={TextType.header}>SCORE: {score}</Text>
			)}
		</View>
	);
};
