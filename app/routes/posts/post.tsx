import {
	Box,
	Container,
	Em,
	Heading,
	Image,
	Text,
	VStack,
} from "@chakra-ui/react";
import { Prose } from "~/components/ui/prose";
import { getPost } from "~/lib/cms.server";
import { logger } from "~/lib/logger";
import type { Route } from "./+types/post";

export function headers() {
	return {
		"Cache-Control": "max-age=60, must-revalidate",
	};
}

export async function loader({ params }: Route.LoaderArgs) {
	logger.info("fetching...", params.id);
	return await getPost(params.id);
}

export default ({ loaderData }: Route.ComponentProps) => {
	return (
		<Container
			as="main"
			maxW="full"
			py="8"
			animationName="slide-from-top, fade-in"
		>
			<article>
				<VStack
					data-hasimage={Boolean(loaderData.coverImage) || undefined}
					pos="relative"
					py="8"
					borderBottomWidth="1px"
					css={{
						"&[data-hasimage]": {
							borderWidth: "1px",
							px: "8",
						},
					}}
				>
					{loaderData.coverImage && (
						<Box
							_after={{
								content: `""`,
								pos: "absolute",
								w: "full",
								h: "full",
								top: "0",
								left: "0",
								bg: "bg/70",
								backdropFilter: "blur({blurs.2xl}) saturate(1.6)",
							}}
						>
							<Image
								src={loaderData.coverImage.url}
								alt={loaderData.coverImage.alt}
								pos="absolute"
								top="0"
								left="0"
								w="full"
								h="full"
							/>
						</Box>
					)}
					<Heading as="h1" size={["4xl", "5xl", "6xl", "7xl"]} zIndex="base">
						{loaderData.title}
					</Heading>
					{loaderData.subtitle && (
						<Text maxW="65ch" mx="auto" zIndex="base">
							<Em>{loaderData.subtitle}</Em>
						</Text>
					)}
				</VStack>
				<Prose
					size="lg"
					mx="auto"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: <cmsからのhtml>
					dangerouslySetInnerHTML={{ __html: loaderData.content }}
				/>
			</article>
		</Container>
	);
};
