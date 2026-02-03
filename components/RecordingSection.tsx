"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { drivePreviewUrl, normalizeAudioLink } from "@/lib/audioLinks";

type Row = {
  id: number;
  audio_link: string | null;
  created_at: string;
};

function formatHeading(ts: string) {
  // Example: 2026 Feb 02 • 11:30
  return new Date(ts).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function RecordingSection() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("news") // ✅ using your existing table that already has audio_link + created_at
        .select("id, audio_link, created_at")
        .not("audio_link", "is", null) // ✅ only recordings
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) {
        console.error("Recordings error:", error.message);
        setRows([]);
        setLoading(false);
        return;
      }

      const fixed = ((data as Row[]) || []).map((r) => ({
        ...r,
        audio_link: normalizeAudioLink(r.audio_link),
      }));

      setRows(fixed);
      setLoading(false);
    })();
  }, []);

  const visibleRows = showAll ? rows : rows.slice(0, 1);

  // For Google Drive preview (reliable playback)
  const getPlayer = (link: string) => {
    const isDrive = link.includes("drive.google.com");
    const preview = isDrive ? drivePreviewUrl(link) : null;

    if (isDrive && preview) {
      return (
        <iframe className="w-full h-[90px] rounded" src={preview} allow="autoplay" />
      );
    }

    return (
      <audio controls preload="metadata" className="w-full">
        <source src={link} />
      </audio>
    );
  };

  return (
    <section className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">🎧 Latest Recording</h2>

        {rows.length > 1 ? (
          <button
            onClick={() => setShowAll((v) => !v)}
            className="border px-3 py-1 rounded text-sm hover:bg-muted"
            type="button"
          >
            {showAll ? "Show less" : "Show more"}
          </button>
        ) : null}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : rows.length === 0 ? (
        <p>No recordings found.</p>
      ) : (
        <div className="space-y-4">
          {visibleRows.map((r) => (
            <div key={r.id} className="border rounded-xl p-4">
              {/* ✅ DATE AS HEADING */}
              <p className="font-semibold mb-2">{formatHeading(r.created_at)}</p>

              {r.audio_link ? getPlayer(r.audio_link) : <p>No audio link.</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
