import './App.css';
import background from './images/background.png';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const isoDateToString = (isoDate) => {
  const dateInfo = new Date(isoDate);
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return `${dayNames[dateInfo.getDay()]} ${dateInfo.getDate()} ${monthNames[dateInfo.getMonth()]} ${dateInfo.getFullYear()}`;
}

function App() {

  const [predictedIndex, setPredictedIndex] = useState({
    'date': '10 May 2022',
    'index': '1100.00'
  });
  const [historicalIndex, setHistoricalIndex] = useState([
    <tr key="123">
      <td>7 May 2022</td>
      <td>1100.00</td>
    </tr>,
    <tr key="456">
      <td>7 May 2022</td>
      <td>1100.00</td>
    </tr>
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const query = await axios.get(`${require('./config').API_ENDPOINT}/get-indexes`);
      const result = query.data.data;
      setPredictedIndex({
        'date': isoDateToString(result[0].date),
        'index': result[0].index
      });
      setHistoricalIndex(result.map((each, i) => (!i) 
        ? <></>
        : <tr key={each.date}>
            <td>{isoDateToString(each.date)}</td>
            <td>{each.index}</td>
          </tr>
      ));
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="prediction-background" style={{
        backgroundImage: `url(${background})`
      }}>
        <div className="container">
          <h4 style={{paddingTop: '20px'}}><abc style={{fontWeight: '900'}}>SET Index</abc> <abc style={{fontWeight: '400'}}>Prediction</abc></h4>
          <h1 style={{paddingTop: '100px'}} className="text-center"><abc style={{fontWeight: '800'}}>SET Index</abc> <abc style={{fontWeight: '300'}}>will be</abc></h1>
          <h1 className="text-center"><abc style={{fontWeight: '800'}}>{parseFloat(predictedIndex['index']).toFixed(2)}</abc></h1>
          <h6 className="text-center"><abc style={{fontWeight: '300'}}>Predicted Index for {predictedIndex['date']}</abc></h6>
        </div>
      </div>
      <h3 style={{marginTop: '60px'}} className="text-center"><abc style={{fontWeight: '800'}}>Past Index for Last 7 Days</abc></h3>
      <div style={{marginLeft: '-32px'}}>
      <table class="text-center table table-borderless" style={{
          width: '300px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Index</th>
            </tr>
          </thead>
          <tbody>
            {historicalIndex}
          </tbody>
        </table>
        </div>
        <div className="footer">
          <div className="container">
            <div class="row" style={{paddingTop: '30px'}}>
              <div class="col-md-4">
                <h6><abc style={{fontWeight: '900'}}>SET Index</abc> <abc style={{fontWeight: '400'}}>Prediction</abc></h6>
                <p style={{fontSize: '13px'}}>A SET index prediction website based on state frequency memory recurrent networks</p>
              </div>
              <div class="col-md-8">
                <p style={{fontSize: '10px'}}>SET Index Prediction is an execution-only service provider. The material provided on this website is for information purposes only and should not be understood as an investment advice. Any opinion that may be provided on this page does not constitute a recommendation by SET Index Prediction or its agents. We do not make any representations or warranty on the accuracy or completeness of the information that is provided on this page. If you rely on the information on this page then you do so entirely on your own risk.</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default App;
