import {
	Button,
	Card,
	Clipboard,
	createListCollection,
	Link,
	LinkOverlay,
	Portal,
	Select,
	SimpleGrid,
} from "@chakra-ui/react";
import { useState } from "react";
import type { IconType } from "react-icons";
import {
	FaBluesky,
	FaBolt,
	FaCloudMoon,
	FaDiscord,
	FaEnvelope,
	FaFire,
	FaInstagram,
	FaRobot,
	FaStopwatch,
	FaTrain,
	FaTwitter,
	FaWind,
	FaYoutube,
} from "react-icons/fa6";

const links: {
	label: string;
	id: string;
	description: string;
	href: string;
	icon: IconType;
	category: "social" | "game";
}[] = [
	{
		label: "Email",
		id: "kirura@kirura.f5.si",
		icon: FaEnvelope,
		description: "なんかあれば",
		href: "mailto:kirura@kirura.f5.si",
		category: "social",
	},
	{
		label: "Twitter",
		id: "@7KiRura",
		icon: FaTwitter,
		description: "通知オンは100人 ブロックは3万人",
		href: "https://x.com/7KiRura",
		category: "social",
	},
	{
		label: "Discord",
		id: "7kirura",
		icon: FaDiscord,
		description: "いつもここにいる",
		href: "https://discord.com/users/606093171151208448",
		category: "social",
	},
	{
		label: "YouTube",
		id: "@7KiRura",
		icon: FaYoutube,
		description: "上げたい時に上げてる",
		href: "https://www.youtube.com/@7KiRura",
		category: "social",
	},
	{
		id: "@7kirura.bsky.social",
		label: "Bluesky",
		description: "一応",
		href: "https://bsky.app/profile/7kirura.bsky.social",
		icon: FaBluesky,
		category: "social",
	},
	{
		id: "@kirura_7",
		label: "Instagram",
		description: "rom専 たまに飯テロ",
		href: "https://www.instagram.com/kirura_7",
		icon: FaInstagram,
		category: "social",
	},
	{
		id: "1301188343",
		label: "ZZZ",
		description: "全人類やれ",
		href: "https://zenless.hoyoverse.com/",
		icon: FaBolt,
		category: "game",
	},
	{
		id: "802728892",
		label: "スタレ",
		description: "信じて オンパロスも明るいですよ",
		href: "https://hsr.hoyoverse.com/",
		icon: FaTrain,
		category: "game",
	},
	{
		id: "bHYG5cF09HUKHN7C",
		label: "Refind Self",
		description: "全人類やれ",
		href: "https://store.steampowered.com/app/2514960/Refind_Self",
		icon: FaRobot,
		category: "game",
	},
	{
		id: "KiRura#371",
		label: "VALORANT",
		description: "基本マルチ",
		href: "https://playvalorant.com",
		icon: FaWind,
		category: "game",
	},
	{
		id: "KiRura#1579",
		label: "Overwatch",
		description: "ゲンボを一番やってる",
		href: "https://overwatch.blizzard.com/",
		icon: FaStopwatch,
		category: "game",
	},
	{
		id: "803854671",
		label: "原神",
		description: "フォンテーヌまでやれ",
		href: "https://genshin.hoyoverse.com/",
		icon: FaCloudMoon,
		category: "game",
	},
	{
		id: "21132502",
		label: "崩壊3rd",
		description: "ショートアニメが好き",
		href: "https://www.houkai3rd.com/",
		icon: FaFire,
		category: "game",
	},
];

const categories = createListCollection({
	items: [
		{ label: "全て", value: "all" },
		{ label: "SNS", value: "social" },
		{ label: "ゲーム", value: "game" },
	],
});

export default function Links() {
	const [category, setCategory] = useState(["all"]);

	return (
		<>
			<Select.Root
				collection={categories}
				value={category}
				onValueChange={(e) => setCategory(e.value)}
				maxW="40"
				ml="auto"
			>
				<Select.HiddenSelect />
				<Select.Control>
					<Select.Trigger>
						<Select.ValueText placeholder="Select framework" />
					</Select.Trigger>
					<Select.IndicatorGroup>
						<Select.Indicator />
					</Select.IndicatorGroup>
				</Select.Control>
				<Portal>
					<Select.Positioner>
						<Select.Content>
							{categories.items.map((category) => (
								<Select.Item item={category} key={category.value}>
									{category.label}
									<Select.ItemIndicator />
								</Select.Item>
							))}
						</Select.Content>
					</Select.Positioner>
				</Portal>
			</Select.Root>
			<SimpleGrid columns={[1, 2, 3, 4]} gap="2">
				{links
					.filter(
						(link) => category[0] === "all" || category[0] === link.category,
					)
					.map((link, i) => (
						<Card.Root
							css={{
								"--animation-delay": {
									smDown: `${i * 48}ms`,
									sm: `${i * 16}ms`,
								},
							}}
							key={`links-${link.label}-${link.id}${category[0] !== "all" ? `-${category[0]}` : ""}`}
							h="full"
							size="sm"
							_hover={{ bg: "bg.muted" }}
							transition="backgrounds"
							overflow="hidden"
							opacity={0}
							animationName={{
								smDown: "slide-from-right, fade-in",
								sm: "scale-in, fade-in",
							}}
							animationDuration={{ smDown: "slow", sm: "fast" }}
							animationFillMode="forwards"
							animationDelay="var(--animation-delay)"
							_motionReduce={{
								opacity: 1,
								animation: "none",
							}}
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
		</>
	);
}
