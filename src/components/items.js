import { useState, useEffect } from "react";

const Items = ({ id, prdctName, quantity, price, img_urls }) => {
  const [activeImgIndx, setActiveImgIndx] = useState(0);

  useEffect(() => {
    const changeImg = () => {
      setActiveImgIndx((prevI) => (prevI + 1) % img_urls.length);
    };

    const interval = setInterval(changeImg, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [img_urls]);


  return (
    <div className="item">
      <div className="prdct-img-wrapper">
        {img_urls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={prdctName}
            style={{ opacity: index === activeImgIndx ? 1 : 0 }}
          />
        ))}
        <div className="image-navigation">
        </div>
        
      </div>
      <div className="prdct-content">
        <div className="prdct-name">
          <span className="prdct-id">{id}. </span>
          {prdctName}
        </div>
        <div className="prdct-qty">{quantity} Remaining</div>
        <div className="prdct-price">Rs.{price} /=</div>
      </div>
    </div>
  );
};

export default Items;
