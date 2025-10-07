export async function uploadToCloudinary(file: File): Promise<string> {
  try {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

    if (!cloudName || !uploadPreset) {
      throw new Error("Missing Cloudinary environment variables");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("Cloudinary error:", data);
      throw new Error(data.error?.message || "Failed to upload image to Cloudinary");
    }

    return data.secure_url;
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to upload image to Cloudinary";
    console.error("Cloudinary upload failed:", errorMessage);
    throw new Error(errorMessage);
  }
}
