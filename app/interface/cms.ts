import type { MicroCMSImage } from "microcms-js-sdk";

interface PostType {
	title: string;
	subtitle?: string;
	coverImage?: MicroCMSImage;
}

interface PostWithContentType extends PostType {
	content: string;
}

export type { PostType, PostWithContentType };
