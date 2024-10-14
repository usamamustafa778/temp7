import React from "react";
import FooterStyle1 from "./FooterStyle1";
import FooterStyle2 from "./FooterStyle2";

export default function Footer({ categories, blog_list, imagePath, category,footer_type }) {
  const renderActiveStyle = () => {
    const props = {
      blog_list,
      imagePath,
      categories,
      category
    };

    switch (footer_type?.active) {
      case "style_1":
        return <FooterStyle1 {...props} />;
     
        case "style_2":
        return <FooterStyle2 {...props} />;
     
      default:
        return null;
    }
  };
  return (
    <>
    {renderActiveStyle()}
  </>
  )
}
