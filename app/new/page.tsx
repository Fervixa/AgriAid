"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/Authcontext";
import { uploadToCloudinary } from "@/lib/Cloudinary";

export default function AnalyzePage() {
  const { user } = useAuth();
  const router = useRouter();

  const [symptom, setSymptom] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [cloudinaryUrl, setCloudinaryUrl] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [authLoaded, setAuthLoaded] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [language, setLanguage] = useState("english");

  useEffect(() => {
    const timer = setTimeout(() => setAuthLoaded(true), 300);
    return () => clearTimeout(timer);
  }, [user]);

  // Auto-upload to Cloudinary when image is selected
  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
    setCurrentStep(2);

    // Auto-upload to Cloudinary
    try {
      setUploadingImage(true);
      const url = await uploadToCloudinary(file);
      if (!url) throw new Error("Upload failed");
      
      setCloudinaryUrl(url);
      setImageUploaded(true);
      console.log("✅ Image uploaded to Cloudinary:", url);
    } catch (err) {
      console.error("❌ Upload error:", err);
      alert("Failed to upload image. Please try again.");
      setImage(null);
      setImagePreview(null);
      setCurrentStep(1);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Please login first!");
      return;
    }

    if (!cloudinaryUrl && !symptom) {
      alert("Please upload an image or describe symptoms!");
      return;
    }

    try {
      setAnalyzing(true);
      setCurrentStep(3);
      const token = await user.getIdToken();

      const res = await fetch("https://agriaid-backend.onrender.com/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          symptomText: language === "urdu" ? `Reply in Urdu. ${symptom}` : symptom,
          imageUrl: cloudinaryUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || "Failed to analyze crop issue");
      console.log("✅ Backend response:", data);

      router.push(`/result/${data.resultId}`);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      console.error("❌ Error:", errorMessage);
      alert("Error: " + errorMessage);
      setAnalyzing(false);
      setCurrentStep(2);
    }
  };

  if (!authLoaded) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-green-700 text-lg font-medium">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min pt-36 min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-2xl">
        <h1 className="text-4xl font-bold mb-2 text-green-700 text-center">🌾 AgriAid</h1>
        <p className="text-gray-500 text-center mb-8">
          AI-powered crop disease detection and diagnosis
        </p>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-col items-center flex-1">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
              currentStep >= 1 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
            }`}>
              1
            </div>
            <span className="text-xs mt-2 text-gray-600">Upload Image</span>
          </div>
          <div className={`flex-1 h-1 ${currentStep >= 2 ? "bg-green-500" : "bg-gray-200"}`}></div>
          <div className="flex flex-col items-center flex-1">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
              currentStep >= 2 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
            }`}>
              2
            </div>
            <span className="text-xs mt-2 text-gray-600">Add Details</span>
          </div>
          <div className={`flex-1 h-1 ${currentStep >= 3 ? "bg-green-500" : "bg-gray-200"}`}></div>
          <div className="flex flex-col items-center flex-1">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
              currentStep >= 3 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
            }`}>
              3
            </div>
            <span className="text-xs mt-2 text-gray-600">Analysis</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload Section */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              Crop Image {imageUploaded && <span className="text-green-600">✓ Uploaded</span>}
            </label>
            
            {!imagePreview ? (
              <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition">
                <div className="text-center">
                  <div className="text-5xl mb-2">📸</div>
                  <p className="text-sm text-gray-600">Click to upload crop image</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                  disabled={analyzing}
                />
              </label>
            ) : (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-xl"
                />
                {uploadingImage && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex flex-col items-center justify-center">
                    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mb-2"></div>
                    <p className="text-white font-medium">Uploading to cloud...</p>
                  </div>
                )}
                {imageUploaded && !uploadingImage && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    ✓ Uploaded
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setImage(null);
                    setImagePreview(null);
                    setImageUploaded(false);
                    setCloudinaryUrl(null);
                    setCurrentStep(1);
                  }}
                  className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-red-600"
                  disabled={uploadingImage || analyzing}
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Symptoms Section */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              Symptoms (Optional)
            </label>
            <textarea
              placeholder="Describe what you're seeing: yellow leaves, spots, wilting, etc..."
              value={symptom}
              disabled={analyzing}
              onChange={(e) => setSymptom(e.target.value)}
              className="w-full border-2 border-gray-300 p-4 rounded-xl resize-none focus:border-green-500 focus:outline-none transition"
              rows={4}
            />
          </div>

          {/* Language Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              Response Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              disabled={analyzing}
              className="w-full border-2 border-gray-300 p-4 rounded-xl focus:border-green-500 focus:outline-none transition bg-white"
            >
              <option value="english">English</option>
              <option value="urdu">Urdu (اردو)</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={analyzing || !imageUploaded}
            className={`w-full py-4 rounded-xl text-white font-semibold transition-all ${
              analyzing || !imageUploaded
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 hover:shadow-lg"
            }`}
          >
            {analyzing ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Analyzing Your Crop...
              </span>
            ) : !imageUploaded ? (
              "Please Upload Image First"
            ) : (
              "Analyze Crop Disease"
            )}
          </button>
        </form>

        {/* Analysis Animation */}
        {analyzing && (
          <div className="mt-6 p-4 bg-green-50 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-sm font-medium text-green-700">Processing image...</p>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-200"></div>
              <p className="text-sm font-medium text-green-700">Detecting diseases...</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-400"></div>
              <p className="text-sm font-medium text-green-700">Generating recommendations...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}