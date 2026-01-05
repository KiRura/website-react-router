import { withEmotionCache } from "@emotion/react";
import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";
import { Provider } from "./components/ui/provider";
import { useInjectStyles } from "./emotion/emotion-client";

export const links: Route.LinksFunction = () => [
	{
		rel: "preconnect",
		href: "https://fonts.googleapis.com",
	},
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Google+Sans+Code:ital,wght@0,300..800;1,300..800&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=M+PLUS+1+Code:wght@100..700&family=Noto+Sans+JP:wght@100..900&display=swap",
	},
];

interface LayoutProps {
	children: React.ReactNode;
}

export const Layout = withEmotionCache((props: LayoutProps, cache) => {
	useInjectStyles(cache);

	return (
		<html lang="ja" suppressHydrationWarning>
			<head suppressHydrationWarning>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
				<meta
					name="emotion-insertion-point"
					content="emotion-insertion-point"
				/>
			</head>
			<body>
				<Provider>
					{props.children}
					<ScrollRestoration />
					<Scripts />
				</Provider>
			</body>
		</html>
	);
});

export default function App() {
	return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details =
			error.status === 404
				? "The requested page could not be found."
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<>
			<title>とてつもなく大きいエラー</title>
			<meta name="description" content="終焉" />
			<main>
				<h1>{message}</h1>
				<p>{details}</p>
				{stack && (
					<pre>
						<code>{stack}</code>
					</pre>
				)}
			</main>
		</>
	);
}
