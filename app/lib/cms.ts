import { createClient } from "microcms-js-sdk";
import type { PostType } from "~/type/blog";

if (!process.env.MICRO_CMS_API_KEY)
	throw new Error("microCMSのAPIキーが必要です");

const cmsClient = createClient({
	serviceDomain: "kirura",
	apiKey: process.env.MICRO_CMS_API_KEY,
});

async function getRecentList() {
	return await cmsClient.getList<PostType>({
		endpoint: "blog",
		queries: {
			limit: 8,
			fields: "createdAt,publishedAt,id,title,subtitle,coverImage",
		},
	});
}

async function getList() {
	return await cmsClient.getList<PostType>({
		endpoint: "blog",
		queries: {
			limit: 100,
			fields: "createdAt,publishedAt,id,title,subtitle,coverImage",
		},
	});
}

export default {
	client: cmsClient,
	getRecentList,
	getList,
};
