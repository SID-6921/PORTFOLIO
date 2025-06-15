
import React, { useEffect, useState } from "react";
import BlogCard3D from "./BlogCard3D";

// Dynamically import rss-parser only on client for SSR safety
const getFeed = async () => {
  if (typeof window === "undefined") return [];
  const Parser = (await import("rss-parser")).default;
  const parser = new Parser();
  const feed = await parser.parseURL("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@nandasiddhardha");
  // rss-parser doesn't work with CORS when fetching directly from Medium, so using rss2json
  if (feed && feed.items) {
    return feed.items.map((item: any) => ({
      title: item.title,
      excerpt: item.description
        ? item.description.replace(/<[^>]+>/g, "").slice(0, 140) + "..."
        : "",
      url: item.link,
      image:
        item.thumbnail ||
        "/placeholder.svg",
      pubDate: item.pubDate,
    }));
  }
  return [];
};

export default function MediumFeedSection() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeed()
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="blog" className="relative py-24 bg-transparent flex flex-col items-center">
      <div className="max-w-6xl w-full mx-auto">
        <h2 className="font-inter text-2xl md:text-3xl font-bold mb-8 text-graphite tracking-tight text-center">
          Latest from Medium
        </h2>
        {loading && (
          <div className="text-center text-gray-400 text-lg mb-8">Loading posts...</div>
        )}
        {!loading && posts.length === 0 && (
          <div className="text-center text-gray-500 mb-8">No articles found for @nandasiddhardha.</div>
        )}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {posts.map((post, i) => (
            <BlogCard3D key={post.url || post.title}>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl overflow-hidden block bg-white/70 hover:bg-columbiablue/30 shadow-lg transition-all duration-300 h-full"
                tabIndex={0}
                aria-label={`Read ${post.title}`}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-44 object-cover"
                  loading="lazy"
                  onError={e => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
                <div className="p-5">
                  <div className="font-inter font-semibold text-lg text-ultramarine mb-2">{post.title}</div>
                  <div className="font-ibm text-gray-700 text-base">{post.excerpt}</div>
                  <div className="text-xs text-right text-gray-400 pt-2">{post.pubDate && new Date(post.pubDate).toLocaleDateString()}</div>
                </div>
              </a>
            </BlogCard3D>
          ))}
        </div>
      </div>
    </section>
  );
}
