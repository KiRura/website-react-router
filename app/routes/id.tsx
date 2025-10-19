import { Code, Container } from "@chakra-ui/react";
import type { Route } from "./+types/id";

export default function Page(loaderData: Route.ComponentProps) {
	return (
		<Container as="main">
			<Code>{loaderData.params.id}</Code>
		</Container>
	);
}
