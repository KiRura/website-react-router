import { Box, Container, EmptyState, Spinner } from "@chakra-ui/react";
import { Outlet, useNavigation } from "react-router";
import Footer from "~/components/navigation/footer";
import Header from "~/components/navigation/header";

export function links() {
	return [
		{
			rel: "preconnect",
			href: "https://fonts.googleapis.com",
		},
		{
			rel: "preconnect",
			href: "https://fonts.gstatic.com",
			crossOrigin: "true",
		},
		{
			rel: "stylesheet",
			href: "https://fonts.googleapis.com/css2?family=Google+Sans+Code:ital,wght@0,300..800;1,300..800&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=M+PLUS+1+Code:wght@100..700&family=Noto+Sans+JP:wght@100..900&display=swap",
		},
	];
}

export default function Layout() {
	const navigation = useNavigation();
	const isNavigating = Boolean(navigation.location);

	return (
		<>
			<title>KiRura</title>
			<meta name="description" content="しがないReact Routerサイト" />
			<meta name="og:image" content="/kirura/512p.png" />
			{/* nextjsのbaseurlが欲しい */}
			<meta name="twitter:card" content="summary" />
			<meta name="darkreader-lock" />

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
