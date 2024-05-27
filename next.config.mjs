/** @type {import("next").NextConfig} */

import nextra from "nextra"

const withNextra = nextra({
	theme: "nextra-theme-docs",
	themeConfig: "./src/docs/theme-config",
})

withNextra({
	reactStrictMode: true
});

export default withNextra;