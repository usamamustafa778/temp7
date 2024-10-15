import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { sanitizeUrl } from "@/lib/myFun";
import Container from "../common/Container";
import FullContainer from "../common/FullContainer";

export default function MustRead({ blog_list = [], imagePath }) {
  const mustReadBlogs = blog_list.filter((item) => item.isMustRead);

  return (
    mustReadBlogs?.length > 0 && (
      <div>
        <div>
          <div className="grid grid-cols-1  gap-8 w-full  mb-3">
            {mustReadBlogs.map((item, index) => (
              <BlogCard
                key={item.id || index}
                title={item.title}
                published_at={item.published_at}
                author={item.author}
                date={item.published_at}
                tagline={item.tagline}
                description={item.articleContent}
                image={`${imagePath}/${item.image || "no-image.png"}`}
                href={
                  `/${sanitizeUrl(item.article_category)}/${sanitizeUrl(
                    item?.title
                  )}` || "#"
                }
                category={sanitizeUrl(item.article_category) || "#"}
                imageTitle={item.imageTitle}
                altImage={item.altImage}

              />
            ))}
          </div>
        </div>
      </div>
    )
  );
}

function BlogCard({
  title,
  image,
  published_at,
  href,
  category,
  imageTitle = "Article Thumbnail",
  altImage = "No Thumbnail Found",
  tagline,
}) {
  return (
    <div className="grid grid-cols-2  items-center text-start">
    {/* Image Link */}
    <Link
      href={href || "#"}
      title={imageTitle}
      className="relative overflow-hidden w-full  h-[195px]"
    >
      <Image
        src={image}
        title={imageTitle}
        alt={altImage || tagline}
        priority={false}
        width={298}
        height={195}
        loading="lazy"
        sizes="(max-width: 768px) 100vw, (min-width: 768px) 50vw, 33vw"
        className=" h-full hover:scale-110 transition-all"
        style={{ objectFit: "cover" }}
      />
    </Link>
  
    {/* Text Section */}
    <div className="flex flex-col justify-center w-full md:w-auto px-4">
      {/* Category Link */}
      <Link href={category}>
        <p className="text-xl text-gray-500 font-bold my-2">{category}</p>
      </Link>
  
      {/* Title Link */}
      <Link href={href || ""}>
        <p className="font-bold text-2xl">{title}</p>
      </Link>
  
      {/* Published Date */}
      <p>{published_at}</p>
    </div>
  </div>
  
  );
}
