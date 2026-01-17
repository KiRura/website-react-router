import { Box, Code, Container, EmptyState, Spinner } from "@chakra-ui/react";
import {
	isRouteErrorResponse,
	type MetaFunction,
	Outlet,
	useNavigation,
} from "react-router";
import Footer from "~/components/navigation/footer";
import Header from "~/components/navigation/header";
import ZZZ from "~/components/zzz";
import { baseMeta } from "~/const/meta";
import type { Route } from "./+types/layout";

export const meta: MetaFunction = () => baseMeta;

export const links: Route.LinksFunction = () => [
	{
		rel: "icon",
		href: "/kirura/rounded/favicon.ico",
	},
];

export default function Layout() {
	const navigation = useNavigation();
	const isNavigating = Boolean(navigation.location);

	return (
		<>
			<Box smDown={{ minH: "vh" }}>
				<Header />
				{isNavigating ? (
					<Container>
						<EmptyState.Root>
							<EmptyState.Content>
								<EmptyState.Indicator>
									<Spinner />
								</EmptyState.Indicator>
								<EmptyState.Title fontFamily="mono">
									Loading...
								</EmptyState.Title>
							</EmptyState.Content>
						</EmptyState.Root>
					</Container>
				) : (
					<Outlet />
				)}
			</Box>
			<Footer />
		</>
	);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = "おお";
	let details = "予期しないエラー";
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status.toString();
		details = error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<>
			<title>{message === "404" ? "そこに無ければ無い" : "エラー"}</title>
			<meta name="description" content={details} />
			<ZZZ
				pos="absolute"
				w="full"
				h="full"
				overflow="hidden"
				disableHighlight
				disableOptimize
				text={message}
			/>
			<Container as="main">
				<EmptyState.Root size="lg">
					<EmptyState.Content>
						<EmptyState.Title
							as="h1"
							fontSize="7xl"
							lineHeight={1}
							fontFamily="mono"
						>
							{message}
						</EmptyState.Title>
						<EmptyState.Description>{details}</EmptyState.Description>
						{stack && (
							<Code maxW="full" whiteSpace="pre" overflow="auto">
								{stack}
							</Code>
						)}
					</EmptyState.Content>
				</EmptyState.Root>
			</Container>
		</>
	);
}
