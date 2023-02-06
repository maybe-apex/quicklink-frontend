"use client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import "./globals.css";
import customTheme from "./theme";

import { Provider } from "react-redux";
import { store } from "./store";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head />
			<body>
				<Provider store={store}>
					<ChakraProvider theme={customTheme}>
						<ColorModeScript initialColorMode={"dark"} />
						{children}{" "}
					</ChakraProvider>
				</Provider>
			</body>
		</html>
	);
}