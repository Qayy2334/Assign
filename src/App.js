import React, { useState, useEffect } from "react";
import "./style.css";

const App = () => {
  const [currentSection, setCurrentSection] = useState("home");
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = 3;
  const [foodItems, setFoodItems] = useState([]);
  const [newFoodTitle, setNewFoodTitle] = useState("");
  const [newFoodDescription, setNewFoodDescription] = useState(""); // 添加描述状态
  const [newFoodImage, setNewFoodImage] = useState(null);

  // ✅ Scenic Spots 部分的状态
  const [spotItems, setSpotItems] = useState([]);
  const [newSpotTitle, setNewSpotTitle] = useState("");
  const [newSpotDescription, setNewSpotDescription] = useState(""); // 添加描述状态
  const [newSpotImage, setNewSpotImage] = useState(null);

  useEffect(() => {
    showImage(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    fetch("http://localhost:5000/api/food")
      .then((res) => res.json())
      .then((data) => setFoodItems(data))
      .catch((err) => console.error("Error fetching food data:", err));
  }, []);

  // 获取 Scenic Spots 数据
  useEffect(() => {
    fetch("http://localhost:5000/api/spots")
      .then((res) => res.json())
      .then((data) => setSpotItems(data))
      .catch((err) => console.error("Error fetching spots data:", err));
  }, []);

  const handleFoodUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newFoodTitle);
    formData.append("image", newFoodImage);

    fetch("http://localhost:5000/api/food", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setFoodItems(data); // ✅ 更新最新数据
        } else {
          console.error("返回的 Food 数据格式错误:", data);
        }
        setNewFoodTitle("");
        setNewFoodDescription("");
        setNewFoodImage(null);
      })
      .catch((err) => console.error("上传 Food 出错:", err));
  };

  // 🚀 处理 Scenic Spots 上传
  const handleSpotUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newSpotTitle);
    formData.append("image", newSpotImage);

    fetch("http://localhost:5000/api/spots", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((newItem) => {
        // ✅ 避免重复更新：只追加新数据
        setSpotItems((prevItems) => [...prevItems, newItem]);
        setNewSpotTitle("");
        setNewSpotImage(null);
      })
      .catch((err) => console.error("上传出错:", err));
  };

  const showSection = (sectionId) => {
    setCurrentSection(sectionId);
  };

  const showImage = (index) => {
    const carouselContainer = document.querySelector(".carousel-container");
    if (carouselContainer) {
      carouselContainer.style.transform = `translateX(${-index * 100}%)`;
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  {
    foodItems.map((item, index) => (
      <div key={index} className="card">
        <img src={`http://localhost:5000${item.image}`} alt={item.title} />
        <div>{item.title}</div>
      </div>
    ));
  }

  return (
    <div className="con">
      <header>
        <div className="logo">
          <a href="#">
            <img src="LovePENANG-1.png" width="1010" alt="Love Penang Logo" />
          </a>
        </div>
        <nav>
          <ul>
            <li className="title1">Penang Island</li>
            <li>
              <a href="#" onClick={() => showSection("home")}>
                Home
              </a>
            </li>
            <li>
              <a href="#" onClick={() => showSection("food")}>
                Food
              </a>
            </li>
            <li>
              <a href="#" onClick={() => showSection("scenic-spots")}>
                Scenic Spots
              </a>
            </li>
            <li>
              <a href="#" onClick={() => showSection("hotels")}>
                Hotels
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        {currentSection === "home" && (
          <div id="home" className="content-section">
            <div className="box">
              {" "}
              {/* 新增的盒子容器 */}
              <div className="carousel">
                <div className="carousel-container">
                  <img src="curtis-crest-the-habitat.jpg" alt="Image 1" />
                  <img src="kapitan-keling-mosque.jpg" alt="Image 2" />
                  <img src="tropical-spice-garden.jpg" alt="Image 3" />
                </div>
                <div className="carousel-nav">
                  <button onClick={handlePrev}>&#10094;</button>
                  <button onClick={handleNext}>&#10095;</button>
                </div>
              </div>
              <h2>Penang Introduction</h2>
              <h3>Penang Island</h3>
              <p>
                Penang State, referred to as "Penang", is one of the thirteen
                federal states of Malaysia. It is located in the northwest of
                Malaysia, with an area of ​​1,049 square kilometers. The state
                is divided into two parts by the Penang Strait: Penang Island
                and Seberang Perai. The total population is 1,766,800. The state
                capital, George Town, is an important port city and the second
                largest city in Malaysia after the capital Kuala Lumpur.
              </p>
              <h3>Location</h3>
              <p>
                Penang (English: Penang: Malay: Pulau Pinang), formerly known as
                Penang Island, referred to as Penang is one of the thirteen
                federal states of Malaysia, located on the northwest side of the
                Malayan Peninsula. by Bounded by the Penang Strait, Penang is
                divided into two parts: Penang Island and Seberang Perai. Among
                them, the eastern and northern parts of Seberang Perai and Kedah
                is adjacent to the state of Perak in the south; while Penang
                Island is separated from the Indonesian island of Sumatra in the
                west. Strait of Malacca Opposite. Penang is 357 kilometers from
                the capital Kuala Lumpur.
              </p>
              <h3>History of Penang</h3>
              <p>
                Penang has a long history and multicultural heritage. Its
                history can be traced back to BC, when it was an island
                inhabited by indigenous peoples in the early days. The real
                turning point in history came in 1786, when Colonel Francis
                Light of the British East India Company successfully acquired
                Penang Island from the Sultan of Malacca and made it an
                important British colony in Southeast Asia. Penang has since
                become a strategic location and a British trade and shipping
                center, attracting a large number of immigrants from China,
                India and the Malay Archipelago, especially the Chinese, who
                occupy an important position in Penang's economic and social
                life. Entering the 19th century, Penang experienced a golden
                period of development, especially driven by the rubber, tin and
                spice trades, and its economy prospered. With the growth of the
                immigrant population, Penang gradually formed a diversified
                social structure, especially the Chinese groups from Fujian and
                Guangdong made great contributions to Penang's culture and
                economy. At the same time, George Town also built many
                commercial buildings and colonial-style residences during this
                period, becoming a city with a strong historical atmosphere.
                However, during World War II, Penang was occupied by Japan, and
                from 1941 to 1945, the island experienced great changes. After
                the war, Penang returned to British control and became part of
                the newly formed Malaysia in 1957 with the independence of
                Malaysia. In the mid-20th century, Penang transformed into an
                industrialized city and became a center for manufacturing and
                electronics, attracting a large amount of foreign investment.
                Today, Penang is not only an economic center of Malaysia, but
                also attracts tourists from all over the world with its rich
                history and culture. As a world cultural heritage site, George
                Town showcases Penang's multicultural blend and historical
                charm. The history of Penang is a process of cultural
                integration of various ethnic groups in China, Britain and
                Malaysia. It not only carries the traditional colonial history,
                but also provides a rich cultural background for modernization
                and globalization, becoming a unique tourism and economic
                center.
              </p>
            </div>
          </div>
        )}

        {currentSection === "food" && (
          <div id="food" className="content-section">
            <div className="container">
              {foodItems.map((item, index) => (
                <div key={index} className="card">
                  <img
                    src={`http://localhost:5000${item.image}`}
                    alt={item.title}
                  />
                  <div>{item.title}</div>
                </div>
              ))}
              <div className="row">
                <a href="hokkien-mee.html" className="card">
                  <img src="OIP (1).jpg" alt="Penang Hokkien Mee" />
                  <div className="label1">Hokkien Mee</div>
                </a>
                <a href="Penang Laksa.html" className="card">
                  <img src="OIP (2).jpg" alt="Penang Laksa" />
                  <div className="label2">Penang Laksa</div>
                </a>
              </div>
              <div className="row">
                <a href="Penang Satay.html" className="card">
                  <img src="OIP (3).jpg" alt="Penang Satay" />
                  <div className="label3">Penang Satay</div>
                </a>
                <a href="Penang Hainanese Chicken Rice.html" className="card">
                  <img src="OIP (4).jpg" alt="Penang Hainanese Chicken Rice" />
                  <div className="label4">Penang Hainanese Chicken Rice</div>
                </a>
              </div>
            </div>
            <form
              onSubmit={(e) => {
                handleFoodUpload(e);
                window.location.reload();
              }}
              className="upload-form"
            >
              <input
                type="text"
                placeholder="Food Title"
                value={newFoodTitle}
                onChange={(e) => setNewFoodTitle(e.target.value)}
                required
              />
              <input
                type="file"
                onChange={(e) => setNewFoodImage(e.target.files[0])}
                required
              />
              <button type="submit">Add Food</button>
            </form>
          </div>
        )}

        {currentSection === "scenic-spots" && (
          <div id="scenic-spots" className="content-section">
            <div className="container">
              {spotItems.map((item, index) => (
                <div key={index} className="spot">
                  <img
                    src={`http://localhost:5000${item.image}`}
                    alt={item.title}
                  />
                  <div className={`label${(index % 4) + 1}`}>{item.title}</div>
                </div>
              ))}
              <a
                href="https://www.youtube.com/watch?v=P6Q2hf46VFc"
                target="_blank"
                className="spot"
              >
                <img src="OIP (5).jpg" alt="Tokong Kek Lok Si" />
                <div className="label1">Tokong Kek Lok Si</div>
              </a>
              <a
                href="https://www.youtube.com/watch?v=7rzBlOnRWz0"
                target="_blank"
                className="spot"
              >
                <img src="OIP (6).jpg" alt="Penang Hill" />
                <div className="label2">Penang Hill</div>
              </a>
              <a
                href="https://www.youtube.com/watch?v=mPEA4mBPGqY"
                target="_blank"
                className="spot"
              >
                <img src="OIP (9).jpg" alt="Taman Negara Pulau Pinang" />
                <div className="label3">Taman Negara Pulau Pinang</div>
              </a>
              <a
                href="https://www.youtube.com/watch?v=cp0NsYB1gw0"
                target="_blank"
                className="spot"
              >
                <img src="OIP (10).jpg" alt="George Town" />
                <div className="label4">George Town</div>
              </a>
            </div>
            <form
              onSubmit={(e) => {
                handleSpotUpload(e);
                window.location.reload();
              }}
              className="upload-form"
            >
              <input
                type="text"
                placeholder="Spot Title"
                value={newSpotTitle}
                onChange={(e) => setNewSpotTitle(e.target.value)}
                required
              />
              <input
                type="file"
                onChange={(e) => setNewSpotImage(e.target.files[0])}
                required
              />
              <button type="submit">Add Spot</button>
            </form>
          </div>
        )}

        {currentSection === "hotels" && (
          <div className="hotel-card">
            <div className="hotel-image">
              <img src="g-hotel-kelawai.jpg" alt="G Hotel Kelawai" />
            </div>

            <div className="hotel-details">
              <div className="hotel-header">
                <h2>G Hotel Kelawai</h2>
              </div>

              <div className="rating">
                <span>★★★★☆</span>
                <span className="review-count">1,035 reviews</span>
              </div>

              <ul className="features">
                <li>🌆 Rooftop pool with city view, outdoor seating</li>
                <li>🍽️ On-site restaurant, mixed food reviews</li>
                <li>🏬 Near shopping, dining, hospital</li>
                <li>🚙 Buggy service available</li>
                <li>😊 Friendly staff, room allocation errors</li>
                <li>🛋️ Spacious rooms, exclusive lounge</li>
              </ul>

              <div className="actions">
                <a
                  href="https://www.tripadvisor.com.my/Hotel_Review-g298303-d7306602-Reviews-G_Hotel_Kelawai-George_Town_Penang_Island_Penang.html"
                  target="_blank"
                  rel="noopener noreferrer" // 安全性优化
                  className="show-prices"
                >
                  Visit hotel website
                </a>
              </div>
            </div>
            <div className="hotel-image">
              <img src="m-qube-hotel-hostel.jpg" alt="G Hotel Kelawai" />
            </div>

            <div className="hotel-details">
              <div className="hotel-header">
                <h2>M Qube Hotel</h2>
              </div>

              <div className="rating">
                <span>★★★★☆</span>
                <span className="review-count">892 reviews</span>
              </div>

              <ul className="features">
                <li>📍 Central location, close to landmarks</li>
                <li>🍳 Complimentary breakfast</li>
                <li>🛏️ Cozy rooms, budget-friendly</li>
                <li>🚗 Airport shuttle available</li>
              </ul>

              <div className="actions">
                <a
                  href="https://www.tripadvisor.com.my/Hotel_Review-g1440256-d10296137-Reviews-M_Qube_Hotel-Gelugor_Penang_Island_Penang.html"
                  target="_blank"
                  rel="noopener noreferrer" // 安全性优化
                  className="show-prices"
                >
                  Visit hotel website
                </a>
              </div>
            </div>
            <div className="hotel-image">
              <img src="caption.jpg" alt="Hotel ABC" />
            </div>

            <div className="hotel-details">
              <div className="hotel-header">
                <h2>PARKROYAL Penang Resort</h2>
              </div>

              <div className="rating">
                <span>★★★★☆</span>
                <span className="review-count">4804 reviews</span>
              </div>

              <ul className="features">
                <li>🌊 Stunning sea view from balcony</li>
                <li>🏊 Infinity pool with sunset view</li>
                <li>🍷 Rooftop bar with live music</li>
                <li>🧖‍♀️ Spa and wellness center</li>
              </ul>

              <div className="actions">
                <a
                  href="https://www.tripadvisor.com.my/Hotel_Review-g635527-d306935-Reviews-PARKROYAL_Penang_Resort-Batu_Ferringhi_Penang_Island_Penang.html"
                  target="_blank"
                  rel="noopener noreferrer" // 安全性优化
                  className="show-prices"
                >
                  Visit hotel website
                </a>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
