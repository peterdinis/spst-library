/** @type {import("next").NextConfig} */

const config = {
	reactStrictMode: true,
	eslint: {
		ignoreDuringBuilds: true // TODO: Later remove
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "picsum.photos",
				port: "",
				pathname: "/**",
			},

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
