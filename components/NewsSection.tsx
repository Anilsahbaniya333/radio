"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type NewsRow = {
  id: number;
  heading: string;
  news: string;
  created_at: string;
};

export default function NewsSection() {
  const [rows, setRows] = useState<NewsRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("news")
        .select("id, heading, news, created_at")
        .order("created_at", { ascending: false })
        .limit(2);

      if (error) console.error("News error:", error.message);
      setRows((data as NewsRow[]) || []);
      setLoading(false);
    })();
  }, []);

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">📰 News</h2>

      {loading ? (
        <p>Loading...</p>
      ) : rows.length === 0 ? (
        <p>No news found.</p>
      ) : (
        <div className="space-y-4">
          {rows.map((r) => (
            <article key={r.id} className="border rounded p-4">
              <h3 className="text-lg font-semibold">{r.heading}</h3>
              <p className="mt-2">{r.news}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
