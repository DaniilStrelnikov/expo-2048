import React from "react";
import { LayoutChangeEvent, View } from "react-native";
import { setLayoutToPosition } from "../Redux/GameSlice";
import { useDispatch } from "react-redux";
import style from "./style";
import { Position, PositionWithLayout } from "../Redux/types";

type Props = {
	position: Position;
};

export const Field = ({ position }: Props) => {
	const dispatch = useDispatch();

	const handleLayout = (e: LayoutChangeEvent) => {
		dispatch(
			setLayoutToPosition({
				...position,
				layout: e.nativeEvent.layout,
			} as PositionWithLayout)
		);
	};

	return <View onLayout={handleLayout} style={style.container} />;
};
