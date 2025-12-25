import { env } from "node:process";
import { createClient, type MicroCMSQueries } from "microcms-js-sdk";
import type { PostWithContentType } from "~/interface/cms";

if (!env.MICRO_CMS_API_KEY) throw new Error("microCMSのAPIキーが必要です");

const cmsClient = createClient({
	serviceDomain: "kirura",
	apiKey: env.MICRO_CMS_API_KEY,
});

async function getList<T = PostWithContentType>(queries?: MicroCMSQueries) {
	return await cmsClient.getList<T>({
		endpoint: "blog",
		queries: {
			orders: "-publishedAt",
			...queries,
		},
	});
}

async function getPost(id: string) {
	return await cmsClient.getListDetail<PostWithContentType>({
		endpoint: "blog",
		contentId: id,
	});
}

export { getList, getPost };
