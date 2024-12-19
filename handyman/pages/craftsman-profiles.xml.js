// pages/sitemap.xml.js

function generateSiteMapForCraftsmanProfile(posts) {
	return `${posts
		.map(({ company_name, updatedAt }) => {
			return `
	<url>
		<loc>${`${process.env.BASE_URL}/craftsman/${company_name}`}</loc>
		<lastmod>${new Date(updatedAt).toISOString()}</lastmod>
		<changefreq>daily</changefreq>
		<priority>1</priority>
	</url>
  `;
		})
		.join("")}
  `;
}

function SiteMap() {
	// This component is not required as we're handling everything in getServerSideProps
	return null;
}

export async function getServerSideProps({ res }) {
	// We make an API call to gather the URLs for our site
	const response = await fetch(
		`${process.env.BASE_URL}/api/user/craftman/get_sitemap_data`
	);

	const craftsman = await response.json();
	// We generate the XML sitemap with the posts data
	const craftsmanProfileSitemap =
		generateSiteMapForCraftsmanProfile(craftsman);

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	${craftsmanProfileSitemap}
    </urlset>
  `;

	res.setHeader("Content-Type", "text/xml");
	// we send the XML to the browser
	res.write(sitemap);
	res.end();

	return {
		props: {},
	};
}

export default SiteMap;
