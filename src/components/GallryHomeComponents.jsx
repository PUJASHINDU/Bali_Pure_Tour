import React from "react";

import img1 from '../assets/Gallaryimage/6N6A4972_1950.jpg';
import img2 from '../assets/Gallaryimage/pure tour_927.jpg';
import img3 from '../assets/Gallaryimage/6N6A5672_2940.jpg';
import img4 from '../assets/Gallaryimage/pure tour_687.jpg';
import img5 from '../assets/Gallaryimage/6N6A5389_800.jpg';
import img6 from '../assets/Gallaryimage/pure tour_400.png';
import img7 from '../assets/Gallaryimage/6N6A5573_2940.jpg';
import img8 from '../assets/Gallaryimage/pure tour_400.png';
import img9 from '../assets/Gallaryimage/6N6A5423_687.jpg';
import img10 from '../assets/Gallaryimage/home_687.jpg';
import img11 from '../assets/Gallaryimage/pure tour_927.png';
const GallryHomeComponents = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="grid gap-4">
          <div>
            <img
              className="h-auto max-w-full rounded-lg object-cover object-center"
              src={img1}
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg object-cover object-center"
              src={img2}
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg object-cover object-center"
              src={img3}
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <img
              className="h-auto max-w-full rounded-lg object-cover object-center"
              src={img4}
              alt="gallery-photo"
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg object-cover object-center"
              src={img5}
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg object-cover object-center"
              src={img6}
              alt="gallery-photo"
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <img
              className="h-auto max-w-full rounded-lg object-cover object-center"
              src={img7}
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg object-cover object-center"
              src={img8}
              alt="gallery-photo"
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg object-cover object-center"
              src={img9}
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <img
              className="h-auto max-w-full rounded-lg object-cover object-center"
              src={img10}
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg object-cover object-center"
              src={img11}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GallryHomeComponents;
