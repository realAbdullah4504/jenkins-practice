/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	trailingSlash: false,
	images: {
		domains: ["res.cloudinary.com", "t3.ftcdn.net"],
	},
};

module.exports = nextConfig;
