import React from "react";

const GallaryPackgeTour = ({ images }) => {
  const [active, setActive] = React.useState(images[0]?.imgelink || "");

  return (
    <div className="mx-auto max-w-7xl p-4">
      {/* Gambar Aktif */}
      <div>
        <img
          className="h-auto w-full rounded-lg object-cover object-center md:h-[480px]"
          src={active}
          alt="active-gallery"
        />
      </div>

      {/* Thumbnail */}
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {images.map(({ imgelink }, index) => (
          <div key={index}>
            <img
              onClick={() => setActive(imgelink)}
              src={imgelink}
              className="h-48 w-60 cursor-pointer rounded-lg object-cover object-center"
              alt={`gallery-thumbnail-${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GallaryPackgeTour;
