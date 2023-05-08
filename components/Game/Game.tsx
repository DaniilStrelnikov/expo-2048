import React, { useEffect } from "react";
import { View, useWindowDimensions } from "react-native";
import { Field } from "../Field/Field";
import { loadData } from "../Redux/GameSlice";
import { useDispatch } from "react-redux";
import { CellWrapper } from "../CellWrapper/CellWrapper";
import { ResultWrapper } from "../ResultWrapper/ResultWrapper";
import { PanGestureHandler } from "../PanGestureHandler/PanGestureHandler";
import style from "./style";
import { AppDispatch } from "../Redux/store";

export const Game = () => {
	const { width } = useWindowDimensions();
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(loadData());
	}, []);

	return (
		<View style={{ ...style.container, height: width - 32 }}>
			<PanGestureHandler>
				<View style={style.fieldWtapper}>
					{new Array(4).fill(0).map((_, x) => (
						<View key={"row" + x} style={{ flex: 1 }}>
							{new Array(4).fill(0).map((_, y) => (
								<Field
									position={{
										x,
										y,
									}}
									key={`${x} ${y}`}
								/>
							))}
						</View>
					))}
				</View>
			</PanGestureHandler>

			<CellWrapper />
			<ResultWrapper />
		</View>
	);
};
