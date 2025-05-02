import { signInAnonymously } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, storage } from "@/firebase";

export function useUpload() {
  const upload = async (blob: Blob) => {
    try {
      if (!auth.currentUser) {
        await signInAnonymously(auth);
      }

      const uid = auth.currentUser?.uid;
      if (!uid) return alert("User not signed in");

      const filename = `drawing-${Date.now()}-${uid}.png`;
      const fileRef = ref(storage, `drawings/${filename}`);

      await uploadBytes(fileRef, blob);
      const downloadURL = await getDownloadURL(fileRef);

      console.log("Uploaded successfully:", downloadURL);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed");
    }
  };

  return {
    upload,
  };
}
