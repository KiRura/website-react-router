import {
	Box,
	Center,
	Container,
	Flex,
	HStack,
	Image,
	Link,
	List,
	SimpleGrid,
	Span,
	Table,
	Text,
	VStack,
} from "@chakra-ui/react";
import { differenceInYears } from "date-fns";
import type { IconType } from "react-icons";
import { LuCalendar, LuThumbsUp } from "react-icons/lu";
import ZZZ from "~/components/zzz";
import Links from "./links";

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
	// const [scrollPos, setScrollPos] = useState(0);

	// useEffect(() => {
	// 	function handleScroll() {
	// 		setScrollPos(
	// 			Math.floor((window.pageYOffset / window.innerHeight) * 75) / 75,
	// 		);
	// 	}

	// 	handleScroll();
	// 	window.addEventListener("scroll", handleScroll, { passive: true });

	// 	return () => window.removeEventListener("scroll", handleScroll);
	// }, []);

	// scrollPosが変化するだけで<ZZZ/>配下のSimpleGridに再描画が走る
	// FUCK REACT

	return (
		<main>
			{/*
				FireFox:
				- 初回表示: 問題無し
				- リロード時: 何回か移動して元に戻る
				- ウィンドウリサイズをしまくったり拡大縮小しまくったりするといつの間にか直る
				- 開発者ツールで要素を選択すると勝手に移動
				- Clipboard.Indicatorが変化すると勝手に移動

				Chromium:
				- 初回表示: 問題無し
				- リロード時: 70vhぐらい下に移動

				wtf???
			*/}
			<ZZZ
				pos="absolute"
				top="0"
				left="0"
				w="full"
				h={{ "2xlDown": "vh", "2xl": "60rem" }}
				maxH="full"
				overflow="hidden"
				userSelect="none"
				// opacity="calc(1 - var(--scroll-pos))"
				// _hidden={{ display: "none" }}
				_after={{
					pos: "absolute",
					top: "0",
					left: "0",
					content: `""`,
					w: "full",
					h: { "2xlDown": "vh", "2xl": "60rem" },
					maxH: "full",
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
						filter="drop-shadow(0px 4px 8px {colors.bg/80})"
					>
						Hello!,
						<br />
						<Span color={{ base: "orange.500", _dark: "orange.300" }}>
							きるら
						</Span>
						,
						<br />
						<Span color={{ base: "orange.500", _dark: "orange.300" }}>
							(7)KiRura
						</Span>
						,
					</Text>
				</Center>
				<Links />
				<SimpleGrid columns={{ md: 2 }} gap="6">
					<Flex h="full" direction="column">
						<Center h="full">
							<SimpleGrid columns={2} gap="4" maxW="2xl">
								{icons.map((icon) => (
									<VStack key={icon.src} as="figure">
										<Image
											src={icon.src}
											loading="lazy"
											rounded="full"
											w="full"
											aspectRatio="square"
											alt={icon.alt}
										/>
										<Text color="fg.muted" as="figcaption">
											{icon.subtle}
										</Text>
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
		</main>
	);
}
