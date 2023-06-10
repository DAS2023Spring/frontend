import NavBar from "../components/navBar";
import { Row, Col } from "antd";

const movie = {
  id: 6,
  name: "Changeling",
  year: 2008,
  score: 7.8,
  poster:
    "https://a.ltrbxd.com/resized/film-poster/4/9/6/5/5/49655-changeling-0-460-0-690-crop.jpg?v=8dde8c2298%202x",
  headerImage:
    "https://a.ltrbxd.com/resized/sm/upload/dm/rp/ux/6b/changeling-1200-1200-675-675-crop-000000.jpg?v=66f8fad09a",
  story:
    "سال ۱۹۲۸، در لس‌آنجلس، کریستین کالینز (آنجلینا جولی)، مادر مجرد مجبور می‌شود برای رفتن به سر کار، پسر ۹ ساله‌اش والتر را در خانه تنها بگذارد. اما زمانی که بازمی‌گردد، والتر را در خانه نمی‌یابد. جستجوهایش نتیجه نمی‌دهد و مراجعه‌اش به پلیس نیز سود چندانی ندارد. اما خطابه کشیش گوستاو برایگلب دربارهٔ فساد، بی‌لیاقتی و سهل‌انگاری پلیس لس‌آنجلس سبب می‌شود تا رئیس پلیس و مأمورین پرونده تلاش خود را چند برابر کنند. چند ماه بعد، پلیس به کریستین اطلاع می‌دهد فرزندش زنده در شهری دیگر یافته شده‌است. اما زمانی که کریستین برای تحویل گرفتن پسرش در مراسم برگزار شده توسط پلیس در ایستگاه راه‌آهن حاضر می‌شود، خود را با بچه‌ای اشتباهی روبرو می‌بیند. ",
};

const MoviePage = () => {
  return (
    <div>
      <div>
        <div className="site-header-bg"></div>
        <NavBar />
      </div>

      <div className="header-wrapper">
        <img src={movie.headerImage} alt="header" className="header-image" />
        <div className="backdropmask"></div>
      </div>
      <div className="film-content">
        <Row align="left" className="movie-info">
          <Col span={8}>
            <img src={movie.poster} alt="poster" className="poster" />
          </Col>
          <Col span={10}>
            <div className="movie-story">
              <h1>{movie.name}</h1>
              <h3>{movie.year}</h3>
              {movie.story}
            </div>
          </Col>
          <Col span={6}>
            {/* <img src={movie.poster} alt="poster" className="poster" /> */}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default MoviePage;
