const color = {
	2: "#59ff00",
	4: "#00ff93",
	8: "#00bfff",
	16: "#0092ff",
	32: "#0020ff",
	64: "#3100ff",
	128: "#6b00ff",
	256: "#ca00ff",
	512: "#ff006b",
};

export const getColor = (number: number) => {
	if (number > 512) {
		return color[512];
	} else return color[number as keyof typeof color];
};

export const getTextColor = (number: number) => {
	if (number < 16) {
		return "#252525";
	} else return "white";
};

// "59ff00"
// "00ff93"
// "00ffa9"
// "00bfff"
// "0092ff"
// "0020ff"
// "3100ff"
// "6b00ff"
// "ca00ff"
// "ff006b"
// "ff003b"
// "ff0000"
