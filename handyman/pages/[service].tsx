// pages/sitemap.xml.js
import { ServiceCards } from "@/constants/landingPage";
import { citySiteMaps } from "@/constants/SiteMapCities";
function generateSiteMapForHandymanSearch(
  posts: { Postal_Code: string; Place_Name: string }[],
  service: string
) {
  const uniquePlaces = posts.reduce(
    (acc: string[], post: { Place_Name: string }) => {
      if (!acc.includes(post.Place_Name)) {
        acc.push(post.Place_Name);
      }
      return acc;
    },
    []
  );

  return `${uniquePlaces
    .map((Place_Name) => {
      return `<url>
		<loc>${`${process.env.BASE_URL}/findhandyman/${service}?city=${Place_Name}`}</loc>
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
  params,
}: {
  res: any;
  params: { service: string };
}) {
  const service = params.service.replace(".xml", "");
  const handymanSearchSitemapresponse = await fetch(
    `${process.env.BASE_URL}/api/find_handymans/get_sitemap_data`
  );

  const handymanSearch = await handymanSearchSitemapresponse.json();
  const filterAvailableService = ServiceCards.find(
    (selectedService) => selectedService.slug === service
  );

  if (!filterAvailableService) {
    return {
      notFound: true,
    };
  }

  const filteredPostals = handymanSearch.filter((postal:{Place_Name:string}) =>
    citySiteMaps.some(
      (filtered) =>
        postal.Place_Name.toLowerCase().includes(filtered.toLowerCase()) ||
        filtered.toLowerCase().includes(postal.Place_Name.toLowerCase())
    )
  );
  const handymanSearchSitemap = generateSiteMapForHandymanSearch(
    filteredPostals,
    service
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	${handymanSearchSitemap}
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
