import React from 'react';
import { useState, useEffect } from 'react';
// import Data from './../../../BTP/similarities_sorted - Copy.csv';
import Papa from 'papaparse';
import './SearchResult.css';
import { response } from 'express';


function SearchResult() {
  const [data,setData] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const [image, setImage] = useState({ preview: '', data: '' })


  useEffect(() => {
    let formData = new FormData()
    formData.append('file',image.data)
    const response = fetch('http://localhost:5000/image', {
      method: 'POST',
      body:formData,
    }).then(response => response.json()).then((body) => {
      setData(body);
    })
  },[]);

  useEffect(() => {
    const fetchData = async () => {
          const response = await fetch(data);
          const reader = response.body.getReader();
          const result = await reader.read();
          const decoder = new TextDecoder("utf-8");
          const csvData = decoder.decode(result.value);
          const parsedData = Papa.parse(csvData, { 
            header: true, 
            skipEmptyLines: true 
          }).data;
          setFinalData(parsedData);
        };
        fetchData();
  },[]);
  

  return (
    <div className="SearchResult">

      {/* <input type="file" accept=".csv" onChange={handleFileUpload} /> */}

      {finalData.length ? (
        <table className="table">
          <thead>
            <tr>
              <th>Filename</th>
              <th>Similarity</th>
              <th>FileURL</th>
              <th>PostURL</th>
            </tr>
          </thead>
          <tbody>
            {finalData.map((row, index) => (
              <tr key={index}>
                <td>{row.Filename}</td>
                <td>{row.Similarity}</td>
                <td>{row.FileURL}</td>
                <td>{row.PostURL}</td>

              </tr>
            ))}
          </tbody>
        </table>
      ) : null}

      <br /><br />
      ~ webstylepress ~

    </div>
  );
}

export default SearchResult;