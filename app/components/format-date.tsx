"use client";

import { format } from "date-fns";

export default function FormatDate({
	date,
	formatStr,
}: {
	date: Date | string;
	formatStr: string;
}) {
	if (typeof date === "string") date = new Date(date);

	return format(date, formatStr);
}
