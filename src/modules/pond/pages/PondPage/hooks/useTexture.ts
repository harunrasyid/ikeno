import { useEffect, useState, useCallback, useMemo } from "react";
import { getDownloadURL, getMetadata, list, ref } from "firebase/storage";
import { storage } from "@/firebase";
import { useLoading } from "@/hooks";

export function useTexture() {
  // Loading hooks
  const { isLoading, setLoading } = useLoading(false);

  const [textureUrls, setTextureUrls] = useState<string[]>([]);

  // Memoize the folder reference
  const folderRef = useMemo(() => ref(storage, "drawings"), []);

  // Memoize the fetch function to avoid re-creating it
  const fetchImagesUploadedLastHour = useCallback(async () => {
    setLoading(true);
    const result = await list(folderRef, { maxResults: 30 });

    const now = Date.now();
    const oneHourAgo = now - 60 * 60 * 1000;

    const filteredUrls = await Promise.all(
      result.items.map(async (itemRef) => {
        const metadata = await getMetadata(itemRef);
        const timeCreated = new Date(metadata.timeCreated).getTime();
        if (timeCreated >= oneHourAgo) {
          return getDownloadURL(itemRef);
        }
        return null;
      })
    );

    setLoading(false);
    return filteredUrls.filter((url) => url !== null) as string[];
  }, [folderRef]);

  useEffect(() => {
    fetchImagesUploadedLastHour()
      .then((urls) => {
        setTextureUrls(urls);
      })
      .catch(console.error);
  }, [fetchImagesUploadedLastHour]);

  return { textureUrls, isLoading };
}
