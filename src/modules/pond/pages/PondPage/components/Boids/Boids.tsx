import { useEffect, useState } from "react";
import { Vector3 } from "three";
import { getDownloadURL, getMetadata, list, ref } from "firebase/storage";
import { storage } from "@/firebase";
import { Boid } from "../Boid";

export const Boids = () => {
  const [textureUrls, setTextureUrls] = useState<string[]>([]);

  const fetchImagesUploadedLastHour = async (): Promise<string[]> => {
    const folderRef = ref(storage, "drawings");
    const result = await list(folderRef, { maxResults: 50 });

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

  if (textureUrls.length === 0) return <></>;

  return (
    <>
      <Boid
        position={new Vector3(0, 0, 0)}
        model={"Koi_01"}
        animation={"Fish_Armature|Swimming_Fast"}
        textureUrl={textureUrls[0]}
      />
    </>
  );
};
