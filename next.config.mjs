/** @type {import("next").NextConfig} */

const config = {
	reactStrictMode: true,
	eslint: {
		ignoreDuringBuilds: true
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "*",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default config;
