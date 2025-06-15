
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Parser from "rss-parser";
import GlassCard from "./GlassCard";
import { Skeleton } from "./ui/skeleton";

type MediumPost = {
  title: string;
  link: string;
  pubDate?: string;
  creator?: string;
  contentSnippet?: string;
};

const MEDIUM_RSS_URL = "https://medium.com/feed/@nandasiddhardha";

async function fetchMediumPosts(): Promise<MediumPost[]> {
  const parser = new Parser();
  const feed = await parser.parseURL(MEDIUM_RSS_URL);
  return (feed.items || []).slice(0, 3) as MediumPost[];
}

export default function MediumFeedSection() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["medium-posts"],
    queryFn: fetchMediumPosts,
  });

  return (
    <section id="medium-blogs" className="flex flex-col items-center mb-4 pt-8">
      <GlassCard className="max-w-xl w-full p-8 mb-7 flex flex-col items-center">
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
            {data?.map((post) => (
              <li key={post.link} className="w-full">
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:bg-columbiablue/10 rounded-lg px-3 py-2 transition-colors"
                >
                  <div className="text-lg font-bold text-ultramarine">{post.title}</div>
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
