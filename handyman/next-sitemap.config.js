/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: process.env.BASE_URL,
	generateRobotsTxt: true, // (optional)
	sitemapSize: 50000,
	outDir: "./Out",
};
