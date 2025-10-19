import { Container, Heading, HStack, Separator, Text } from "@chakra-ui/react";

export default function Page() {
	return (
		<Container as="main">
			<HStack>
				<Heading>Blog</Heading>
				<Separator variant="dashed" flex={1} />
			</HStack>
			<Text>まだ無い</Text>
		</Container>
	);
}
