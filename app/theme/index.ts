import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import container from "./recipe/container";
import fonts from "./token/fonts";

const config = defineConfig({
	theme: {
		recipes: {
			container,
		},
		tokens: {
			fonts,
		},
	},
});

export default createSystem(defaultConfig, config);
