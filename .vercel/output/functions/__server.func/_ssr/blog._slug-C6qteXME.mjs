import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog._slug-C6qteXME.js
var $$splitComponentImporter = () => import("./blog._slug-DAurNmEU.mjs");
var Route = createFileRoute("/blog/$slug")({
	head: () => ({ meta: [{ title: `Journal Details — Explore Hills` }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
