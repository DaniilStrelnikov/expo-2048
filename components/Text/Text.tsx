import React from "react";
import { Text as Base } from "react-native";
import style from "./style";

export enum TextType {
	default = "default",
	header = "header",
	game = "game",
	button = "button",
}

type Props = {
	children: React.ReactNode;
	type?: TextType;
	color?: string;
};

export const Text = ({ type = TextType.default, children, color }: Props) => {
	return (
		<Base style={{ ...style[type], ...style.white, color: color || "white" }}>
			{children}
		</Base>
	);
};
