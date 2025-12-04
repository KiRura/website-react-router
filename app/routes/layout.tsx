import {
	Box,
	Button,
	ButtonGroup,
	Container,
	HStack,
	IconButton,
	Image,
	Link,
	Span,
} from "@chakra-ui/react";
import { LuGithub } from "react-icons/lu";
import { NavLink, Outlet, Link as RRLink } from "react-router";
import { ColorModeButton } from "~/components/ui/color-mode";

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

const pages = [
	{
		name: "Blog",
		to: "blog",
	},
	{
		name: "Param",
		to: "ids/123456",
	},
];

export default function Layout() {
	return (
		<>
			<title>KiRura</title>
			<meta name="description" content="しがないReact Routerサイト" />
			<meta name="og:image" content="/kirura/512p.png" />
			{/* nextjsのbaseurlが欲しい */}
			<meta name="twitter:card" content="summary" />
			<meta name="darkreader-lock" />
			<Box
				as="header"
				pos="sticky"
				top="0"
				zIndex="docked"
				py="2.5"
				bg="bg"
				borderBottomWidth="1px"
			>
				<Container centerContent flexDir="row" justifyContent="space-between">
					<HStack as="nav" gap={["6", "10"]}>
						<Link fontSize="xl" fontWeight="bold" asChild>
							<RRLink to="/">
								<Image
									src="/kirura/512p.png"
									alt="kirura icon"
									rounded="full"
									boxSize="8"
									minW="8"
									mr="1"
									fetchPriority="high"
								/>
								<Span hideBelow="sm">KiRura</Span>
							</RRLink>
						</Link>
						<HStack gap="6">
							{pages.map((page) => (
								<Button
									key={page.to}
									asChild
									variant="plain"
									px="0"
									size="sm"
									color="fg.muted"
									borderWidth="0"
									rounded="none"
									css={{
										'&:is([class *= "active"])': {
											fontWeight: "medium",
											color: "fg",
											borderYWidth: "2px",
											borderBottomColor: "orange.solid",
										},
										'&:is([class *= "pending"])': {
											fontWeight: "medium",
											color: "fg",
											animation: "pulse 1s ease-in-out infinite",
										},
									}}
									_hover={{
										color: "fg",
									}}
								>
									<NavLink to={page.to}>{page.name}</NavLink>
								</Button>
							))}
						</HStack>
					</HStack>
					<ButtonGroup variant="ghost">
						<IconButton asChild>
							<a
								href="https://github.com/KiRura/website-react-router"
								target="_blank"
								rel="noopener"
							>
								<LuGithub />
							</a>
						</IconButton>
						<ColorModeButton />
					</ButtonGroup>
				</Container>
			</Box>
			<Outlet />
		</>
	);
}
