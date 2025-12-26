import {
	Box,
	ClientOnly,
	Container,
	Heading,
	Presence,
	ProgressCircle,
	SimpleGrid,
	Switch,
	Text,
	VStack,
} from "@chakra-ui/react";
import { differenceInMilliseconds } from "date-fns";
import { useEffect, useEffectEvent, useState } from "react";

const colors = ["purple", "blue", "teal", "green", "yellow", "orange", "red"];

// function calcProgress(now: Date, start: Date, end: Date) {
// 	return (now.getTime() - start.getTime()) / (end.getTime() - start.getTime());
// }

export default function Page() {
	const [now, setNow] = useState(new Date());

	const [prevSecond, setPrevSecond] = useState(new Date().getSeconds());
	const [enableMilli, setEnableMilli] = useState(false);
	const [party, setParty] = useState(false);

	const onExecInterval = useEffectEvent(() => {
		const _now = new Date();
		if (enableMilli || prevSecond !== _now.getSeconds()) {
			if (!enableMilli) _now.setMilliseconds(0);
			setNow(_now);
			if (!enableMilli) setPrevSecond(_now.getSeconds());
		}
	});

	useEffect(() => {
		const interval = setInterval(onExecInterval, (1 / 120) * 1000);

		return () => clearInterval(interval);
	}, []);

	const [y, M, w, d, h, m, s] = [
		now.getFullYear(),
		now.getMonth(),
		now.getDay(),
		now.getDate(),
		now.getHours(),
		now.getMinutes(),
		now.getSeconds(),
	];

	const progressData = [
		{
			key: "year",
			label: `${y}年`,
			max: differenceInMilliseconds(new Date(y + 1, 0), new Date(y, 0)),
			value: differenceInMilliseconds(now, new Date(y, 0)),
		},
		{
			key: "month",
			label: `${M + 1}月`,
			max: differenceInMilliseconds(new Date(y, M + 1), new Date(y, M)),
			value: differenceInMilliseconds(now, new Date(y, M)),
		},
		{
			key: "day",
			label: `${["日", "月", "火", "水", "木", "金", "土"][w]}曜日`,
			max: differenceInMilliseconds(
				new Date(y, M, 7 - w + d),
				new Date(y, M, d - w),
			),
			value: differenceInMilliseconds(now, new Date(y, M, d - w)),
		},
		{
			key: "date",
			label: `${d}日`,
			max: differenceInMilliseconds(new Date(y, M, d + 1), new Date(y, M, d)),
			value: differenceInMilliseconds(now, new Date(y, M, d)),
		},
		{
			key: "hour",
			label: `${h}時`,
			max: differenceInMilliseconds(
				new Date(y, M, d, h + 1),
				new Date(y, M, d, h),
			),
			value: differenceInMilliseconds(now, new Date(y, M, d, h)),
		},
		{
			key: "minute",
			label: `${m}分`,
			max: differenceInMilliseconds(
				new Date(y, M, d, h, m + 1),
				new Date(y, M, d, h, m),
			),
			value: differenceInMilliseconds(now, new Date(y, M, d, h, m)),
		},
		{
			key: "second",
			label: `${s}秒`,
			max: differenceInMilliseconds(
				new Date(y, M, d, h, m, s + 1),
				new Date(y, M, d, h, m, s),
			),
			value: enableMilli
				? differenceInMilliseconds(now, new Date(y, M, d, h, m, s))
				: null,
		},
	];

	function calcSizes(index?: number) {
		return new Array(5).fill(0).map(
			(_, ii) =>
				// 最大幅を得るためにindexが指定無しの場合かどうかで判断
				// iindexは年, 月, 曜日, 日, 時, 分, 秒の輪
				// iはbreakpoints
				`${(7 - (index ?? 0)) * (ii + 1) * (ii === 0 ? 32 : 16 - (index && index >= 4 ? 2 : 0))}px`,
		);
	}

	return (
		<ClientOnly>
			{() => (
				<Container as="main" py="8" spaceY="8">
					<SimpleGrid columns={[1, 2]} gap="4">
						<Box pos="relative" h={calcSizes()} w="full">
							{progressData.map((data, i) => (
								<Presence
									present={data.value !== null}
									key={data.key}
									animationDuration="slow"
									animationName={{
										_open: "fade-in",
										_closed: "fade-out",
									}}
								>
									<ProgressCircle.Root
										key={data.key}
										value={
											data.key === "second" && !enableMilli
												? 1
												: (data.value ?? 0)
										}
										max={party ? data.max / 1000000 : data.max}
										pos="absolute"
										top="50%"
										left="50%"
										translate="-50% -50%"
										colorPalette={colors[i]}
									>
										<ProgressCircle.Circle
											css={{
												"--size": calcSizes(i),
												"--thickness": ["4px", "4px", "6px", "8px", "10px"],
											}}
										>
											<ProgressCircle.Track stroke="bg.muted" />
											<ProgressCircle.Range transitionProperty="none" />
										</ProgressCircle.Circle>
									</ProgressCircle.Root>
								</Presence>
							))}
						</Box>
						<VStack h="full" justify="center">
							<SimpleGrid gap="4" w="full" minChildWidth="28">
								{progressData.map((progress, i) => (
									<VStack key={progress.key}>
										<Box fontFamily="mono" whiteSpace="nowrap">
											<Heading fontFamily="inherit" color={`${colors[i]}.fg`}>
												{progress.label}
											</Heading>
											<Text>
												{`${(Math.floor(((progress.value ?? 0) / (party ? progress.max / 1000000 : progress.max)) * 100 * 10 ** 6) / 10 ** 6).toFixed(6).padStart(9, "0")}%`}
											</Text>
										</Box>
									</VStack>
								))}
							</SimpleGrid>
						</VStack>
					</SimpleGrid>
					<VStack w="fit" mx="auto" gap="4">
						<Switch.Root
							checked={enableMilli}
							onCheckedChange={(e) => setEnableMilli(e.checked)}
						>
							<Switch.Label>ミリ秒</Switch.Label>
							<Switch.HiddenInput />
							<Switch.Control />
						</Switch.Root>
						<Switch.Root
							checked={party}
							onCheckedChange={(e) => setParty(e.checked)}
						>
							<Switch.Label>Party!</Switch.Label>
							<Switch.HiddenInput />
							<Switch.Control />
						</Switch.Root>
					</VStack>
				</Container>
			)}
		</ClientOnly>
	);
}
