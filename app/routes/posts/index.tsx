import {
	Card,
	ClientOnly,
	Container,
	For,
	Image,
	LinkOverlay,
	Separator,
	Text,
	Timeline,
} from "@chakra-ui/react";
import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";
import { Link as RRLink } from "react-router";
import type { PostType } from "~/interface/cms";
import { getList } from "~/lib/cms.server";
import { logger } from "~/lib/logger";
import type { Route } from "./+types";

export function headers() {
	return {
		"Cache-Control": "max-age=60, state-while-revalidate=3600, public",
	};
}

export async function loader() {
	logger.info("fetching...", "all");
	return await getList<PostType>({
		fields: ["id", "title", "subtitle", "publishedAt", "coverImage"],
		limit: 100,
	});
}

export default function Page({ loaderData }: Route.ComponentProps) {
	return (
		<Container as="main" py="8">
			<Timeline.Root as="section" maxW="2xl" w="full" mx="auto">
				<For each={loaderData.contents}>
					{(post) => (
						<Timeline.Item key={post.id}>
							<Timeline.Connector>
								<Timeline.Separator />
								<Timeline.Indicator />
							</Timeline.Connector>
							<Timeline.Content as="article">
								{post.publishedAt && (
									<Timeline.Description
										asChild
										title={new TZDate(
											post.publishedAt,
											"Asia/Tokyo",
										).toISOString()}
										w="fit"
									>
										<time
											dateTime={new TZDate(
												post.publishedAt,
												"Asia/Tokyo",
											).toISOString()}
										>
											<ClientOnly
												fallback={format(
													new TZDate(post.publishedAt, "Asia/Tokyo"),
													"yyyy年M月d日",
												)}
											>
												{() =>
													// ???
													format(
														new Date(post.publishedAt ?? 0),
														"yyyy年M月d日",
													)
												}
											</ClientOnly>
										</time>
									</Timeline.Description>
								)}
								<Card.Root
									size="sm"
									variant="elevated"
									data-hasimage={Boolean(post.coverImage) || undefined}
									css={{ "&[data-hasimage]": { roundedTop: "0" } }}
									_hover={{
										bg: "bg.muted",
									}}
									transition="backgrounds"
									overflow="hidden"
								>
									{post.coverImage && (
										<>
											<Image
												src={post.coverImage.url}
												alt={post.coverImage.alt}
												w="full"
												aspectRatio={
													(post.coverImage.width ?? 1) /
														(post.coverImage.height ?? 1) <
													4 / 3
														? 4 / 3
														: (post.coverImage.width ?? 1) /
															(post.coverImage.height ?? 1)
												}
												loading="lazy"
											/>
											<Separator />
										</>
									)}
									<Card.Body spaceY="1">
										<Card.Title as="h1" fontSize="xl">
											<LinkOverlay asChild>
												<RRLink to={`/posts/${post.id}`} prefetch="render">
													{post.title}
												</RRLink>
											</LinkOverlay>
										</Card.Title>
										{post.subtitle && (
											<Text color="fg.muted">{post.subtitle}</Text>
										)}
									</Card.Body>
								</Card.Root>
							</Timeline.Content>
						</Timeline.Item>
					)}
				</For>
			</Timeline.Root>
		</Container>
	);
}
