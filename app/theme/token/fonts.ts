import { defineTokens } from "@chakra-ui/react";

const sansSerif = `Inter, "Noto Sans JP", sans-serif`;

export default defineTokens({
	fonts: {
		body: { value: sansSerif },
		heading: { value: sansSerif },
		mono: { value: `"Google Sans Code", "M PLUS 1 Code", monospace` },
	},
}).fonts;
