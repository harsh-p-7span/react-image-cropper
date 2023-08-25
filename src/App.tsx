import React, { useState, createRef, ChangeEvent } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

export const Demo: React.FC = () => {
  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("");
  const cropperRef = createRef<ReactCropperElement>();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;

    if (files) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const getCropData = () => {
    if (cropperRef.current) {
      const croppedFile = cropperRef.current.cropper
        .getCroppedCanvas()
        .toDataURL();

      setCropData(croppedFile);

      fetch(croppedFile)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "File name", { type: "image/png" });
          console.log(file);
        });
    }
  };

  return (
    <div>
      <div
        style={{
          width: "100%",
        }}
      >
        <input type="file" onChange={onChange} />

        <br />
        <br />

        <Cropper
          ref={cropperRef}
          style={{
            height: 400,
            width: "100%",
          }}
          src={image}
          viewMode={1}
          initialAspectRatio={1}
          minCropBoxHeight={100}
          minCropBoxWidth={100}
          responsive={true}
          autoCropArea={1}
          aspectRatio={1}
          guides={true}
          zoomOnWheel={false}
          zoomOnTouch={false}
          background={false}
        />
      </div>

      <div>
        <div
          className="box"
          style={{
            width: "50%",
            float: "right",
            height: "300px",
          }}
        >
          <h1>
            <span>Crop</span>

            <button
              style={{
                float: "right",
              }}
              onClick={getCropData}
            >
              Crop Image
            </button>
          </h1>

          {cropData ? (
            <img
              style={{
                width: "100%",
              }}
              src={cropData}
              alt="cropped"
            />
          ) : null}
        </div>
      </div>
      <br style={{ clear: "both" }} />
    </div>
  );
};

export default Demo;
