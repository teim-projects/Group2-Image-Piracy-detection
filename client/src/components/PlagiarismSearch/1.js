// import React, { useState , useEffect } from "react";
// import "./PlagiarismSearch.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
// // import SearchResult from "../SearchResults/SearchResult";
// import { Image } from "react-bootstrap";
// import image1 from "./BG-Image.png";
// import Papa from 'papaparse';

// const PlagiarismSearch = () => {

//   const [selectedImages, setSelectedImages] = useState([]);
//   const [image, setImage] = useState({ preview: '', data: '' })
//   const [data, setData] = useState([]);
//   const [status, setStatus] = useState('')

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     let formData = new FormData()
//     formData.append('file', image.data)
// 	  console.log("Ererererere");
//     const response = fetch('http://localhost:5000/image', {
//       method: 'POST',
//       body: formData,
//     }).then(response => response.json())
// 	.then((body) => {
// 		setStatus("OK")
//     setData(body);
// 		// console.log(data);
// 	}); 
// } 

// useEffect(() => {
//   const fetchData = async () => {
//         const response = await fetch(data);
//         const reader = response.body.getReader();
//         const result = await reader.read();
//         const decoder = new TextDecoder("utf-8");
//         const csvData = decoder.decode(result.value);
//         const parsedData = Papa.parse(csvData, { 
//           header: true, 
//           skipEmptyLines: true 
//         }).data;
//         setData(parsedData);
//         console.log(data);
//       };
//       fetchData();
// },[]);

// // function displayImages() {
// //   var x = document.getElementById("Table");
// //   if (x.style.display === "none") {
// //     x.style.display = "block";
// //   } else {
// //     x.style.display = "none";
// //   }
// // }
//   const onSelectFile = (event) => {
//     const selectedFiles = event.target.files;
//     const selectedFilesArray = Array.from(selectedFiles);

//     const imagesArray = selectedFilesArray.map((file) => {
//       return URL.createObjectURL(file);
//     });

//     setSelectedImages((previousImages) => previousImages.concat(imagesArray));

//     event.target.value = "";
// 	if(selectedFilesArray.length !== 0){
// 		const img = {
// 			preview: URL.createObjectURL(selectedFilesArray[0]),
// 			data: selectedFilesArray[0],
// 		  }
// 		  setImage(img)
// 	  }
	
//   };

//   function deleteHandler(image) {
//     setSelectedImages(selectedImages.filter((e) => e !== image));
//     URL.revokeObjectURL(image);
//   }

//   return (
//     <section>
//       <div style={{ backgroundImage:`url(${image1})`,backgroundSize:"contain", height:712 }}>
//       <label>
//          <p class="box-text">Add Image</p>
//         <br />
//         <input
//           type="file"
//           name="images"
//           onChange={onSelectFile}
//           multiple
//           accept="image/png , image/jpeg, image/webp"
//         />
//       </label>
//       <br />


//       <input type="file" multiple />

//       {selectedImages.length > 0 &&
//         (selectedImages.length > 1 ? (
//           <p className="error">
//             You can't upload more than 1 images! <br />
//             <span>
//               please delete <b> {selectedImages.length - 1} </b> of them{" "}
//             </span>
//           </p>
//         ) : (
//           <button
//             className="upload-btn"
//             onClick={(e) => {
//               console.log(selectedImages);
// 			        handleSubmit(e);
//               // displayImages();
//             }}
//           >
//             Search
//             <img class="search-icon" src={require("./search.png")}/>
//             {selectedImages.length === 1 ? "" : "S"}
//           </button>
//         ))}

//       <div className="images">
//         {selectedImages &&
//           selectedImages.map((image, index) => {
//             return (
//               <div  key={image} className="image">
//                 <img class="ImageDisplay" src={image} height="200" alt="upload" />
//                 <button class = "delete-btn" onClick={() => deleteHandler(image)}>
//                   <img class="trash" src={require("./trash.png")}/>
//                 </button>
//               </div>
//             );
//           })} 
//       </div>

//       {/* <div className="SearchResult">
//       {data.length ? (
//         <table className="table" id="Table">
//           <thead>
//             <tr>
//               <th>Filename</th>
//               <th>Similarity</th>
//               <th>FileURL</th>
//               <th>PostURL</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((row, index) => (
//               <tr key={index}>
//                 <td>{row.Filename}</td>
//                 <td>{row.Similarity}</td>
//                 <td>{row.FileURL}</td>
//                 <td>{row.PostURL}</td>

//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : null}
//     </div> */}

//       </div>

//     </section>
//   );
// };

// export default PlagiarismSearch;


import React, { useState } from "react";
import "./PlagiarismSearch.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Image } from "react-bootstrap";
import image1 from "./BG-Image.png";

const PlagiarismSearch = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [image, setImage] = useState({ preview: "", data: "" });
  const [matchingImages, setMatchingImages] = useState([{ image: "", similarity: "" }]);
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
		let responseImages = []

        body.data.split('\r\n').map((imageWithSimilarity,index) => {
			let imageWithSimilaritySplit = imageWithSimilarity.split(',');
			const temp = {
				FileName: imageWithSimilaritySplit[0],
       	similarity: imageWithSimilaritySplit[1],
        FileURL: imageWithSimilaritySplit[2],
        PostURL: imageWithSimilaritySplit[3]
			}
			responseImages.push(temp);
		});
		responseImages.pop();
		responseImages.shift();
		setMatchingImages(responseImages);
		console.log(responseImages)
      });
  };

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
      <div
        style={{
          backgroundImage: `url(${image1})`,
          backgroundSize: "contain",
          height: 712,
        }}
      >
        <label>
          <p class="box-text">Add Image</p>
          <br />
          <input
            type="file"
            name="images"
            onChange={onSelectFile}
            multiple
            accept="image/png , image/jpeg, image/webp"
          />
        </label>
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
                </div>
              );
            })}
        </div>

		<div className="images">
		{matchingImages &&
            matchingImages.map((image, index) => {
				console.log(image.FileName)
				console.log(image.similarity)
        console.log(image.PostURL)
        console.log(image.FileURL)
              return (
                <div key={image.similarity} className="image">
                  <img
                    class="ImageDisplay"
                    // src={"http://localhost:5000/BTP/Final_ResizedServe/"+image.image.split(/[0-9]/)[0]+"/"+image.image}
                    src={require("./New_Resized/" + image.FileURL)}
                    height="200"
                    alt="upload"
                  />
				  <p>{image.similarity}</p>
                </div>
              );
            })}	
        </div>
      </div>
    </section>
  );
};

export default PlagiarismSearch;
