// Convert Google Drive share links into direct download links
export function normalizeAudioLink(input: string | null): string | null {
    if (!input) return null;
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
  
      return raw;
    } catch {
      return raw;
    }
  }
  
  // For iframe preview playback
  export function drivePreviewUrl(link: string): string | null {
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
  