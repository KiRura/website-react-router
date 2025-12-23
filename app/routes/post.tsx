import { Container, Heading, Image } from "@chakra-ui/react";
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
		<Container as="main">
			{loaderData.coverImage && (
				<Image
					src={loaderData.coverImage.url}
					alt={loaderData.coverImage.alt}
					w="full"
					h="40"
				/>
			)}
			<Heading as="h1">{loaderData.title}</Heading>
			{loaderData.subtitle && <Heading>{loaderData.subtitle}</Heading>}
			<Prose
				size="lg"
				mx="auto"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <cmsからのhtml>
				dangerouslySetInnerHTML={{ __html: loaderData.content }}
			/>
		</Container>
	);
};
