import { defineRecipe } from "@chakra-ui/react";
import { containerRecipe } from "@chakra-ui/react/theme";

export default defineRecipe({
	...containerRecipe,
	base: {
		...containerRecipe.base,
		animationName: "fade-in",
		animationDuration: "slow",
	},
});
