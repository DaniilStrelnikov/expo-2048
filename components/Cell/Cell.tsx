import React, { useState, useEffect, useRef } from "react";
import { Animated } from "react-native";
import { Cell as ICell, Position, PositionWithLayout } from "../Redux/types";
import { RootState } from "../Redux/store";
import { useSelector } from "react-redux";
import { getColor, getTextColor } from "../Field/colors";
import { Text, TextType } from "../Text/Text";
import style from "./style";

const getPosByCell = (cell: ICell, positions: any) => {
	return positions.find(
		(pos: any) => pos.x === cell.position.x && pos.y === cell.position.y
	);
};

type Props = {
	cell: ICell;
	animate: boolean;
};

export const Cell = ({ cell, animate }: Props) => {
	const [pos, setPos] = useState<PositionWithLayout>();
	const xPos = useRef(new Animated.Value(100)).current;
	const yPos = useRef(new Animated.Value(100)).current;

	const { positions, isStarted } = useSelector(
		(root: RootState) => root.GameReducer
	);

	useEffect(() => {
		const position = getPosByCell(cell, positions) as PositionWithLayout;
		const xOffset = cell.position.x * (position?.layout.width + 12);

		if (!pos && isStarted && position?.layout) {
			setPos(position);
			xPos.setValue(position?.layout.x + xOffset);
			yPos.setValue(position?.layout.y);
		}

		setPos(position);
	}, [cell]);

	useEffect(() => {
		const position = getPosByCell(cell, positions) as PositionWithLayout;
		const xOffset = cell.position.x * (position?.layout.width + 12);

		if (!position?.layout) return;

		if (!isStarted) return;

		if (!animate) {
			yPos.setValue(position?.layout.y);
			xPos.setValue(position?.layout.x + xOffset);
			return;
		}

		handleAnimate(yPos, "y", position, 0);
		handleAnimate(xPos, "x", position, xOffset);
	}, [cell, isStarted, animate, positions]);

	const handleAnimate = (
		value: Animated.Value,
		axis: keyof Position,
		position: PositionWithLayout,
		offset: number
	) => {
		Animated.timing(value, {
			toValue: position?.layout[axis] + offset,
			duration: 150,
			useNativeDriver: false,
		}).start();
	};

	if (!isStarted || !pos) return null;

	const animatedStyles = {
		width: pos?.layout.width,
		height: pos?.layout.height,
		top: yPos,
		left: xPos,
		backgroundColor: getColor(cell.number),
	};

	return (
		<Animated.View
			style={{
				...style.container,
				...animatedStyles,
			}}
		>
			<Text type={TextType.button} color={getTextColor(cell.number)}>
				{cell.number}
			</Text>
		</Animated.View>
	);
};
