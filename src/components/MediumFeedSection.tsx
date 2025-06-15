
import React from "react";
import { useQuery } from "@tanstack/react-query";
import GlassCard from "./GlassCard";
import { Skeleton } from "./ui/skeleton";

type MediumPost = {
  title: string;
  link: string;
  pubDate?: string;
  creator?: string;
  contentSnippet?: string;
};

// Proxy server to fetch Medium RSS and deal with CORS
const RSS_PROXY = "https://api.allorigins.win/get?url=";
const MEDIUM_RSS_URL = encodeURIComponent("https://medium.com/feed/@nandasiddhardha");

async function fetchMediumPosts(): Promise<MediumPost[]> {
  // Fetch the RSS XML via the proxy
  const response = await fetch(`https://api.allorigins.win/get?url=https://medium.com/feed/@nandasiddhardha`);
  if (!response.ok) throw new Error("Failed to fetch RSS feed");
  const resJson = await response.json();
  const domParser = new window.DOMParser();
  const rssDoc = domParser.parseFromString(resJson.contents, "text/xml");
  const items = rssDoc.querySelectorAll("item");
  const posts: MediumPost[] = [];
  for (let i = 0; i < Math.min(3, items.length); i++) {
    const item = items[i];
    const descriptionHTML = item.querySelector("description")?.textContent || "";
    // Try to extract snippet from <p class="medium-feed-snippet">...</p>
    let snippet = "";
    if (descriptionHTML) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = descriptionHTML;
      const snippetElem = tempDiv.querySelector(".medium-feed-snippet");
      if (snippetElem && snippetElem.textContent) {
        snippet = snippetElem.textContent;
      } else {
        // Fallback: Remove all HTML tags and return the first 150 chars
        snippet = tempDiv.textContent?.replace(/(<([^>]+)>)/gi, "").slice(0, 150) || "";
      }
    }
    posts.push({
      title: item.querySelector("title")?.textContent || "",
      link: item.querySelector("link")?.textContent || "",
      pubDate: item.querySelector("pubDate")?.textContent || "",
      creator: item.querySelector("creator")?.textContent || "",
      contentSnippet: snippet,
    });
  }
  return posts;
}

export default function MediumFeedSection() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["medium-posts"],
    queryFn: fetchMediumPosts,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10, // 10 min
  });

  return (
    <section id="medium-blogs" className="flex flex-col items-center mb-4 pt-8">
      <GlassCard className="max-w-xl w-full p-8 mb-7 flex flex-col items-center animate-fade-in">
        <h2 className="font-inter text-2xl md:text-3xl font-bold text-graphite mb-2">Latest Medium Blogs</h2>
        {isLoading ? (
          <div className="w-full flex flex-col gap-3">
            <Skeleton className="h-6 w-3/4 mx-auto" />
            <Skeleton className="h-4 w-1/2 mx-auto" />
            <Skeleton className="h-6 w-3/4 mx-auto mt-3" />
            <Skeleton className="h-4 w-2/3 mx-auto" />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center mt-4 text-base">
            Could not load Medium posts. <a className="underline text-ultramarine" href="https://medium.com/@nandasiddhardha" target="_blank" rel="noopener noreferrer">View on Medium</a>
          </div>
        ) : (
          <ul className="w-full flex flex-col gap-5 mt-3">
            {data?.length === 0 && (
              <div className="text-gray-500 text-center mt-3">No blogs found. <a href="https://medium.com/@nandasiddhardha" target="_blank" rel="noopener noreferrer" className="underline text-ultramarine">See on Medium</a></div>
            )}
            {data?.map((post) => (
              <li key={post.link} className="w-full">
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:bg-columbiablue/10 rounded-lg px-3 py-2 transition-colors group animate-fade-in"
                >
                  <div className="text-lg font-bold text-ultramarine group-hover:underline underline-offset-2 transition-all">
                    {post.title}
                  </div>
                  {post.contentSnippet && (
                    <div className="text-gray-700 text-sm my-1">{post.contentSnippet.slice(0, 100)}...</div>
                  )}
                  <span className="text-xs text-gray-400">
                    {post.pubDate && new Date(post.pubDate).toLocaleDateString()}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </GlassCard>
    </section>
  );
}
