import type { IconType } from "react-icons";
import type { To } from "react-router";

export type PageType = {
	label: string;
	to: To;
	icon?: IconType;
};
