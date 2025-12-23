import {
	Card,
	Container,
	For,
	Heading,
	HStack,
	Image,
	LinkOverlay,
	Separator,
} from "@chakra-ui/react";
import { NavLink } from "react-router";
import { getList } from "~/lib/cms.server";
import { logger } from "~/lib/logger";
import type { Route } from "./+types/posts";

export function headers() {
	return {
		"Cache-Control": "max-age=60, must-revalidate",
	};
}

export async function loader() {
	logger.info("fetching...", "all");
	return await getList();
}

export default function Page({ loaderData }: Route.ComponentProps) {
	return (
		<Container as="main">
			<HStack>
				<Heading>Blog</Heading>
				<Separator variant="dashed" flex={1} />
			</HStack>
			<For each={loaderData.contents}>
				{(post) => (
					<Card.Root key={post.id}>
						{post.coverImage && (
							<Image
								src={post.coverImage.url}
								alt={post.coverImage.alt}
								h="20"
							/>
						)}
						<Card.Body>
							<LinkOverlay asChild>
								<Card.Title asChild>
									<NavLink to={`/posts/${post.id}`}>{post.title}</NavLink>
								</Card.Title>
							</LinkOverlay>
							{post.subtitle && <Heading as="h3">{post.subtitle}</Heading>}
						</Card.Body>
					</Card.Root>
				)}
			</For>
		</Container>
	);
}
