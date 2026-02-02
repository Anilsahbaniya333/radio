"use client";

import { useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

// Convert Google Drive share link -> direct link
function normalizeAudioLink(input: string): string | null {
  const raw = input.trim();
  if (!raw) return null;

  try {
    const url = new URL(raw);
    const host = url.hostname.replace("www.", "");

    if (host === "drive.google.com") {
      // /file/d/<ID>/view
      const m = url.pathname.match(/\/file\/d\/([^/]+)/);
      if (m?.[1]) return `https://drive.google.com/uc?export=download&id=${m[1]}`;

      // /open?id=<ID>
      const openId = url.searchParams.get("id");
      if (openId) return `https://drive.google.com/uc?export=download&id=${openId}`;

      // already /uc?export=download&id=<ID>
      const ucId = url.searchParams.get("id");
      if (url.pathname === "/uc" && ucId)
        return `https://drive.google.com/uc?export=download&id=${ucId}`;
    }

    // non-drive link, keep as-is
    return raw;
  } catch {
    return null;
  }
}

export default function AdminNews() {
  const [msg, setMsg] = useState("");
  const [audioInput, setAudioInput] = useState("");

  const normalizedPreview = useMemo(
    () => normalizeAudioLink(audioInput),
    [audioInput]
  );

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    setMsg("Saving...");

    const f = new FormData(formEl);
    const heading = String(f.get("heading") || "").trim();
    const news = String(f.get("news") || "").trim();

    const audio_link = normalizeAudioLink(audioInput);

    if (!heading || !news) {
      setMsg("❌ Heading and News are required.");
      return;
    }

    // If user typed something but it's not a valid URL
    if (audioInput.trim() && !audio_link) {
      setMsg("❌ Audio link is not a valid URL.");
      return;
    }

    const { error } = await supabase
      .from("news")
      .insert([{ heading, news, audio_link }]);

    if (error) {
      setMsg("❌ " + error.message);
      return;
    }

    formEl.reset();
    setAudioInput("");
    setMsg("✅ Posted!");
  }

  return (
    <div className="p-6 max-w-xl space-y-4">
      <h1 className="text-2xl font-bold">Add News</h1>

      <form onSubmit={submit} className="space-y-3">
        <div className="space-y-1">
          <label className="text-sm font-medium">Heading</label>
          <input
            className="border p-2 w-full rounded"
            name="heading"
            placeholder="Heading"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">News</label>
          <textarea
            className="border p-2 w-full rounded min-h-[120px]"
            name="news"
            placeholder="Write news..."
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Audio URL (optional)</label>
          <input
            className="border p-2 w-full rounded"
            value={audioInput}
            onChange={(e) => setAudioInput(e.target.value)}
            placeholder="Paste Google Drive share link or mp3 URL"
          />

          {audioInput.trim() ? (
            <p className="text-xs text-gray-500 break-all">
              <span className="font-semibold">Saved as:</span>{" "}
              {normalizedPreview || "Invalid URL"}
            </p>
          ) : null}
        </div>

        <button className="border px-4 py-2 rounded" type="submit">
          Submit
        </button>
      </form>

      {msg ? <p>{msg}</p> : null}

      <p className="text-xs text-gray-500">
        Tip: Google Drive file must be “Anyone with the link → Viewer”.
      </p>
    </div>
  );
}
