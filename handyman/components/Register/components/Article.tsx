import React from "react";
import {ArticleData} from '@/constants/register';
export default function Article() {
  return (
    <article className="mt-16 mb-10 px-3">
      <section className="space-y-3 mb-5">
        <h1 className="font-bold text-3xl sm:text-4xl text-Heading">
          {ArticleData.title.text}
          <span className="text-orange">{ArticleData.title.colorText}</span>
        </h1>
        <p className="text-gray-600">{ArticleData.subParagraph}</p>
      </section>
      <section className="font-medium space-y-4 w-full lg:w-2/3">
        <p>
          {ArticleData.paragraph.paragraph1}
        </p>
        <p>
          {ArticleData.paragraph.paragraph2}
        </p>
        <p>
          {ArticleData.paragraph.paragraph3}
        </p>
        <p>
          {ArticleData.paragraph.paragraph4}
        </p>
        <p>
          {ArticleData.paragraph.paragraph5}
        </p>
      </section>
    </article>
  );
}
