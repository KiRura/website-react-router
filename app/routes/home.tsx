import {
	Box,
	Button,
	Card,
	Center,
	Clipboard,
	Container,
	Flex,
	Highlight,
	HStack,
	Image,
	Link,
	LinkOverlay,
	List,
	SimpleGrid,
	Table,
	Text,
	VStack,
} from "@chakra-ui/react";
import { differenceInYears } from "date-fns";
import type { IconType } from "react-icons";
import { FaDiscord, FaEnvelope, FaTwitter, FaYoutube } from "react-icons/fa6";
import { LuCalendar, LuThumbsUp } from "react-icons/lu";
import ZZZ from "~/components/zzz";

export function headers() {
	return {
		"Cache-Control": "max-age=31536000",
	};
}

const links: {
	label: string;
	id: string;
	description: string;
	href: string;
	icon: IconType;
}[] = [
	{
		label: "Email",
		id: "kirura@kirura.f5.si",
		icon: FaEnvelope,
		description: "なんかあれば",
		href: "mailto:kirura@kirura.f5.si",
	},
	{
		label: "Twitter",
		id: "@7KiRura",
		icon: FaTwitter,
		description: "通知オンは100人 ブロックは3万人",
		href: "https://x.com/7KiRura",
	},
	{
		label: "Discord",
		id: "7kirura",
		icon: FaDiscord,
		description: "いつもここにいる",
		href: "https://discord.com/users/606093171151208448",
	},
	{
		label: "YouTube",
		id: "@7KiRura",
		icon: FaYoutube,
		description: "上げたい時に上げてる",
		href: "https://www.youtube.com/@7KiRura",
	},
];

const icons = [
	{
		src: "/kirura/1024p.png",
		alt: "K",
		subtle: "ブランド的なもの",
	},
	{
		src: "/kirura/amagi.png",
		alt: "Kの擬人化",
		subtle: (
			<>
				{"Art: "}
				<Link href="https://x.com/meltqc" target="_blank" colorPalette="orange">
					@meltqc
				</Link>
			</>
		),
	},
];

const info: {
	title: {
		icon: IconType;
		name: string;
	};
	contents: {
		name: string;
		href?: string;
		csrOnly?: boolean;
	}[];
}[] = [
	{
		title: {
			icon: LuThumbsUp,
			name: "Likes",
		},
		contents: [
			{
				name: "Circle of Karma",
				href: "https://song.link/s/5KlOBnqEoMmudysmYt762W",
			},
			{
				name: "Hello Dust Town",
				href: "https://song.link/s/61pJ3mvnw1fRxcrXZGRbfx",
			},
			{ name: "Caftaphata", href: "https://youtu.be/cMnuMjXeHrY" },
			{ name: "言葉遊び", href: "https://youtu.be/eGS-IjCUEzA" },
			{ name: "一龠", href: "https://youtu.be/iWzUxFQQAKY" },
			{ name: "Blue Girl", href: "https://youtu.be/qPbW8ZAdnBU" },
			{ name: "Birds", href: "https://youtu.be/YhUZ6_2oy4I" },
			{ name: "Dance Alive", href: "https://youtu.be/q24o6ljQYPc" },
			{ name: "Dopamine", href: "https://youtu.be/qlrpeYdm9Ec" },
			{ name: "Dopamine (DnB Remix)", href: "https://youtu.be/GBuKYAN0RbM" },
		],
	},
	{
		title: {
			icon: LuCalendar,
			name: "Age",
		},
		contents: [
			{
				name: `${differenceInYears(new Date(), new Date(2008, 2, 17))}歳 / 高3`,
			},
		],
	},
];

export default function Home() {
	return (
		<Box as="main">
			<ZZZ
				pos="absolute"
				top="0"
				w="full"
				h={{ "2xlDown": "vh", "2xl": "60rem" }}
				maxH="full"
				overflow="hidden"
				userSelect="none"
				_after={{
					pos: "absolute",
					top: "0",
					content: `""`,
					w: "full",
					h: "full",
					bgGradient: "to-b",
					gradientFrom: "transparent",
					gradientTo: "bg",
				}}
			/>
			<Container py="8" spaceY="4">
				<Center h={{ "2xlDown": "vh", "2xl": "50rem" }} maxH="90vh">
					<Text
						as="h1"
						lineHeight="moderate"
						fontSize={["5xl", "6xl", "7xl"]}
						fontWeight="bold"
						fontFamily={`"Google Sans Code", "Noto Sans JP", sans-serif`}
						whiteSpace="pre-wrap"
						filter="drop-shadow(0px 4px 8px {colors.bg/80})"
					>
						Hello!,
						<br />
						<Highlight
							query={["きるら", "(7)KiRura"]}
							styles={{ color: { base: "orange.500", _dark: "orange.300" } }}
						>
							{"きるら,\n(7)KiRura,"}
						</Highlight>
					</Text>
				</Center>
				<SimpleGrid columns={[1, 2, 3, 4]} gap="2">
					{links.map((link) => (
						<Card.Root
							key={link.href}
							h="full"
							size="sm"
							_hover={{ bg: "bg.muted" }}
							transition="backgrounds"
							overflow="hidden"
						>
							<Card.Header
								flexDirection="row"
								alignItems="start"
								justifyContent="space-between"
								overflow="hidden"
							>
								<LinkOverlay href={link.href} target="_blank" asChild>
									<Card.Title asChild>
										<Link colorPalette="orange">
											<link.icon /> {link.label}
										</Link>
									</Card.Title>
								</LinkOverlay>
								<Clipboard.Root
									value={link.id}
									maxW="5/12"
									h="fit"
									lineHeight={1}
								>
									<Clipboard.Trigger asChild>
										<Button
											p="0"
											variant="plain"
											size="xs"
											h="fit"
											w="full"
											aria-label="copy id"
											fontFamily="mono"
											textAlign="right"
											color="fg.muted"
											gap="1"
										>
											<Clipboard.ValueText
												overflow="hidden"
												overflowWrap="anywhere"
												textOverflow="ellipsis"
											/>
											<Clipboard.Indicator pos="sticky" right="0" />
										</Button>
									</Clipboard.Trigger>
								</Clipboard.Root>
							</Card.Header>
							<Card.Body pt="1">
								<Card.Description>{link.description}</Card.Description>
							</Card.Body>
						</Card.Root>
					))}
				</SimpleGrid>
				<SimpleGrid columns={{ md: 2 }} gap="6">
					<Flex h="full" direction="column">
						<Center h="full">
							<SimpleGrid columns={2} gap="4" maxW="2xl">
								{icons.map((icon) => (
									<VStack key={icon.src}>
										<Image
											src={icon.src}
											loading="lazy"
											rounded="full"
											w="full"
											aspectRatio="square"
											alt={icon.alt}
										/>
										<Text color="fg.muted">{icon.subtle}</Text>
									</VStack>
								))}
							</SimpleGrid>
						</Center>
					</Flex>
					<Flex h="full" direction="column">
						<Center h="full">
							<Table.Root w={{ md: "fit" }}>
								<Table.Body>
									{info.map((info) => (
										<Table.Row key={info.title.name}>
											<Table.Cell minW="32">
												<HStack gap="1.5">
													<info.title.icon /> {info.title.name}
												</HStack>
											</Table.Cell>
											<Table.Cell>
												<List.Root gap="1">
													{info.contents.map((content) =>
														content.href ? (
															<List.Item key={content.href}>
																<Link
																	href={content.href}
																	target="_blank"
																	colorPalette="orange"
																>
																	{content.name}
																</Link>
															</List.Item>
															// ) : content.csrOnly ? (
															// 	<ClientOnly key={content.name.toString()}>
															// 		<List.Item>{content.name}</List.Item>
															// 	</ClientOnly>
														) : (
															<List.Item key={content.name}>
																{content.name}
															</List.Item>
														),
													)}
												</List.Root>
											</Table.Cell>
										</Table.Row>
									))}
								</Table.Body>
							</Table.Root>
						</Center>
					</Flex>
				</SimpleGrid>
			</Container>
			<Box borderTopWidth="1px" py="8">
				<Container centerContent>
					<Image
						src={`https://count.getloli.com/@KiRura-website-rr${process.env.NODE_ENV === "production" ? "" : "-dev"}?darkmode=auto`}
						alt="moe counter"
						w="315px"
						h="100px"
					/>
				</Container>
			</Box>
		</Box>
	);
}
