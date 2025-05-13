import { useEffect, useState } from "react";
import { getDownloadURL, getMetadata, list, ref } from "firebase/storage";
import { storage } from "@/firebase";

export function useTexture() {
  const [textureUrls, setTextureUrls] = useState<string[]>([]);

  const fetchImagesUploadedLastHour = async (): Promise<string[]> => {
    const folderRef = ref(storage, "drawings");
    const result = await list(folderRef, { maxResults: 30 });

    const now = Date.now();
    const oneHourAgo = now - 60 * 60 * 1000;

    const filteredUrls: string[] = [];
    for (const itemRef of result.items) {
      const metadata = await getMetadata(itemRef);
      const timeCreated = new Date(metadata.timeCreated).getTime();
      if (timeCreated >= oneHourAgo) {
        const url = await getDownloadURL(itemRef);
        filteredUrls.push(url);
      }
    }

    return filteredUrls;
  };

  useEffect(() => {
    fetchImagesUploadedLastHour()
      .then((urls) => {
        setTextureUrls(urls);
      })
      .catch(console.error);
  }, []);

  return { textureUrls };
}
