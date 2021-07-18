import React, { useLayoutEffect, useState } from "react";
import video1 from "../assets/videos/video1.mp4";
import video2 from "../assets/videos/video2.mp4";
import video3 from "../assets/videos/video3.mp4";
import video4 from "../assets/videos/video4.mp4";
import thumb1 from "../assets/images/video1.png";
import thumb2 from "../assets/images/video2.png";
import thumb3 from "../assets/images/video3.png";
import thumb4 from "../assets/images/video4.png";
import LeftNav from "./LeftNav";

const Home = () => {
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

  useLayoutEffect(() => {
    const interval = setInterval(() => {
      console.log("This will run every 8 second!");
      if (selected === video1) {
        setSelected(video2);
      } else if (selected === video2) {
        setSelected(video3);
      } else if (selected === video3) {
        setSelected(video4);
      } else if (selected === video4) {
        setSelected(video1);
      }
    }, 12000);
    return () => clearInterval(interval);
  }, [selected]);

  return (
    <div>
      <div className="background">
        <video key={selected} id="slider" autoPlay muted loop>
          <source src={selected} type="video/mp4" />
        </video>

        <ul className="navigation">
          <li>
            <img src={thumb1} alt="video1" onClick={() => handleChange(0)} />
          </li>
          <li>
            <img src={thumb2} alt="video2" onClick={() => handleChange(1)} />
          </li>
          <li>
            <img src={thumb3} alt="video3" onClick={() => handleChange(2)} />
          </li>
          <li>
            <img src={thumb4} alt="video4" onClick={() => handleChange(3)} />
          </li>
        </ul>
      </div>
      <LeftNav />
    </div>
  );
};

export default Home;
