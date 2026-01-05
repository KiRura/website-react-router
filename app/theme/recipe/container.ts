import { defineRecipe } from "@chakra-ui/react";

export default defineRecipe({
	base: {
		animationName: "fade-in",
		animationDuration: "slow",
		_motionReduce: {
			animation: "revert-layer",
		},
	},
});
