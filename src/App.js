import logo from './logo.svg';
import './App.css';

import { useEffect, useRef, useState } from "react";

export default function App() {
  const [product, setProduct] = useState([]);
  const [skipId, setSkipId] = useState(0);
  const ref = useRef(null);
  const [scrollHeight, setScrollHeight] = useState(0);
  const apiUrl = "https://dummyjson.com/products?limit=10&skip=1";
  useEffect(() => {
    handleApiCall(skipId);
    console.log("window.", window.scrollHeight);

    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = (e) => {
    const scrollY = window.innerHeight+window.scrollY;
    console.log("window.scrollY",scrollY,ref.current.scrollHeight)
    if( scrollY >= ref.current.scrollHeight){
      handleApiCall(skipId+1);
      setSkipId(skipId+1)  
    }
  };

  const handleApiCall = (skipId) => {
    const apiUrl = `https://dummyjson.com/products?limit=10&skip=${skipId}`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        if(product.length === 0) {
          setProduct(data)
        }else {
          const newData = {...product};
          newData.products = [...newData.products,...data.products]
          setProduct(newData);
        }
      })
      .catch((err) => {
        console.log("some err", err);
      });
  };

  console.log("produce", ref.current?.clientHeight);
  return (
    <div className="App" ref ={ref} style={{height:'100%'}}>
      {product &&
        product.products &&
        product.products.map((value) => {
          return (
            <div id="something" style={{ height: "200px" }}>
              {value.title}
            </div>
          );
        })}
    </div>
  );
}


