import { useEffect, useState, useRef, useMemo } from "react";
import img1 from "./asset/image/Pizza.jpg"
import img2 from "./asset/image/Pasta.jpg"
import img3 from "./asset/image/Burger.jpg"
import Item from "./components/items";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const itemsInPage = 8;
  const containerRef = useRef(null);


  const img_Urls = useMemo(
    () => [
      img1,img2,img3
    ],
    []
  );

  useEffect(() => {
    (async () => {
      try {
        const fetchData = await fetch("index.json");
        const json = await fetchData.json();
        setData(json);
      } catch (error) {
        console.error("Data fetching error:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      for (const img_Url of img_Urls) {
        const image = new Image();
        image.onload = () => {
          setLoading(false);
        };
        image.src = img_Url;
        await new Promise((resolve) => (image.onload = resolve));
      }
    })();
  }, [img_Urls]);

  const Scroll = () => {
    const container = containerRef.current;
    if (
      container.scrollTop + container.clientHeight >= container.scrollHeight &&
      !loading
    ) {
      MoreItems();
    }
  };

  const MoreItems = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const start = (currentPage - 1) * itemsInPage;
  const end = start + itemsInPage;
  const availableItems = data.slice(0, end);

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="items-wrapper" ref={containerRef} onScroll={Scroll}>
        {availableItems.map((item, index) => (
          <Item key={index} {...item} img_urls={img_Urls} />
        ))}
        {loading && <p>Loading..!</p>}
      </div>
    </div>
  );
};

export default App;

