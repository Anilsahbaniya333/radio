"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { normalizeAudioLink, drivePreviewUrl } from "@/lib/audioLinks";

type RecRow = {
  id: number;
  title: string;
  audio_link: string | null;
  created_at: string;
};

export default function RecordingSection() {
  const [rows, setRows] = useState<RecRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("recordings")
        .select("id, title, audio_link, created_at")
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) console.error("Recordings error:", error.message);

      const fixed = ((data as RecRow[]) || []).map((r) => ({
        ...r,
        audio_link: normalizeAudioLink(r.audio_link),
      }));

      setRows(fixed);
      setLoading(false);
    })();
  }, []);

  const latest = rows[0];
  const latestLink = latest?.audio_link || "";
  const latestIsDrive = latestLink.includes("drive.google.com");

  const latestPreview = useMemo(() => {
    if (!latestIsDrive) return null;
    return drivePreviewUrl(latestLink);
  }, [latestIsDrive, latestLink]);

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">🎧 Recording Programme</h2>

      {loading ? (
        <p>Loading...</p>
      ) : rows.length === 0 ? (
        <p>No recordings found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Latest player */}
          <aside className="border rounded p-4 h-fit">
            <h3 className="text-lg font-semibold">Latest Recording</h3>

            {!latest?.audio_link ? (
              <p className="mt-2 text-sm text-gray-500">No recording available.</p>
            ) : (
              <div className="mt-3 space-y-2">
                {latestIsDrive && latestPreview ? (
                  <iframe
                    className="w-full h-[90px] rounded"
                    src={latestPreview}
                    allow="autoplay"
                  />
                ) : (
                  <audio controls preload="metadata" className="w-full">
                    <source src={latest.audio_link} />
                  </audio>
                )}

                <p className="text-xs text-gray-500">
                  Now playing: <span className="font-medium">{latest.title}</span>
                </p>
              </div>
            )}
          </aside>

          {/* List */}
          <div className="space-y-3">
            {rows.map((r) => (
              <div key={r.id} className="border rounded p-4">
                <p className="font-semibold">{r.title}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(r.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
