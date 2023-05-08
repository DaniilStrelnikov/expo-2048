import React, { useRef, useState } from "react";

import {
	GestureEvent,
	PanGestureHandler as BasePanGestureHandler,
	PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import { finishMove, move } from "../Redux/GameSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { Direction, Position } from "../Redux/types";

type Props = {
	children: React.ReactNode;
};

export const PanGestureHandler = ({ children }: Props) => {
	const [beganPos, setBeganPos] = useState<Position>();
	const canMove = useRef(true);

	const isLoosed = useSelector((root: RootState) => root.GameReducer.isLoosed);
	const dispatch = useDispatch();

	const compareDistanceByAxis = (
		currentPos: Position,
		axis: keyof Position
	) => {
		if (!beganPos) return;

		const distance = beganPos[axis] - currentPos[axis];

		if (distance < -100) return -1;
		if (distance > 100) return 1;

		return undefined;
	};

	const moveByDirection = (axis: keyof Position, dir: number) => {
		setBeganPos(undefined);
		canMove.current = false;

		if (axis === "x") {
			dispatch(move(dir > 0 ? Direction.left : Direction.right));
		}

		if (axis === "y") {
			dispatch(move(dir > 0 ? Direction.up : Direction.down));
		}

		setTimeout(() => {
			dispatch(finishMove());
			canMove.current = true;
		}, 200);
	};

	const handleGestureEvent = (
		e: GestureEvent<PanGestureHandlerEventPayload>
	) => {
		if (!canMove.current || isLoosed) return;

		const currentPos: Position = {
			x: e.nativeEvent.x,
			y: e.nativeEvent.y,
		};

		const xDir = compareDistanceByAxis(currentPos, "x");
		const yDir = compareDistanceByAxis(currentPos, "y");

		if (xDir) moveByDirection("x", xDir);
		else if (yDir) moveByDirection("y", yDir);
	};

	return (
		<BasePanGestureHandler
			onBegan={(e) =>
				setBeganPos({
					x: e.nativeEvent.x as number,
					y: e.nativeEvent.y as number,
				})
			}
			onGestureEvent={(e) => handleGestureEvent(e)}
		>
			{children}
		</BasePanGestureHandler>
	);
};
