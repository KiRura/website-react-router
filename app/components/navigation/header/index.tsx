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
import { FaGithub } from "react-icons/fa6";
import { NavLink, Link as RRLink } from "react-router";
import { ColorModeButton } from "~/components/ui/color-mode";
import { pages } from "../page";

export default function Header() {
	return (
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
									"&:is(.active)": {
										fontWeight: "medium",
										color: "fg",
										borderYWidth: "2px",
										borderBottomColor: "orange.solid",
									},
									"&:is(.pending)": {
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
							<FaGithub />
						</a>
					</IconButton>
					<ColorModeButton />
				</ButtonGroup>
			</Container>
		</Box>
	);
}
