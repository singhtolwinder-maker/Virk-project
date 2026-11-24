
import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function PhotoUpload() {
  const [photos, setPhotos] = useState([]);

  const handlePhotos = (e) => {
    setPhotos(Array.from(e.target.files));
  };

  const uploadPhotos = async () => {
    if (photos.length === 0) {
      alert("Please select a photo!");
      return;
    }

    const formData = new FormData();
    formData.append("file", photos[0]);

    try {
      const response = await axios.post(
        "http://localhost:3000/upload",
        formData
      );

      alert(response.data.message);
      console.log(response.data);

    } catch (error) {
      console.log(error);
      alert("Upload failed!");
    }
  };

  return (
    <div className="photo-upload">
      <h2>Upload Your Photos</h2>

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handlePhotos}
      />

      <div className="photo-preview">
        {photos.map((photo, index) => (
          <div key={index}>
            <img
              src={URL.createObjectURL(photo)}
              alt="Preview"
              width="150"
            />
          </div>
        ))}
      </div>

      <button onClick={uploadPhotos}>
        Upload Photos
      </button>
    </div>
  );
}

export default PhotoUpload;
