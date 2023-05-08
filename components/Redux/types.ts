import { LayoutRectangle } from "react-native/types";

export enum Direction {
	left = "left",
	right = "right",
	up = "up",
	down = "down",
}

export const DirectionArray = [
	Direction.down,
	Direction.left,
	Direction.right,
	Direction.up,
];

export interface Position {
	x: number;
	y: number;
}

export interface PositionWithLayout {
	x: number;
	y: number;
	layout: LayoutRectangle;
}

export interface Cell {
	number: number;
	position: Position;
}

export interface GameField {
	gameField: {
		field: Cell[];
		shouldUpdate: boolean;
	};
	positions: PositionWithLayout[];
	isStarted: boolean;
	isMoved: boolean;
	isLoosed: boolean;
	isWin: boolean;
	lastScore: number;
	highScore: number;
	score: number;
}
