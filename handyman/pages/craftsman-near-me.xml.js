// pages/craftsman-near-me.xml.xml.js
import craftsmanNearMe from "@/constants/CraftsmanNearMeSiteMaps";

function generateSiteMapForHandymanSearch(
) {
    const seoPages = craftsmanNearMe;
    return `${seoPages.map((url) => {
        return `<url>
		<loc>${`${process.env.BASE_URL}/craftsman-near-me/${url}`}</loc>
		<changefreq>daily</changefreq>
		<priority>2</priority></url>`;
    })
        .join("")}
  `;
}

function SiteMap() {
    // This component is not required as we're handling everything in getServerSideProps
    return null;
}

export async function getServerSideProps({
    res,
}) {
    const seoPagesSitemap = generateSiteMapForHandymanSearch();

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	${seoPagesSitemap}
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
