import { Center, type CenterProps, SimpleGrid, Text } from "@chakra-ui/react";

export default function ZZZ(
	props: CenterProps & {
		disableHighlight?: boolean;
		disableOptimize?: boolean;
		text?: string;
	},
) {
	const columns = 5;
	const num = columns * 20;
	const kirura = new Array(num).fill(0).map((_, index) => ({
		index,
		p: () => (
			<Text
				data-highlight={
					(!props.disableHighlight && num / 2 <= index) || undefined
				}
				data-right={index % (columns * 2) >= columns || undefined}
				data-optimize={
					(!props.disableOptimize && columns * 2 <= index) || undefined
				}
				aria-hidden
				fontSize="16rem"
				fontWeight="black"
				fontStyle="italic"
				fontStretch="ultra-condensed"
				px="3"
				color="fg.subtle/8"
				m="-2px"
				lineHeight={0.9}
				whiteSpace="nowrap"
				animationName="slide-to-left-full"
				animationDuration="37s"
				animationIterationCount="infinite"
				animationTimingFunction="linear"
				css={{
					"&[data-highlight]": {
						bg: "orange.400",
						color: "white/8",
					},
					"&[data-optimize]": {
						smDown: {
							display: "none",
						},
					},
					"&[data-right]": {
						animationName: "slide-to-right-full",
					},
				}}
			>
				{props.text || "KiRura"}
			</Text>
		),
	}));

	return (
		<Center {...props} animationName="fade-in" animationDuration="slow">
			<SimpleGrid
				css={{ "--columns": columns }}
				rotate={["-90deg", "-45deg"]}
				templateColumns="repeat(var(--columns), fit-content(100%))"
			>
				{kirura.map((kirura) => (
					<kirura.p key={`zzz-${kirura.index}`} />
				))}
			</SimpleGrid>
		</Center>
	);
}
