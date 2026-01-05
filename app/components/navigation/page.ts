import { FaClock, FaFileSignature, FaPenNib } from "react-icons/fa6";
import type { PageType } from "~/interface/pages";

export const pages: PageType[] = [
	{
		label: "呟き",
		to: "/posts",
		icon: FaPenNib,
	},
	{
		label: "時計",
		to: "/clock",
		icon: FaClock,
	},
	{
		label: "License",
		to: "/license",
		icon: FaFileSignature,
	},
];
