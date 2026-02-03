"use client";

import { useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { normalizeAudioLink } from "@/lib/audioLinks";

export default function AdminNewsPage() {
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

    if (audioInput.trim() && !audio_link) {
      setMsg("❌ Audio link is not a valid URL.");
      return;
    }

    const { error } = await supabase.from("news").insert([
      {
        heading,
        news,
        audio_link,
        publish: true, 
      },
    ]);

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
        <input
          className="border p-2 w-full rounded"
          name="heading"
          placeholder="Heading"
          required
        />

        <textarea
          className="border p-2 w-full rounded min-h-[120px]"
          name="news"
          placeholder="Write news..."
          required
        />

        <input
          className="border p-2 w-full rounded"
          value={audioInput}
          onChange={(e) => setAudioInput(e.target.value)}
          placeholder="Audio link (Google Drive share link or mp3 URL)"
        />

        {audioInput.trim() ? (
          <p className="text-xs text-gray-500 break-all">
            <b>Saved as:</b> {normalizedPreview || "Invalid URL"}
          </p>
        ) : null}

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
