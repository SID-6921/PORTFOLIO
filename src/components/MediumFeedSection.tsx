
import React, { useEffect, useState } from "react";
import BlogCard3D from "./BlogCard3D";

// Fetch Medium RSS converted JSON directly from rss2json.com
const getFeed = async () => {
  try {
    const res = await fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@nandasiddhardha"
    );
    const feed = await res.json();
    if (feed && feed.items) {
      return feed.items.map((item: any) => ({
        title: item.title,
        excerpt: item.description
          ? item.description.replace(/<[^>]+>/g, "").slice(0, 140) + "..."
          : "",
        url: item.link,
        image:
          // Try to get an image from the description, otherwise fallback
          (() => {
            const match = item.description?.match(/<img.*?src=["'](.+?)["']/);
            if (match && match[1]) return match[1];
            if (item.thumbnail) return item.thumbnail;
            return "/placeholder.svg";
          })(),
        pubDate: item.pubDate,
      }));
    }
    return [];
  } catch (e) {
    return [];
  }
};

export default function MediumFeedSection() {
  const [posts, setPosts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getFeed()
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  const shownPosts = posts.slice(0, 3); // Only 3 posts shown

  return (
    <section id="blog" className="relative py-24 bg-transparent flex flex-col items-center">
      <div className="max-w-6xl w-full mx-auto px-4">
        <h2 className="font-inter text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-white tracking-tight text-center">
          Latest from Medium
        </h2>
        {loading && (
          <div className="text-center text-gray-500 dark:text-gray-400 text-lg mb-8">Loading posts...</div>
        )}
        {!loading && shownPosts.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 mb-8">No articles found for @nandasiddhardha.</div>
        )}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {shownPosts.map((post, i) => (
            <BlogCard3D key={post.url || post.title}>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl overflow-hidden block bg-white/80 dark:bg-gray-800/90 hover:bg-columbiablue/30 dark:hover:bg-blue-900/50 shadow-lg hover:shadow-glow transition-all duration-300 h-full border border-gray-200/50 dark:border-gray-700/50"
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
                  <div className="font-inter font-semibold text-lg text-ultramarine dark:text-blue-300 mb-2 line-clamp-2">{post.title}</div>
                  <div className="font-ibm text-gray-700 dark:text-gray-300 text-base line-clamp-3">{post.excerpt}</div>
                  <div className="text-xs text-right text-gray-400 dark:text-gray-500 pt-2">{post.pubDate && new Date(post.pubDate).toLocaleDateString()}</div>
                </div>
              </a>
            </BlogCard3D>
          ))}
        </div>
        {/* "Check out more" link */}
        {!loading && posts.length > 0 && (
          <div className="flex justify-center mt-8">
            <a
              href="https://medium.com/@nandasiddhardha"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-ultramarine hover:bg-columbiablue dark:bg-blue-600 dark:hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-ibm font-semibold transition-all duration-300 shadow hover:shadow-glow transform hover:scale-105"
            >
              Check out more on Medium →
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
