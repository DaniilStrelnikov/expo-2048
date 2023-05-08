import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
	clearSimmilarCells,
	generateFewCell,
	generateNewGameField,
	moveWithDirection,
	saveData,
} from "./helpers";
import { DirectionArray, GameField, PositionWithLayout } from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState: GameField = {
	gameField: {
		field: [],
		shouldUpdate: false,
	},
	positions: [],
	isStarted: false,
	isMoved: false,
	isLoosed: false,
	isWin: false,
	lastScore: 0,
	highScore: 0,
	score: 0,
};

export const loadData = createAsyncThunk("GameSlice/loadData", async () => {
	let data;
	try {
		data = JSON.parse((await AsyncStorage.getItem("state")) || "");
	} catch (err) {
		console.error("cannot parse state");
		throw 400;
	}

	return data;
});

export const GameSlice = createSlice({
	name: "counter",
	initialState,
	extraReducers: (builder) => {
		builder.addCase(loadData.fulfilled, (state, action: any) => {
			if (action.payload) {
				state.gameField = action.payload.gameField;
				state.positions = action.payload.positions;
				state.isStarted = action.payload.isStarted;

				state.isLoosed = action.payload.isLoosed;
				state.isWin = action.payload.isWin;
				state.lastScore = action.payload.lastScore;
				state.highScore = action.payload.highScore;
				state.score = action.payload.score;
				state.isStarted = true;
			}
		});
		builder.addCase(loadData.rejected, (state) => {
			state = {
				...initialState,
				lastScore: state.lastScore,
				highScore: state.highScore,
			};
			state.gameField.field = generateNewGameField();
		});
	},
	reducers: {
		start: (state) => {
			state.gameField.shouldUpdate = true;
			state.isStarted = true;
		},
		clear: (state) => {
			state.gameField.shouldUpdate = true;
			state.gameField.field = [];
		},
		setLayoutToPosition: (state, action: PayloadAction<PositionWithLayout>) => {
			state.positions.push(action.payload);

			state.gameField = JSON.parse(JSON.stringify(state.gameField));
			state.gameField.shouldUpdate = true;
			state.isStarted = true;
		},
		newGame: (state) => {
			state.score = initialState.score;
			state.isStarted = true;
			state.isLoosed = false;
			state.isWin = false;
			state.gameField.field = generateNewGameField();
			state.gameField.shouldUpdate = true;
			saveData(state);
		},
		move: (state, action: PayloadAction<string>) => {
			state.gameField.shouldUpdate = true;
			if (moveWithDirection(action.payload, state.gameField.field, false)) {
				moveWithDirection(action.payload, state.gameField.field);
				state.isMoved = true;
			}
		},
		finishMove: (state) => {
			const newState = clearSimmilarCells(state.gameField.field, state.score);
			state.gameField.shouldUpdate = false;
			state.gameField.field = newState.newGameField;
			state.score = newState.score;

			if (state.isMoved) {
				state.gameField.field = generateFewCell(state.gameField.field);
				state.isMoved = false;
			}

			let canMove = false;
			DirectionArray.map((el) => {
				if (moveWithDirection(el, state.gameField.field, false)) canMove = true;
			});

			if (!canMove) {
				state.lastScore = state.score;
				state.isLoosed = true;
				state.highScore =
					state.score > state.highScore ? state.score : state.highScore;
			}

			saveData(state);
		},
	},
});

export const { move, newGame, setLayoutToPosition, start, clear, finishMove } =
	GameSlice.actions;

export default GameSlice.reducer;
