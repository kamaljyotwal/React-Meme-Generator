import React, { Component } from "react";

export default class MemeGenerator extends Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImage: "https://i.postimg.cc/4xLTHQDx/default-image.jpg",
      allmemedata: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.fetchImage = this.fetchImage.bind(this);
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        const { memes } = response.data;
        this.setState({ allmemedata: memes });
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  fetchImage(e) {
    e.preventDefault();
    const randomNum = Math.floor(Math.random() * this.state.allmemedata.length);
    const randomImageNum = this.state.allmemedata[randomNum].url;
    console.log(randomImageNum);
    this.setState({
      randomImage: randomImageNum,
    });
  }

  render() {
    return (
      <div className="mainDiv">
        <form action="" className="memeForm" onSubmit={this.fetchImage}>
          <input
            type="text"
            name="topText"
            value={this.state.topText}
            placeholder="top text here"
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="bottomText"
            value={this.state.statebottomText}
            placeholder="bottom text here"
            onChange={this.handleChange}
          />
          <button>New image</button>
        </form>
        <div className="imagecontainer">
          <img src={this.state.randomImage} alt="random Memes" className="randomImg" />
          <h2 className="toph2">{this.state.topText}</h2>
          <h2 className="bottomh2">{this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}
