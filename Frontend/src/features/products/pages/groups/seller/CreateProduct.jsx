import React, { useState } from "react";
import { useNavigate } from "react-router";
import useProduct from "../../../hooks/useProduct.js";
import { Package, Plus, Trash2, ArrowLeft, Loader2, Upload, Image as ImageIcon } from "lucide-react";

const CreateProduct = () => {
  const navigate = useNavigate();
  const { handleCreateProduct } = useProduct();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    processor: "",
    display: "",
    graphics: "",
    operatingSystem: "",
    description: "",
  });

  // Store actual file objects instead of strings/URLs
  const [imageFiles, setImageFiles] = useState([null]);
  const [imagePreviews, setImagePreviews] = useState([""]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const updatedFiles = [...imageFiles];
    updatedFiles[index] = file;
    setImageFiles(updatedFiles);

    const updatedPreviews = [...imagePreviews];
    updatedPreviews[index] = URL.createObjectURL(file);
    setImagePreviews(updatedPreviews);
  };

  const addImageField = () => {
    setImageFiles((prev) => [...prev, null]);
    setImagePreviews((prev) => [...prev, ""]);
  };

  const removeImageField = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Build FormData to send files and text fields correctly to the backend
      const data = new FormData();
      data.append("name", formData.name);
      data.append("brand", formData.brand);
      data.append("processor", formData.processor);
      data.append("display", formData.display);
      data.append("graphics", formData.graphics);
      data.append("operatingSystem", formData.operatingSystem);
      data.append("description", formData.description);

      // Append each selected file using the field name your backend expects (usually "images" or "file")
      imageFiles.forEach((file) => {
        if (file) {
          data.append("images", file);
        }
      });

      const res = await handleCreateProduct(data);
      if (res?.success) {
        navigate("/");
      } else {
        setError(res?.message || "Failed to create product");
      }
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 pb-32">
      <div className="max-w-3xl mx-auto px-6 space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Back
          </button>
          <span className="text-[9px] font-black tracking-[0.2em] uppercase text-black/30 dark:text-white/30 border border-black/10 dark:border-white/10 px-3 py-1.5 rounded-full">
            Admin Inventory
          </span>
        </div>

        <div>
          <span className="text-[10px] font-black tracking-[0.2em] uppercase text-black/30 dark:text-white/30">New Entry</span>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mt-1">
            Create<br />Product
          </h1>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-500/20 text-red-500 p-4 rounded-2xl text-xs font-bold">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-3xl p-6 sm:p-8 space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black tracking-[0.15em] uppercase text-black/40 dark:text-white/40">Product Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Dell XPS 15"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:border-black dark:focus:border-white transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black tracking-[0.15em] uppercase text-black/40 dark:text-white/40">Brand</label>
                <input
                  type="text"
                  name="brand"
                  required
                  placeholder="e.g. Dell"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:border-black dark:focus:border-white transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black tracking-[0.15em] uppercase text-black/40 dark:text-white/40">Processor</label>
                <input
                  type="text"
                  name="processor"
                  placeholder="e.g. Intel Core Ultra 7"
                  value={formData.processor}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:border-black dark:focus:border-white transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black tracking-[0.15em] uppercase text-black/40 dark:text-white/40">Display</label>
                <input
                  type="text"
                  name="display"
                  placeholder="e.g. 15.6-inch OLED"
                  value={formData.display}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:border-black dark:focus:border-white transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black tracking-[0.15em] uppercase text-black/40 dark:text-white/40">Graphics</label>
                <input
                  type="text"
                  name="graphics"
                  placeholder="e.g. NVIDIA RTX 4050"
                  value={formData.graphics}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:border-black dark:focus:border-white transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black tracking-[0.15em] uppercase text-black/40 dark:text-white/40">Operating System</label>
                <input
                  type="text"
                  name="operatingSystem"
                  placeholder="e.g. Windows 11 Pro"
                  value={formData.operatingSystem}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:border-black dark:focus:border-white transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black tracking-[0.15em] uppercase text-black/40 dark:text-white/40">Description</label>
              <textarea
                name="description"
                rows="3"
                placeholder="Detailed specifications and overview..."
                value={formData.description}
                onChange={handleChange}
                className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-xl p-4 text-xs font-bold outline-none focus:border-black dark:focus:border-white transition-colors resize-none"
              />
            </div>

            {/* Images section */}
            <div className="space-y-3 pt-2 border-t border-black/5 dark:border-white/5">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black tracking-[0.15em] uppercase text-black/40 dark:text-white/40">Product Images</label>
                <button
                  type="button"
                  onClick={addImageField}
                  className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-black dark:text-white bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition"
                >
                  <Plus size={12} /> Add Image Field
                </button>
              </div>

              {imagePreviews.map((preview, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-3 items-center bg-white dark:bg-black/40 border border-black/5 dark:border-white/5 p-3 rounded-2xl">
                  
                  {/* Thumbnail Preview */}
                  <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center overflow-hidden shrink-0">
                    {preview ? (
                      <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon size={18} className="text-black/30 dark:text-white/30" />
                    )}
                  </div>

                  {/* File Upload Input */}
                  <div className="flex-1 w-full flex items-center gap-2">
                    <label className="cursor-pointer w-full flex items-center justify-between border border-black/10 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs font-bold hover:border-black dark:hover:border-white transition-colors">
                      <span className="truncate text-black/60 dark:text-white/60">
                        {imageFiles[index]?.name || "Choose image file..."}
                      </span>
                      <span className="bg-black dark:bg-white text-white dark:text-black text-[10px] font-black uppercase px-3 py-1.5 rounded-lg shrink-0">
                        Browse
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(index, e)}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {imagePreviews.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageField(index)}
                      className="p-2.5 text-black/30 dark:text-white/30 hover:text-red-500 transition rounded-xl hover:bg-red-50 dark:hover:bg-red-950/30 shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}

                </div>
              ))}
            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-wider text-sm py-4 rounded-2xl flex justify-center items-center gap-2 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition shadow-lg disabled:opacity-50"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Package size={16} />}
            {loading ? "Publishing..." : "Create Product"}
          </button>
        </form>

      </div>
    </div>
  );
};

export default CreateProduct;