import React, { useState } from "react";
import "./PlagiarismSearch.css";
import "bootstrap/dist/css/bootstrap.min.css";
import image1 from "./BG-Image.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Row, Col, Container } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

const PlagiarismSearch = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [value, setValue] = useState("");
  const handleSelect = (e) => {
    console.log("index value");
    console.log(e);
    setValue(e);
  };
  const [image, setImage] = useState({ preview: "", data: "" });
  const [matchingImages, setMatchingImages] = useState([
    { Filename: "", similarity: "", FileURL: "", PostURL: "" },
  ]);
  const [status, setStatus] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", image.data);

    const response = fetch("http://localhost:5000/image", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((body) => {
        setStatus("OK");
        let responseImages = [];

        body.data.split("\r\n").map((imageWithSimilarity, index) => {
          let imageWithSimilaritySplit = imageWithSimilarity.split(",");
          const temp = {
            Filename: imageWithSimilaritySplit[0],
            similarity: imageWithSimilaritySplit[1],
            FileURL: imageWithSimilaritySplit[2],
            PostURL: imageWithSimilaritySplit[3],
          };
          responseImages.push(temp);
        });
        responseImages.pop();
        responseImages.shift();
        setMatchingImages(responseImages);
        console.log(responseImages);
      });
  };
  function displayContent() {
    var x = document.getElementById("App");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));

    event.target.value = "";
    if (selectedFilesArray.length !== 0) {
      const img = {
        preview: URL.createObjectURL(selectedFilesArray[0]),
        data: selectedFilesArray[0],
      };
      setImage(img);
    }
  };

  function deleteHandler(image) {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }

  return (
    <section>
      {/* <div
        style={{
          backgroundImage: `url(${image1})`,
          backgroundSize: "contain",
          height: 712,
        }}
      > */}
      <div id="background" style={{ backgroundColor: "#6C63FE", height: 712 }}>
        <div id="whitebox" style={{backgroundColor:"white", 
        height:450,
        width:1000,
        marginLeft:123,position:"absolute",
        top:200,borderRadius:10,
        boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"
        }}>
          <label>
            <img src={require("./upload.png")} style={{height:100}} />
            <p class="box-text">Upload Image</p>
            <br />
            <input
              type="file"
              name="images"
              onChange={onSelectFile}
              multiple
              accept="image/png , image/jpeg, image/webp, image/jpeg"
            />
          </label>
          <p 
          style={{fontSize: 15, position: "absolute", top: 320, left: 90}}>
            Please upload only png, jpg, jpeg and webp images</p>
          <br />

          <input type="file" multiple />

          {selectedImages.length > 0 &&
            (selectedImages.length > 1 ? (
              <p className="error">
                You can't upload more than 1 images! <br />
                <span>
                  please delete <b> {selectedImages.length - 1} </b> of them{" "}
                </span>
              </p>
            ) : (
              <button
                className="upload-btn"
                onClick={(e) => {
                  console.log(selectedImages);
                  handleSubmit(e);
                  displayContent();
                }}
              >
                Search
                <img class="search-icon" src={require("./search.png")} />
                {selectedImages.length === 1 ? "" : "S"}
              </button>
            ))}

          <div className="images">
            {selectedImages &&
              selectedImages.map((image, index) => {
                return (
                  <div key={image} className="image">
                    <img
                      class="ImageDisplay"
                      src={image}
                      height="200"
                      alt="upload"
                    />
                    <button
                      class="delete-btn"
                      onClick={() => deleteHandler(image)}
                    >
                      <img class="trash" src={require("./trash.png")} />
                    </button>
                    <DropdownButton
                      className="dropdown"
                      title="Number of Results"
                      id="dropdown-menu-align-right"
                      onSelect={handleSelect}
                      color="#83505F"
                    >
                      <Dropdown.Item eventKey="1">1</Dropdown.Item>
                      <Dropdown.Item eventKey="2">2</Dropdown.Item>
                      <Dropdown.Item eventKey="3">3</Dropdown.Item>
                      <Dropdown.Item eventKey="4">4</Dropdown.Item>
                      <Dropdown.Item eventKey="5">5</Dropdown.Item>
                      <Dropdown.Item eventKey="6">6</Dropdown.Item>
                      <Dropdown.Item eventKey="7">7</Dropdown.Item>
                      <Dropdown.Item eventKey="8">8</Dropdown.Item>
                      <Dropdown.Item eventKey="9">9</Dropdown.Item>
                      <Dropdown.Item eventKey="10">10</Dropdown.Item>
                    </DropdownButton>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <div className="App" id="App" style={{ display:"none" }}>
        <Container>
          <Row>
            {matchingImages &&
              matchingImages.map((image, k) => {
                console.log(value);
                if (k < value) {
                  // Limiting value of k to 5
                  return (
                    <Col key={k} xs={12} md={4} lg={3}>
                      <Card id="card">
                        {/* <Card.Img src={require("./New_Resized/building/image0.jpg")} /> */}
                        <Card.Img
                          src={
                            "http://localhost:5000/BTP/New_Resized/" +
                            image.FileURL
                          }
                        />
                        <Card.Body>
                          {/* <Card.Title>{data.Filename}</Card.Title> */}
                          <Card.Text>
                            <p>
                              <b>Similarity Index</b>
                            </p>
                            {image.similarity}
                          </Card.Text>
                          <Card.Text>
                            <a href={image.PostURL}>PostURL</a>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                }
                return null;
              })}
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default PlagiarismSearch;
