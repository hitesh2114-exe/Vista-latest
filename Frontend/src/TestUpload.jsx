import { useState } from "react";
import axios from "axios";

function TestUpload() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadImage = async () => {
    if (!image) {
      alert("Please select an image first.");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();

      data.append("file", image);
      data.append("upload_preset", "vista_upload");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dszapvyjv/image/upload",
        data
      );

      setImageUrl(response.data.secure_url);
      setPublicId(response.data.public_id);

      alert("Image uploaded successfully!");
    } catch (err) {
      console.error(err);

      if (err.response) {
        alert(err.response.data.error.message);
      } else {
        alert("Image upload failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "500px",
      }}
    >
      <h2>Cloudinary Upload Test</h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button onClick={uploadImage} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      {imageUrl && (
        <>
          <h3>Upload Successful 🎉</h3>

          <img
            src={imageUrl}
            alt="Uploaded"
            style={{
              width: "100%",
              borderRadius: "10px",
            }}
          />

          <div>
            <strong>Image URL:</strong>

            <p
              style={{
                wordBreak: "break-word",
              }}
            >
              {imageUrl}
            </p>
          </div>

          <div>
            <strong>Public ID:</strong>

            <p>{publicId}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default TestUpload;