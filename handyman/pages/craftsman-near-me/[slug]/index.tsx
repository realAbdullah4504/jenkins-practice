import { HeroSearchAndText } from "@/components";
import { components } from "@/components/craftsman-near-me/componentsMap";
import { StaticPagesLayout } from "@/components/Cuanto-cuesta";
import { changeServiceFormat } from "@/helper/changeServiceFormat";
import React from "react";

export async function getStaticPaths() {
  const slugs = Object.keys(components);

  const paths = slugs.map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  return { props: { slug: params.slug } };
}

type DynamicPageProps = {
  slug: string;
};
const DynamicPage = ({ slug }: DynamicPageProps) => {
  const Component = components[slug];
  return Component ? (
    <>
      <StaticPagesLayout>
        <h1 className="text-3xl font-bold text-center mt-8">
          {changeServiceFormat(slug)}
        </h1>
        <HeroSearchAndText
          homePageOrNOt={false}
          title={false}
          searchDefaultField={changeServiceFormat(slug)}
        />
        <Component />
      </StaticPagesLayout>
      {/* changeServiceFormat( */}
    </>
  ) : (
    <div>Page not found</div>
  );
};

export default DynamicPage;
