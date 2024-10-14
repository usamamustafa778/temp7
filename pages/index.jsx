import React from "react";
import Head from "next/head";
import Banner from "@/components/containers/Banner/Banner";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import GoogleTagManager from "@/lib/GoogleTagManager";
import MostPopular from "@/components/containers/MostPopular";
import Rightbar from "@/components/containers/Rightbar";
import Footer from "@/components/containers/Footer";
import Navbar from "@/components/containers/Navbar";
import JsonLd from "@/components/json/JsonLd";
import BlogCard from "@/components/common/BlogCard";
import Link from "next/link";
import Image from "next/image";

import {
  callBackendApi,
  getDomain,
  getImagePath,
  robotsTxt,
  sanitizeUrl,
} from "@/lib/myFun";

import { Raleway } from "next/font/google";
import MustRead from "@/components/containers/MustRead";
const myFont = Raleway({
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
});

export default function Home({
  logo,
  blog_list,
  imagePath,
  categories,
  category,
  domain,
  meta,
  about_me,
  contact_details,
  banner,
  favicon,
  layout,
  tag_list,
  nav_type,
  footer_type,
}) {
  const page = layout?.find((page) => page.page === "home");
  const lastFiveBlogs = blog_list.slice(-5);

  const renderSections = () => {
    return page?.enable
      ? page.sections.map((item, index) => {
          if (!item.enable) return null;

          switch (item.section?.toLowerCase()) {
            case "navbar":
              return (
                <Navbar
                  key={index}
                  logo={logo}
                  imagePath={imagePath}
                  blog_list={blog_list}
                  categories={categories}
                  nav_type={nav_type}
                  contact_details={contact_details}
                />
              );

            // case "most popular":
            //   return (
            //     <MostPopular
            //       key={index}
            //       blog_list={blog_list}
            //       imagePath={imagePath}
            //     />
            //   );
            case "banner":
              return (
                <div key={index} className="pt-8 mx-auto max-w-[1500px]">
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-home gap-12 w-full">
                      {renderHomeList(blog_list)}

                      <div className="flex flex-col gap-10 w-full">
                        {blog_list?.map(
                          (item, index) =>
                            item.isFeatured && (
                              <div key={index}>
                                <BlogCard
                                  key={index}
                                  category={
                                    sanitizeUrl(item.article_category) || "#"
                                  }
                                  title={item.title}
                                  published_at={item.published_at}
                                  tagline={item.tagline}
                                  image={
                                    item.image
                                      ? `${imagePath}/${item.image}`
                                      : "/no-image.png"
                                  }
                                  href={`/${encodeURI(
                                    sanitizeUrl(item.article_category)
                                  )}/${encodeURI(sanitizeUrl(item.title))}`}
                                  imageHeight="h-72 md:h-[420px]"
                                  imageTitle={
                                    item.imageTitle ||
                                    item.title ||
                                    "Blog Image Title"
                                  }
                                  altImage={
                                    item.altImage ||
                                    item.tagline ||
                                    "Article Thumbnail"
                                  }
                                />
                              </div>
                            )
                        )}
                      </div>

                      <div className=" pt-5 px-4 flex flex-col items-center">
                        <div className="flex flex-col ">
                          {lastFiveBlogs.map((item, index) => (
                            <div
                              key={index}
                              className="grid grid-cols-widget gap-3 py-3 border-b last:border-none"
                            >
                              <div>
                                <Link
                                  title={item.title || "Article Link"}
                                  href={`/${encodeURI(
                                    sanitizeUrl(item.article_category)
                                  )}/${encodeURI(sanitizeUrl(item.title))}`}
                                >
                                  <p className="font-semibold leading-tight hover:underline">
                                    {item.title}
                                  </p>
                                </Link>
                              </div>
                              <Link
                                title={item.title || "Article"}
                                href={`/${encodeURI(
                                  sanitizeUrl(item.article_category)
                                )}/${encodeURI(sanitizeUrl(item.title))}`}
                              >
                                <div className="overflow-hidden relative min-h-20 w-full bg-black flex-1 rounded">
                                  <Image
                                    title={
                                      item?.imageTitle ||
                                      item?.title ||
                                      "Article Thumbnail"
                                    }
                                    alt={
                                      item?.tagline ||
                                      item?.altText ||
                                      "Article Thumbnail"
                                    }
                                    src={
                                      item.image
                                        ? `${imagePath}/${item.image}`
                                        : "/no-image.png"
                                    }
                                    fill
                                    loading="lazy"
                                    className="object-cover hover:scale-125 transition-all"
                                    style={{ objectFit: "cover" }}
                                  />
                                </div>
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );

            case "articles":
              return (
                <div key={index} className="pt-8 mx-auto max-w-[1500px]">
                  <div className=" border-t-4 pt-5 px-4  text-center py-10">
                    <h2 className="bg-white  px-5 text-4xl font-bold  -mt-10  text-center">
                      Latest Posts
                    </h2>
                    <h2 className="  px-5 text-xl font-semibold  text-gray-500  text-center">
                      Stay up-to-date
                    </h2>
                  </div>
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-home1 gap-12 w-full">
                      <div className="flex flex-col gap-10 w-full">
                        {renderBlogList(blog_list)}
                      </div>

                      <Rightbar
                        widgets={page?.widgets}
                        about_me={about_me}
                        tag_list={tag_list}
                        blog_list={blog_list}
                        imagePath={imagePath}
                        categories={categories}
                      />
                    </div>
                  </div>
                </div>
              );

            case "must read":
              return (
                <MustRead
                  key={index}
                  blog_list={blog_list}
                  imagePath={imagePath}
                />
              );
            case "footer":
              return (
                <Footer
                  key={index}
                  imagePath={imagePath}
                  blog_list={blog_list}
                  categories={categories}
                  footer_type={footer_type}
                />
              );
            default:
              return null;
          }
        })
      : "Page Disabled, under maintenance";
  };

  const renderHomeList = () => {
    return (
      <div className="grid  gap-5 md:gap-10">
        <div className="flex flex-col gap-4">
          {blog_list?.slice(0, 1).map((item, index) => (
            <BlogCard
              key={index}
              title={item.title}
              published_at={item.published_at}
              image={
                item.image ? `${imagePath}/${item.image}` : "/no-image.png"
              }
              href={`/${encodeURI(
                sanitizeUrl(item.article_category)
              )}/${encodeURI(sanitizeUrl(item.title))}`}
              imageHeight="h-72 md:h-[220px]"
              imageTitle={item.imageTitle || item.title || "Blog Image Title"}
              altImage={item.altImage || item.tagline || "Article Thumbnail"}
              className={`border-none`}
            />
          ))}
        </div>
        <div className="flex flex-col gap-10">
          {blog_list?.slice(1, 2).map((item, index) => (
            <BlogCard
              key={index}
              title={item.title}
              published_at={item.published_at}
              image={
                item.image ? `${imagePath}/${item.image}` : "/no-image.png"
              }
              href={`/${encodeURI(
                sanitizeUrl(item.article_category)
              )}/${encodeURI(sanitizeUrl(item.title))}`}
              imageHeight={index === 0 ? "h-40" : "h-72 md:h-[400px]"}
              imageTitle={item.imageTitle || item.title || "Blog Image Title"}
              altImage={item.altImage || item.tagline || "Article Thumbnail"}
              className={`border-none`}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderBlogList = () => {
    return (
      <div className="grid grid-cols-2 gap-5 md:gap-10">
        <div className="flex flex-col gap-10">
          {blog_list
            ?.slice(0, blog_list?.length > 7 ? 4 : 2)
            .map((item, index) => (
              <BlogCard
                key={index}
                category={sanitizeUrl(item.article_category) || "#"}
                title={item.title}
                published_at={item.published_at}
                // tagline={item.tagline}
                image={
                  item.image ? `${imagePath}/${item.image}` : "/no-image.png"
                }
                href={`/${encodeURI(
                  sanitizeUrl(item.article_category)
                )}/${encodeURI(sanitizeUrl(item.title))}`}
                imageHeight="h-72 md:h-[420px]"
                imageTitle={item.imageTitle || item.title || "Blog Image Title"}
                altImage={item.altImage || item.tagline || "Article Thumbnail"}
              />
            ))}
        </div>
        <div className="flex flex-col gap-10">
          {blog_list
            ?.slice(
              blog_list?.length > 7 ? 5 : 2,
              blog_list?.length > 7 ? 9 : 4
            )
            .map((item, index) => (
              <BlogCard
                key={index}
                category={sanitizeUrl(item.article_category) || "#"}
                title={item.title}
                published_at={item.published_at}
                image={
                  item.image ? `${imagePath}/${item.image}` : "/no-image.png"
                }
                href={`/${encodeURI(
                  sanitizeUrl(item.article_category)
                )}/${encodeURI(sanitizeUrl(item.title))}`}
                imageHeight={index === 0 ? "h-40" : "h-72 md:h-[410px]"}
                imageTitle={item.imageTitle || item.title || "Blog Image Title"}
                altImage={item.altImage || item.tagline || "Article Thumbnail"}
              />
            ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${myFont.className}`}>
      <Head>
        <meta charSet="UTF-8" />
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <link rel="author" href={`https://www.${domain}`} />
        <link rel="publisher" href={`https://www.${domain}`} />
        <link rel="canonical" href={`https://www.${domain}`} />
        <meta name="theme-color" content="#008DE5" />
        <link rel="manifest" href="/manifest.json" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <GoogleTagManager />
        <meta
          name="google-site-verification"
          content="zbriSQArMtpCR3s5simGqO5aZTDqEZZi9qwinSrsRPk"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
      </Head>

      {renderSections()}

      <JsonLd
        data={{
          "@context": "https://www.schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `http://${domain}/`,
              url: `http://${domain}/`,
              name: meta?.title,
              isPartOf: {
                "@id": `http://${domain}`,
              },
              description: meta?.description,
              inLanguage: "en-US",
              primaryImageOfPage: {
                "@type": "ImageObject",
                url: `${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${banner?.file_name}`,
                width: 1920,
                height: 1080,
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `http://${domain}/`,
              },
            },
            {
              "@type": "WebSite",
              "@id": `http://${domain}/#website`,
              url: `http://${domain}/`,
              name: domain,
              description: meta?.description,
              inLanguage: "en-US",
              publisher: {
                "@type": "Organization",
                "@id": `http://${domain}`,
              },
            },
            {
              "@type": "Organization",
              "@id": `http://${domain}`,
              name: domain,
              url: `http://${domain}/`,
              logo: {
                "@type": "ImageObject",
                url: `${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo.file_name}`,
                width: logo.width,
                height: logo.height,
              },
              sameAs: [
                "http://www.facebook.com",
                "http://www.twitter.com",
                "http://instagram.com",
              ],
            },
            {
              "@type": "ItemList",
              url: `http://${domain}`,
              name: "blog",
              itemListElement: blog_list?.map((blog, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "Article",
                  url: `http://${domain}/${blog?.article_category}/${blog.key}`,
                  name: blog.title,
                  author: {
                    "@type": "Person",
                    name: blog.author,
                  },
                  datePublished: blog.datePublished,
                  dateModified: blog.dateModified,
                  image: {
                    "@type": "ImageObject",
                    url: `${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${blog.imagePath}/${blog.imageFileName}`,
                    width: blog.imageWidth,
                    height: blog.imageHeight,
                  },
                  headline: blog.title,
                  description: blog.description,
                  mainEntityOfPage: {
                    "@type": "WebPage",
                    "@id": `http://${domain}/${blog?.article_category
                      ?.replaceAll(" ", "-")
                      ?.toLowerCase()}/${blog.title
                      ?.replaceAll(" ", "-")
                      ?.toLowerCase()}`,
                  },
                },
              })),
            },
          ],
        }}
      />
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const domain = getDomain(req?.headers?.host);
  const meta = await callBackendApi({ domain, type: "meta_home" });
  const logo = await callBackendApi({ domain, type: "logo" });
  const favicon = await callBackendApi({ domain, type: "favicon" });
  const blog_list = await callBackendApi({ domain, type: "blog_list" });
  const categories = await callBackendApi({ domain, type: "categories" });

  const contact_details = await callBackendApi({
    domain,
    type: "contact_details",
  });
  const project_id = logo?.data[0]?.project_id || null;
  const about_me = await callBackendApi({ domain, type: "about_me" });
  const copyright = await callBackendApi({ domain, type: "copyright" });
  const banner = await callBackendApi({ domain, type: "banner" });
  const layout = await callBackendApi({ domain, type: "layout" });
  const tag_list = await callBackendApi({ domain, type: "tag_list" });
  const nav_type = await callBackendApi({ domain, type: "nav_type" });
  const footer_type = await callBackendApi({ domain, type: "footer_type" });
  const all_data = await callBackendApi({ domain, type: "" });
  const imagePath = await getImagePath(project_id, domain);

  robotsTxt({ domain });

  return {
    props: {
      domain,
      imagePath,
      meta: meta?.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
      logo: logo?.data[0] || null,
      layout: layout?.data[0]?.value || null,
      blog_list: blog_list?.data[0]?.value || [],
      categories: categories?.data[0]?.value || null,
      copyright: copyright?.data[0].value || null,
      about_me: about_me?.data[0] || null,
      banner: banner?.data[0],
      contact_details: contact_details?.data[0]?.value,
      nav_type: nav_type?.data[0]?.value || {},
      footer_type: footer_type?.data[0]?.value || {},
      tag_list: tag_list?.data[0]?.value || null,
      all_data,
    },
  };
}
