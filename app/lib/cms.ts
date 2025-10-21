import { createClient } from "microcms-js-sdk";

const cmsClient = createClient({
	serviceDomain: "kirura",
	// biome-ignore lint/style/noNonNullAssertion: <使わせろ>
	apiKey: process.env.MICRO_CMS_API_KEY!,
});

export async function getRecentList() {
	return await cmsClient.getList({
		endpoint: "news",
		queries: {
			limit: 8,
			fields: "createdAt,publishedAt,id,title,subtitle,coverImage",
		},
	});
}

export async function getList() {
	return await cmsClient.getList({
		endpoint: "news",
		queries: {
			limit: 100,
			fields: "createdAt,publishedAt,id,title,subtitle,coverImage",
		},
	});
}
