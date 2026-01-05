import {
	index,
	layout,
	type RouteConfig,
	route,
} from "@react-router/dev/routes";

export default [
	layout("routes/layout.tsx", [
		index("routes/home/index.tsx"),
		route("posts", "routes/posts/index.tsx"),
		route("posts/:id", "routes/posts/post.tsx"),
		route("clock", "routes/clock.tsx"),
		route("license", "routes/license.tsx"),
	]),
] satisfies RouteConfig;
