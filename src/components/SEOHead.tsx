import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Siddhardha Nanda - Biomedical Engineer & Tech Innovator",
  description = "Biomedical Engineering graduate student at Columbia University specializing in medical technology, AI, and digital health solutions. Explore my projects and innovations at the intersection of healthcare and technology.",
  keywords = "biomedical engineering, medical technology, AI healthcare, digital health, Columbia University, innovation, medical devices, portfolio, Siddhardha Nanda, embedded systems, IoT, machine learning",
  image = "https://res.cloudinary.com/dae56bvjp/image/upload/v1750852722/nanda_wbgmag.jpg",
  url = "https://siddhardhananda.com",
  type = "website"
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Siddhardha Nanda",
    "jobTitle": "Biomedical Engineer",
    "description": description,
    "url": url,
    "image": image,
    "sameAs": [
      "https://linkedin.com/in/nanda-siddhardha",
      "https://github.com/SID-6921",
      "https://medium.com/@nandasiddhardha",
      "https://www.researchgate.net/profile/Nanda-Siddhardha"
    ],
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "Columbia University",
      "department": "Biomedical Engineering"
    },
    "knowsAbout": [
      "Biomedical Engineering",
      "Medical Technology",
      "Artificial Intelligence",
      "Machine Learning",
      "Digital Health",
      "Embedded Systems",
      "IoT Devices",
      "Healthcare Innovation"
    ],
    "email": "siddhardha.nanda@columbia.edu",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "New York",
      "addressRegion": "NY",
      "addressCountry": "US"
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Siddhardha Nanda" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Siddhardha Nanda Portfolio" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@nandasiddhardha" />
      
      {/* LinkedIn */}
      <meta property="article:author" content="Siddhardha Nanda" />
      <meta property="article:publisher" content="https://linkedin.com/in/nanda-siddhardha" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#3B82F6" />
      <meta name="msapplication-TileColor" content="#3B82F6" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Siddhardha Nanda" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://res.cloudinary.com" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//res.cloudinary.com" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Additional structured data for portfolio */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Siddhardha Nanda Portfolio",
          "url": url,
          "description": description,
          "author": {
            "@type": "Person",
            "name": "Siddhardha Nanda"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${url}#search={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;