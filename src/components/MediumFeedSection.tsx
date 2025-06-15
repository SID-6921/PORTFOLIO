
import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Parser from "rss-parser";
import BlogCard3D from "./BlogCard3D";
import GlassCard from "./GlassCard";
import { Loader2 } from "lucide-react";

const mediumRSS =
  "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@nandasiddhardha13";

type Blog = {
  title: string;
  link: string;
  pubDate: string;
  thumbnail: string;
  guid?: string;
  categories: string[];
  author: string;
  description: string;
};

async function fetchMediumBlogs(): Promise<Blog[]> {
  const res = await fetch(mediumRSS);
  const json = await res.json();
  return json.items as Blog[];
}

export default function MediumFeedSection() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["medium-feed"],
    queryFn: fetchMediumBlogs,
    staleTime: 1000 * 60 * 10,
  });

  const latestBlogs = useMemo(() => (data ? data.slice(0, 6) : []), [data]);

  if (error)
    return (
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-graphite text-center">
          Latest Blogs
        </h2>
        <div className="text-center text-red-500">Could not load Medium posts.</div>
      </section>
    );

  return (
    <section id="blogs" className="w-full py-24 bg-transparent flex flex-col items-center">
      <div className="max-w-6xl w-full">
        <h2 className="font-inter text-2xl md:text-3xl font-bold mb-8 text-graphite tracking-tight text-center">
          Latest Medium Blogs
        </h2>
        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="animate-spin text-ultramarine w-10 h-10" />
          </div>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {latestBlogs.map((blog) => (
              <BlogCard3D key={blog.guid || blog.link} className="hover:shadow-glow">
                <a
                  href={blog.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block focus:outline-none"
                >
                  <GlassCard className="p-5 h-full flex flex-col hover:scale-[1.03] transition-transform duration-200 cursor-pointer group">
                    <img
                      src={blog.thumbnail}
                      alt={blog.title}
                      className="w-full aspect-[16/9] object-cover rounded-t-glass mb-3 group-hover:shadow-glow"
                    />
                    <div className="font-inter font-semibold text-lg text-ultramarine mb-2 group-hover:text-teal">
                      {blog.title}
                    </div>
                    <div
                      className="font-ibm text-gray-700 text-base mb-3 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: blog.description.replace(/<[^>]+>/g, "") }}
                    />
                    <div className="flex flex-wrap gap-2 mb-2">
                      {blog.categories?.slice(0, 4).map((cat) => (
                        <span
                          key={cat}
                          className="bg-ultramarine/10 text-ultramarine border border-ultramarine/20 font-ibm text-xs px-2 py-1 rounded-full"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 italic">
                      {new Date(blog.pubDate).toLocaleDateString()}
                    </div>
                  </GlassCard>
                </a>
              </BlogCard3D>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
