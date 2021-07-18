import React, { useState } from "react";
import video1 from "../assets/videos/video1.mp4";
import video2 from "../assets/videos/video2.mp4";
import video3 from "../assets/videos/video3.mp4";
import video4 from "../assets/videos/video4.mp4";
// import "react-responsive-carousel/lib/styles/carousel.css"; // requires a loader
// import { Carousel } from "react-responsive-carousel";

const Background = () => {
  const [selected, setSelected] = useState(video1);

  const handleChange = (index) => {
    switch (index) {
      case 0:
        setSelected(video1);
        break;
      case 1:
        setSelected(video2);
        break;
      case 2:
        setSelected(video3);
        break;
      case 3:
        setSelected(video4);
        break;
      default:
        setSelected(video1);
    }
  };

  return (
    <div className="background">
      <video
        key={selected}
        id="slider"
        autoPlay
        muted
        loop
        playsInline
        autoBuffer
        preload="auto"
      >
        <source src={selected} type="video/mp4" />
      </video>

      <ul className="navigation">
        <li>
          <img
            src={require("../assets/images/video1.png")}
            alt="video1"
            onClick={() => handleChange(0)}
          />
        </li>
        <li>
          <img
            src={require("../assets/images/video2.png")}
            alt="video2"
            onClick={() => handleChange(1)}
          />
        </li>
        <li>
          <img
            src={require("../assets/images/video3.png")}
            alt="video3"
            onClick={() => handleChange(2)}
          />
        </li>
        <li>
          <img
            src={require("../assets/images/video4.png")}
            alt="video4"
            onClick={() => handleChange(3)}
          />
        </li>
      </ul>
    </div>
  );

  // return (
  //   <Carousel
  //     showThumbs={false}
  //     infiniteLoop={true}
  //     autoPlay
  //     interval={5500}
  //     transitionTime={1500}
  //     showStatus={false}
  //     stopOnHover={false}
  //     showIndicators={false}
  //   >
  //     <div className="background">
  //       <video id="slider" autoPlay muted loop>
  //         <source src={video1} type="video/mp4" />
  //       </video>
  //     </div>
  //     <div className="background">
  //       <video id="slider" autoPlay muted loop>
  //         <source src={video2} type="video/mp4" />
  //       </video>
  //     </div>
  //     <div className="background">
  //       <video id="slider" autoPlay muted loop>
  //         <source src={video3} type="video/mp4" />
  //       </video>
  //     </div>
  //     <div className="background">
  //       <video id="slider" autoPlay muted loop>
  //         <source src={video4} type="video/mp4" />
  //       </video>
  //     </div>
  //   </Carousel>
  // );
};

export default Background;
