import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { Cell as CellView } from "../Cell/Cell";
import style from "./style";

export const CellWrapper = () => {
	const gameField = useSelector(
		(root: RootState) => root.GameReducer.gameField
	);

	return (
		<View pointerEvents="none" style={style.container}>
			{gameField.field?.map((el, id) => (
				<CellView
					key={`${id}-cell`}
					cell={el}
					animate={gameField.shouldUpdate}
				/>
			))}
		</View>
	);
};
