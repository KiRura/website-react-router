import { exec as _exec } from "node:child_process";
import { promisify } from "node:util";
import {
	Box,
	Container,
	For,
	Heading,
	HStack,
	Icon,
	Link,
	LinkOverlay,
	SimpleGrid,
	Table,
} from "@chakra-ui/react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import z from "zod";
import type { Route } from "./+types/license";

const exec = promisify(_exec);
const schema = z
	.object({
		name: z.string(),
		licenseType: z.string(),
		link: z.url().pipe(z.transform((link) => new URL(link))),
		remoteVersion: z.string(),
		installedVersion: z.string(),
		definedVersion: z.string(),
		author: z.string(),
	})
	.array();

type Schema = z.infer<typeof schema>;

function Deps({ deps }: { deps: Schema }) {
	return (
		<Table.Root variant="outline" rounded="md">
			<Table.Header>
				<Table.Row>
					<Table.ColumnHeader>名前</Table.ColumnHeader>
					<Table.ColumnHeader>ライセンス</Table.ColumnHeader>
					<Table.ColumnHeader textAlign="end">Ver.</Table.ColumnHeader>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				<For each={deps}>
					{(dep) => (
						<Table.Row key={dep.name}>
							<Table.Cell
								pos="relative"
								_hover={{ bg: "bg.muted" }}
								transition="backgrounds"
							>
								<HStack justify="space-between">
									<LinkOverlay asChild>
										<Link
											href={`https://${dep.link.host}${dep.link.pathname}`}
											target="_blank"
											referrerPolicy="no-referrer"
										>
											{dep.name}
										</Link>
									</LinkOverlay>
									<Icon color="bg.emphasized">
										<FaArrowUpRightFromSquare />
									</Icon>
								</HStack>
							</Table.Cell>
							<Table.Cell>{dep.licenseType}</Table.Cell>
							<Table.Cell fontFamily="mono" textAlign="end" whiteSpace="nowrap">
								{dep.installedVersion}
							</Table.Cell>
						</Table.Row>
					)}
				</For>
			</Table.Body>
		</Table.Root>
	);
}

export async function loader() {
	const [prod, dev] = await Promise.all([
		exec("./node_modules/.bin/license-report --only=prod"),
		exec("./node_modules/.bin/license-report --only=dev"),
	]);

	return {
		prod: schema.parse(JSON.parse(prod.stdout)),
		dev: schema.parse(JSON.parse(dev.stdout)),
	};
}

export default ({ loaderData }: Route.ComponentProps) => {
	const deps = [
		{
			category: "Production",
			deps: loaderData.prod,
		},
		{
			category: "Development",
			deps: loaderData.dev,
		},
	];

	return (
		<Container asChild py="8" colorPalette="orange">
			<SimpleGrid as="main" maxW="4xl" columns={[1, 1, 2]} gap="4">
				<For each={deps}>
					{(dep) => (
						<Box as="section" key={dep.category} spaceY="2">
							<Heading>{dep.category}</Heading>
							<Deps deps={dep.deps} />
						</Box>
					)}
				</For>
			</SimpleGrid>
		</Container>
	);
};
