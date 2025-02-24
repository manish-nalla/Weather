import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {

  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [unit, setUnit] = useState('F');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=50762e91e8133165b84cd2063f4d122a`;

  const searchLocation = (e) => {
    if (e.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      setLocation('');
    }
  }

  const convertUnit = (kelvin) => {
    if (unit === 'F') {
      return `${((kelvin - 273.15) * 9 / 5 + 32).toFixed(1)}`;
    } else {
      return `${(kelvin - 273.15).toFixed(1)}`;
    }
  }




  return (
    <div className='bg-[url("./assets/images/background.jpg")] bg-no-repeat bg-cover bg-center min-h-screen flex items-center justify-center overflow-hidden font-funnel-sans'>
      <div className='overflow-auto max-h-screen w-full'>
        <div className='mx-auto bg-[linear-gradient(to_bottom,rgba(211,211,211,0.2),rgba(211,211,211,0.2))] border-0 rounded-2xl shadow-2xl p-4 max-w-6/10 w-full'>
          <div className='flex flex-col items-center'>
            <h1 className='text-6xl font-bold p-2 m-4'>Weather App</h1>
            <div>
              <input
                type="text"
                placeholder='Enter city'
                className='border-1 m-2 rounded-xl p-3 w-80 text-lg outline-none '
                value={location}
                onChange={e => setLocation(e.target.value)}
                onKeyPress={searchLocation}
              />
              {/* <button>Search</button> */}
            </div>
            <div className='flex flex-col items-center p-2 m-2'>
              <div className='flex flex-col items-center p-2 m-2'>
                <h1 className='font-bold text-3xl p-1'>{data.name} {data.sys ? data.sys.country : ' '}</h1>
                {data.main ? <p className='p-2 m-2 text-xl font-bold'><span>{convertUnit(data.main.temp)}<sup>°{unit === 'F' ? 'F' : 'C'}</sup></span><button onClick={() => setUnit(unit === 'F' ? 'C' : 'F')} className='cursor-pointer'>/{unit === 'F' ? 'C' : 'F'}</button></p> : ''}
                {data.weather ? <p className='text-xl font-bold  pb-1'>{data.weather[0].main}</p> : ''}
              </div>
              {data.name != undefined &&
                <div className='flex flex-row justify-around w-100 border-0 p-4 rounded-xl shadow-2xl text-xl font-medium'>
                  <div className='flex flex-col items-center'>
                    <h3>Humidity</h3>
                    {data.main ? <p>{data.main.humidity}</p> : ''}
                  </div>
                  <div className='flex flex-col items-center'>
                    <h3>Feels like</h3>
                    {data.main ? <p>{convertUnit(data.main.feels_like)}<button onClick={() => setUnit(unit === 'F' ? 'C' : 'F')}>/{unit === 'F' ? 'C' : 'F'}</button></p> : ''}
                  </div>
                  <div className='flex flex-col items-center'>
                    <h3>Wind</h3>
                    {data.wind ? <p>{data.wind.speed} mph</p> : ''}
                  </div>
                </div>

              }

            </div>
          </div>
        </div>
        <div className='flex justify-center p-4 text-white font-bold'>
          <p>Done by <a href="https://github.com/manish-nalla" target='_blank' rel="noopener noreferrer" className='text-black'>@Manish Nalla</a></p>
        </div>
      </div>
    </div>
  )
}

export default App