/** @type {import("next").NextConfig} */

const config = {
	reactStrictMode: true,
	images: {
	  remotePatterns: [
		{
		  protocol: 'https',
		  hostname: 'picsum.photos',
		  port: '',
		  pathname: '/**',
		},
	  ],
	},
  };
  
  export default config;