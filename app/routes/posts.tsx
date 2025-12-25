import {
	Card,
	ClientOnly,
	Container,
	For,
	Heading,
	HStack,
	Image,
	LinkOverlay,
	Separator,
	Text,
	Timeline,
} from "@chakra-ui/react";
import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";
import { NavLink } from "react-router";
import FormatDate from "~/components/format-date";
import type { PostType } from "~/interface/cms";
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
	return await getList<PostType>({
		fields: ["id", "title", "subtitle", "publishedAt", "coverImage"],
		limit: 100,
	});
}

export default function Page({ loaderData }: Route.ComponentProps) {
	return (
		<Container as="main">
			<HStack>
				<Heading>Blog</Heading>
				<Separator variant="dashed" flex={1} />
			</HStack>
			<Timeline.Root maxW="2xl" w="full" mx="auto">
				<For each={loaderData.contents}>
					{(post) => (
						<Timeline.Item key={post.id}>
							<Timeline.Connector>
								<Timeline.Separator />
								<Timeline.Indicator />
							</Timeline.Connector>
							<Timeline.Content>
								{post.publishedAt && (
									<Timeline.Description
										as="time"
										title={new TZDate(
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
											<FormatDate
												date={post.publishedAt}
												formatStr="yyyy年M月d日"
											/>
										</ClientOnly>
									</Timeline.Description>
								)}
								<Card.Root
									size="sm"
									data-hasimage={Boolean(post.coverImage) || undefined}
									css={{ "&[data-hasimage]": { roundedTop: "0" } }}
									_hover={{
										bg: "bg.muted",
									}}
									transition="backgrounds"
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
									<Card.Body>
										<LinkOverlay asChild>
											<Card.Title fontSize="xl" asChild>
												<NavLink to={`/posts/${post.id}`}>{post.title}</NavLink>
											</Card.Title>
										</LinkOverlay>
										{post.subtitle && <Text>{post.subtitle}</Text>}
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
