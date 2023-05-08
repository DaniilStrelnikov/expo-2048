import { SafeAreaView, View } from "react-native";
import { Text, TextType } from "./components/Text/Text";
import { Game } from "./components/Game/Game";
import { Provider } from "react-redux";
import { store } from "./components/Redux/store";
import { Footer } from "./components/Footer/Footer";
import style from "./style";

export default function App() {
	return (
		<Provider store={store}>
			<SafeAreaView style={style.safeArea}>
				<View style={style.container}>
					<Text type={TextType.header}>2048</Text>
				</View>

				<Game />
				<Footer />
			</SafeAreaView>
		</Provider>
	);
}
