import { Position, Cell, Direction } from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const generatePos = () => {
	return {
		x: Math.round(Math.random() * 3),
		y: Math.round(Math.random() * 3),
	} as Position;
};

export const generateFewCell = (field: Cell[]) => {
	const freeCellsCount = 16 - field.length;
	let count = Math.min(Math.round(Math.random() + 1), freeCellsCount);

	while (count > 0) {
		const newPos = generatePos();
		if (
			!field.find(
				(el) => el.position.x === newPos.x && el.position.y === newPos.y
			)
		) {
			field.push({
				number: Math.round(Math.random() * 5) < 2 ? 4 : 2,
				position: newPos,
			});
			count--;
		}
	}

	return field;
};

export const moveWithDirection = (
	dir: string,
	gameField: Cell[],
	move: boolean = true
) => {
	let rowAxis: keyof Position = "x";
	let columnAxis: keyof Position = "y";
	let verticalMultiplyer = 1;

	let isMoved = false;

	switch (dir) {
		case Direction.left: {
			rowAxis = "y";
			columnAxis = "x";
			verticalMultiplyer = -1;
			break;
		}
		case Direction.right: {
			rowAxis = "y";
			columnAxis = "x";
			break;
		}
		case Direction.up: {
			verticalMultiplyer = -1;
			break;
		}
	}

	for (let i = 3; i >= 0; i--) {
		let row = gameField.filter((el) => el.position[rowAxis] === i); // берем строку/колонку
		row = row.sort(
			(a, b) =>
				(a.position[columnAxis] - b.position[columnAxis]) * -verticalMultiplyer
		);

		if (!move) row = JSON.parse(JSON.stringify(row));

		let skipNext = false;
		row.map((el, id) => {
			if (skipNext) {
				skipNext = false;
				return;
			}

			if (el?.number == row[id - verticalMultiplyer]?.number && !skipNext) {
				row[id - verticalMultiplyer].position = el.position;
				row[id - verticalMultiplyer].number *= 2;
				el.number *= 2;
				skipNext = true;
				isMoved = true;
				return;
			}
		});

		let prewEl: Cell | undefined = undefined;

		row.map((el) => {
			if (prewEl === undefined) {
				prewEl = el;
				const zeroPos = verticalMultiplyer > 0 ? 3 : 0;

				if (el.position[columnAxis] == zeroPos) return;

				isMoved = true;
				el.position[columnAxis] = zeroPos;
			}

			if (el.position[columnAxis] === prewEl.position[columnAxis]) return;

			if (
				el.position[columnAxis] !==
				prewEl.position[columnAxis] - verticalMultiplyer
			) {
				isMoved = true;
				el.position[columnAxis] =
					prewEl.position[columnAxis] - verticalMultiplyer;
			}

			prewEl = el;
		});
	}

	return isMoved;
};

export const generateNewGameField = () => {
	const count = Math.round(Math.random() * 3 + 1);
	let hasFour = !!Math.round(Math.random());
	const positions: Position[] = [];

	const GameField: Cell[] = new Array(count).fill(0).map(() => {
		let newPos = generatePos();
		while (positions.find((el) => el.x === newPos.x && el.y === newPos.y)) {
			newPos = generatePos();
		}
		positions.push(newPos);

		const newCell = {} as Cell;
		if (hasFour) {
			hasFour = !hasFour;
			newCell.number = 4;
		} else newCell.number = 2;

		newCell.position = newPos;

		return newCell;
	});

	return GameField;
};

export const clearSimmilarCells = (field: Cell[], score: number) => {
	const newGameField: Cell[] = [];
	field.map((el) => {
		if (
			newGameField.find(
				(cell) =>
					cell.position.x === el.position.x && cell.position.y === el.position.y
			)
		) {
			score += el.number;
			return;
		}

		newGameField.push(el);
	});

	return {
		newGameField,
		score,
	};
};

export const saveData = (state: any) => {
	const stringifyState = JSON.stringify(state);
	AsyncStorage.setItem("state", stringifyState);
};
