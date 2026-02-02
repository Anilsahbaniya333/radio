"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type NewsRow = {
  id: number;
  heading: string;
  news: string;
  audio_link: string | null;
  created_at: string;
};

// Convert Drive share/view links to direct link (optional)
function normalizeAudioLink(input: string | null): string | null {
  if (!input) return null;
  const raw = input.trim();
  if (!raw) return null;

  try {
    const url = new URL(raw);
    const host = url.hostname.replace("www.", "");

    if (host === "drive.google.com") {
      const m = url.pathname.match(/\/file\/d\/([^/]+)/);
      if (m?.[1]) return `https://drive.google.com/uc?export=download&id=${m[1]}`;

      const openId = url.searchParams.get("id");
      if (openId) return `https://drive.google.com/uc?export=download&id=${openId}`;

      const ucId = url.searchParams.get("id");
      if (url.pathname === "/uc" && ucId)
        return `https://drive.google.com/uc?export=download&id=${ucId}`;
    }

    return raw;
  } catch {
    return raw;
  }
}

// Best for Drive playback: iframe preview URL
function drivePreviewUrl(link: string): string | null {
  try {
    const url = new URL(link);

    const m = url.pathname.match(/\/file\/d\/([^/]+)/);
    const idFromPath = m?.[1];

    const idFromQuery = url.searchParams.get("id");

    const id = idFromPath || idFromQuery;
    if (!id) return null;

    return `https://drive.google.com/file/d/${id}/preview`;
  } catch {
    return null;
  }
}

export default function NewsAndAudio() {
  const [rows, setRows] = useState<NewsRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("news")
        .select("id, heading, news, audio_link, created_at")
        .order("created_at", { ascending: false })
        .limit(2);

      if (error) {
        console.error("Supabase error:", error.message);
      } else {
        const fixed = ((data as NewsRow[]) || []).map((r) => ({
          ...r,
          audio_link: normalizeAudioLink(r.audio_link),
        }));
        setRows(fixed);
      }

      setLoading(false);
    })();
  }, []);

  // ✅ Latest item used for the Recording section
  const latest = rows[0];
  const latestLink = latest?.audio_link || "";
  const latestIsDrive = latestLink.includes("drive.google.com");
  const latestPreview = latestIsDrive ? drivePreviewUrl(latestLink) : null;

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">📰 News</h2>

      {loading ? (
        <p>Loading...</p>
      ) : rows.length === 0 ? (
        <p>No news found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {/* LEFT: News list */}
          <div className="space-y-4">
            {rows.map((r) => (
              <article key={r.id} className="border rounded p-4">
                <h3 className="text-lg font-semibold">{r.heading}</h3>
                <p className="mt-2">{r.news}</p>
              </article>
            ))}
          </div>

          {/* RIGHT: Latest Recording */}
          <aside className="border rounded p-4 h-fit">
            <h3 className="text-lg font-semibold">🎧 Latest Recording</h3>

            {!latest?.audio_link ? (
              <p className="mt-2 text-sm text-gray-500">
                No recording available.
              </p>
            ) : (
              <div className="mt-3 space-y-2">
                {/* Google Drive: iframe preview */}
                {latestIsDrive && latestPreview ? (
                  <iframe
                    className="w-full h-[90px] rounded"
                    src={latestPreview}
                    allow="autoplay"
                  />
                ) : (
                  /* Normal mp3 links: audio */
                  <audio controls preload="metadata" className="w-full">
                    <source src={latest.audio_link} />
                  </audio>
                )}

                <p className="text-xs text-gray-500">
                  This is the latest recording.
                </p>
              </div>
            )}
          </aside>
        </div>
      )}
    </section>
  );
}
