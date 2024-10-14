import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const BlogCard = ({
  href,
  image,
  title,
  tagline,
  altImage,
  className,
  imageTitle,
  imageHeight,
  published_at,
  category
}) => {
  const encodedHref = href ? encodeURI(href) : "#";

  return (
    <div
      className={cn("flex flex-col  h-fit border-b border-gray-200", className)}
    >
      <Link
        title={imageTitle}
        href={encodedHref}
        className={cn("relative overflow-hidden w-full", imageHeight)}
      >
        <Image
          src={image}
          width={331}
          height={parseInt(imageHeight, 10) || 420}
          loading="eager"
          alt={altImage}
          priority={true}
          title={imageTitle}
          className="w-full h-full absolute top-0 hover:scale-125 transition-all duration-1000"
          style={{ objectFit: "cover" }}
        />
      </Link>

      <div className="flex flex-col  justify-start text-start gap-2 mt-3">
      <p className="text-sm font-bold text-gray-800">{category}</p>

        <Link
          className="font-extrabold md:text-3xl leading-tight"
          title={title}
          href={encodedHref}
        >
          {title}
        </Link>
      </div>
      <p className="mt-3 text-xs md:hidden">{tagline?.slice(0, 100)}</p>
      <p className="mt-3 text-sm hidden md:block">{tagline}</p>
      <p className="text-sm font-medium text-gray-700">{published_at}</p>

      
    </div>
  );
};

export default BlogCard;
