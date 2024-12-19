// pages/cuanto-cuesta.xml.js
import seoPagesUrls from "@/constants/siteMapsSeoPages/index.json";

function generateSiteMapForHandymanSearch(
) {
    const seoPages = seoPagesUrls;
    return `${seoPages.map((url) => {
        return `<url>
		<loc>${`${process.env.BASE_URL}/cuanto-cuesta${url}`}</loc>
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
