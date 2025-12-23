import {
	index,
	layout,
	type RouteConfig,
	route,
} from "@react-router/dev/routes";

export default [
	layout("routes/layout.tsx", [
		index("routes/home.tsx"),
		route("posts", "routes/posts.tsx"),
		route("posts/:id", "routes/post.tsx"),
	]),
] satisfies RouteConfig;
