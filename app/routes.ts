import {
	index,
	layout,
	type RouteConfig,
	route,
} from "@react-router/dev/routes";

export default [
	layout("routes/layout.tsx", [
		index("routes/home.tsx"),
		route("blog", "routes/blog.tsx"),
		route("ids/:id", "routes/id.tsx"),
	]),
] satisfies RouteConfig;
