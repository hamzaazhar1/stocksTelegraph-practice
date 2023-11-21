import { useEffect, useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Pagination from './components/pagination';
import './App.css'


function App() {
  const[pageCount,setPageCount]=useState(0);
  const[page,setPage]=useState(1);
  const[count,setCount]=useState(0);
  const[data,setData]=useState();
  const[isSortingAscMarket,setIsSortingAscMarket]=useState(true);
  const[volume,setVolume]=useState(false);
  const[changePercentage24h,setChangePercentage24h]=useState(false);
  const[price,setPrice]=useState(false);
  const[symbol,setSymbol]=useState(false);
  const[active,setActive]=useState("marketCap");
  const[formula,setFormula]=useState(1+((page-1)*100));
  
  
  
  function formatNumber(value) {
    const suffixes = ["", "K", "M", "B", "T"];
  
    let suffixIndex = 0;
    while (value >= 1000 && suffixIndex < suffixes.length - 1) {
      value /= 1000;
      suffixIndex++;
    }
    return value.toFixed(2) + suffixes[suffixIndex];
  }
 
  function sortMarketCap(){
    let temp = data;
    if(isSortingAscMarket)
      setData(temp.sort((element1,element2)=>element1.market_cap-element2.market_cap));
    else
      setData(temp.sort((element1,element2)=>element2.market_cap-element1.market_cap));
  }  

  function sortVolume(){
    let temp=data;
    if(volume)
      setData(temp.sort((element1,element2)=>element1.volume-element2.volume));
    else
      setData(temp.sort((element1,element2)=>element2.volume-element1.volume));
  }

  function sortChangePercentage24h(){
    let temp = data;
    if(changePercentage24h)
      setData(temp.sort((element1,element2)=>element1.change_percentage_24h-element2.change_percentage_24h));
    else
      setData(temp.sort((element1,element2)=>element2.change_percentage_24h-element1.change_percentage_24h));
  }

  function sortPrice(){
    let temp = data;
    if(price)
      setData(temp.sort((element1,element2)=>element1.previousClose-element2.previousClose));
    else
      setData(temp.sort((element1,element2)=>element2.previousClose-element1.previousClose));
  }

  function sortSymbol(){
    let temp = data;
    if(symbol)
      setData(temp.sort((element1,element2)=>element1.symbol.localeCompare(element2.symbol)));
    else
      setData(temp.sort((element1,element2)=>element2.symbol.localeCompare(element1.symbol)));
    
  }

  async function getJson(){
    const response = await fetch(`https://crypto.xbpnews.com/api/screener?format=json&page=${page}&sort-by=-market_cap&per-page=100`);
    const data = await response.json();
    return data;
  }

 async function getData(){
    
    let temp = await getJson();
    setCount(await temp.count);
    if(!(Array.isArray(temp))){
      let arr=[];
      arr.push(temp);
      temp=arr;
    }
    setData(temp[0].results);
    setFormula(1+((page-1)*100))
 }
 useEffect(()=>{
  getData();
  setActive("marketCap")
  setPageCount(Math.ceil(count/100));
  // setFormula(1+((page-1)*100))
  // console.log(data);
  // console.log(count);
  // console.log(pageCount);
 },[page,count]);

 
  return (
    <>
    <div className='tableContainer'>
      <table className='table'>
        <thead className='tableHead'>
          <tr>
          
          <th>Sr.</th>
          
          <th className='clickable' onClick={()=>{
            symbol?setSymbol(false):setSymbol(true);
            setActive("symbol");
            sortSymbol();
          }}>
              <div className="clickableHeader">
                <span>
                  Symbol 
                </span>
                {(active==='symbol')?(symbol)?
                <KeyboardArrowDownIcon className='arrow'></KeyboardArrowDownIcon>
                :
                <KeyboardArrowUpIcon className='arrow'></KeyboardArrowUpIcon>
                :
                ""}
              </div>
            </th>
          
          <th>Coin</th>
          
          <th className='clickable' onClick={()=>{
            price?setPrice(false):setPrice(true);
            setActive("price");
            sortPrice();
          }}>
            <div className="clickableHeader">
              <span>
                Price 
              </span>
              {(active==='price')?(price)?
              <KeyboardArrowDownIcon className='arrow'></KeyboardArrowDownIcon>
              :
              <KeyboardArrowUpIcon className='arrow'></KeyboardArrowUpIcon>
              :
              ""}
              </div> 
            </th>
          
          <th>Day High</th>
          
          <th>Day Low</th>
          
          <th className='clickable' onClick={()=>{
            changePercentage24h?setChangePercentage24h(false):setChangePercentage24h(true);
            setActive("changePercentage24h");
            sortChangePercentage24h();
          }}>
            <div className="clickableHeader">
              <span>
                24hr% 
              </span>
              {(active==='changePercentage24h')?(changePercentage24h)?
              <KeyboardArrowDownIcon className='arrow'></KeyboardArrowDownIcon>
              :
              <KeyboardArrowUpIcon className='arrow'></KeyboardArrowUpIcon>
              :
              ""}
            </div>
          </th>
         
          <th>Year High</th>
         
          <th>Year Low</th>
         
          <th className='clickable' onClick={()=>{
            volume?setVolume(false):setVolume(true);
            setActive("volume");
            sortVolume();
            //console.log(volume);
          }}>
            <div className='clickableHeader'>
              <span>
              Volume 
              </span>
              {(active==='volume')?(volume)?
              <KeyboardArrowDownIcon className='arrow'></KeyboardArrowDownIcon>
              :<KeyboardArrowUpIcon className='arrow'></KeyboardArrowUpIcon>
              :""}
            </div>
            
            </th>
          
          <th className='clickable' onClick={()=>{
            setIsSortingAscMarket(prev=>!prev)
            setActive("marketCap");
            sortMarketCap();
            //console.log(marketCap);
          }}>
            <div className="clickableHeader">
              <span>
                Market Cap 
              </span>
              {(active==='marketCap')?
              (isSortingAscMarket)?<KeyboardArrowDownIcon className='arrow'></KeyboardArrowDownIcon>
              :
              <KeyboardArrowUpIcon className='arrow'></KeyboardArrowUpIcon>
              :
              ""}
            </div>
           </th>
          
          
          </tr>
        </thead>
        <tbody className='tableBody'>
          {data &&
            data.map((element,i)=>{
              return(
                <tr key={i} className='tablerow'>
                  <td>{i+formula}</td>
                  <td className='green'>{element.symbol}</td>
                  <td>{element.name}</td>
                  <td className='green'>${(element.previousClose.toString().includes('e'))?element.previousClose.toFixed(8):element.previousClose}</td>
                  <td className='green'>${(element.day_high.toString().includes('e'))?element.day_high.toFixed(8):element.day_high}</td>
                  <td className='green'>${(element.day_low.toString().includes('e'))?element.day_low.toFixed(8):element.day_low}</td>
                  <td className={(element.change_percentage_24h<0?"red":(element.change_percentage_24h>0)?"green":"grey")}>{(element.change_percentage_24h)?element.change_percentage_24h.toFixed(4)+"%":"N/A"}</td>
                  <td className='green'>{element.year_high!=null?"$"+element.year_high.toFixed(8):""}</td>
                  <td className='green'>{element.year_low!=null?"$"+element.year_low.toFixed(8):""}</td>
                  <td>{formatNumber(element.volume)}</td>
                  <td className='grey'>{formatNumber(element.market_cap)}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
    
    <div className='pagination'>
        <Pagination page={page} setPage={setPage} pageCount={pageCount}/>
    </div>

    </>
  )
}

export default App
