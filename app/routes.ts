import { type RouteConfig, index, layout } from "@react-router/dev/routes";

export default [
    layout("layouts/sidebar.jsx", [
        index("routes/home.tsx")
    ])
] satisfies RouteConfig;
