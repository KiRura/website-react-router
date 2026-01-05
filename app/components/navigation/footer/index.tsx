import {
	Box,
	Button,
	ButtonGroup,
	CloseButton,
	Container,
	Drawer,
	IconButton,
	Image,
	Link,
	Portal,
	SimpleGrid,
} from "@chakra-ui/react";
import { FaBars, FaGithub } from "react-icons/fa6";
import { NavLink, Link as RRLink } from "react-router";
import { ColorModeButton } from "~/components/ui/color-mode";
import { pages } from "../page";

export default function Footer() {
	return (
		<Box
			as="footer"
			pos="sticky"
			bottom="0"
			zIndex="docked"
			py="2"
			hideFrom="sm"
		>
			<Container centerContent flexDir="row" justifyContent="space-between">
				<Drawer.Root placement="bottom">
					<Drawer.Trigger asChild>
						<IconButton
							variant="outline"
							size="xl"
							bg={{ base: "bg.subtle/80", _hover: "bg.muted/80" }}
							shadow="md"
							// --backdrop-blur: var(--chakra-empty, ) !important;
							// hey chakra wtf is this????
							backdropFilter="blur({blurs.md})"
						>
							<FaBars />
						</IconButton>
					</Drawer.Trigger>
					<Portal>
						<Drawer.Backdrop />
						<Drawer.Positioner>
							<Drawer.Content as="nav">
								<Drawer.Header justifyContent="center">
									<Drawer.ActionTrigger asChild>
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
												KiRura
											</RRLink>
										</Link>
									</Drawer.ActionTrigger>
								</Drawer.Header>
								<Drawer.Footer asChild>
									<SimpleGrid gap="2" columns={2}>
										{pages.map((page) => (
											<Drawer.ActionTrigger key={page.to.toString()} asChild>
												<Button
													asChild
													variant="surface"
													justifyContent="start"
													size="sm"
													color="fg.muted"
													borderWidth="0"
													borderLeftColor="orange.solid"
													css={{
														"&:is(.active)": {
															color: "orange.fg",
															fontWeight: "medium",
															borderXWidth: "4px",
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
													transitionProperty="border, color, background"
												>
													<NavLink to={page.to} prefetch="viewport">
														{page.icon && <page.icon />}
														{page.label}
													</NavLink>
												</Button>
											</Drawer.ActionTrigger>
										))}
									</SimpleGrid>
								</Drawer.Footer>
								<Drawer.CloseTrigger asChild>
									<CloseButton />
								</Drawer.CloseTrigger>
							</Drawer.Content>
						</Drawer.Positioner>
					</Portal>
				</Drawer.Root>
				<ButtonGroup
					variant="outline"
					rounded="sm"
					size="xl"
					shadow="md"
					attached
				>
					<IconButton
						bg={{ base: "bg.subtle/80", _hover: "bg.muted/80" }}
						backdropFilter="blur({blurs.md})"
						aria-label="Source"
						asChild
					>
						<a
							href="https://github.com/KiRura/website-react-router"
							target="_blank"
							rel="noopener"
						>
							<FaGithub />
						</a>
					</IconButton>
					<ColorModeButton
						bg={{ base: "bg.subtle/80", _hover: "bg.muted/80" }}
						backdropFilter="blur({blurs.md})"
					/>
				</ButtonGroup>
			</Container>
		</Box>
	);
}
