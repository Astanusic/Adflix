import React, { Component } from "react";
import ReactPlayer from "react-player";

import "../css/VideoPlayer.css";

class VideoPlayer extends Component {
  handleEnded = () => {
    console.log("video ended");
  };
  render() {
    const videoUrl =
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
    const imageSrc = "./images/Fast_Large.jpg";
    return (
      <div className="videoPlayer">
        <ReactPlayer
          url={videoUrl}
          controls
          playing={false}
          width="100%"
          height="100%"
          style={{ position: "absolute", top: "0", left: "0" }}
          light={imageSrc}
          onEnded={this.props.handleEnded}
        />
      </div>
    );
  }
}

export { VideoPlayer };
