import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button} from "antd";
import header from "../images/eastwood.jpg";
import { StarTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";
import NavBar from "../components/navBar";

const MainPage = () => {
  let navigate = useNavigate();
  const [movies, setMovies] = useState([
    {
      id: 1,
      name: "The Whale",
      score: 7.8,
      image:
        "https://m.media-amazon.com/images/M/MV5BZDQ4Njg4YTctNGZkYi00NWU1LWI4OTYtNmNjOWMyMjI1NWYzXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_.jpg",
    },
    {
      id: 2,
      name: "Seven",
      score: 7.8,
      image:
        "https://m.media-amazon.com/images/M/MV5BOTUwODM5MTctZjczMi00OTk4LTg3NWUtNmVhMTAzNTNjYjcyXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
    },
    {
      id: 3,
      name: "Unforgiven",
      score: 7.8,
      image:
        "https://m.media-amazon.com/images/M/MV5BODM3YWY4NmQtN2Y3Ni00OTg0LWFhZGQtZWE3ZWY4MTJlOWU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
    },
    {
      id: 4,
      name: "Conjuring",
      score: 7.8,
      image:
        "https://m.media-amazon.com/images/M/MV5BMTM3NjA1NDMyMV5BMl5BanBnXkFtZTcwMDQzNDMzOQ@@._V1_.jpg",
    },
    {
      id: 5,
      name: "The Shining",
      score: 7.8,
      image:
        "https://m.media-amazon.com/images/M/MV5BZWFlYmY2MGEtZjVkYS00YzU4LTg0YjQtYzY1ZGE3NTA5NGQxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
    },
    {
      id: 6,
      name: "Godfather",
      score: 7.8,
      image:
        "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    },
  ]);

  const loginPage = () => {
    navigate("/login");
  };

  return (
    <div>
      <div>
        <div className="site-header-bg"></div>
        <NavBar />
      </div>

      <div className="header-wrapper">
        <img src={header} alt="header" className="header-image" />
        <div className="backdropmask"></div>
      </div>

      <div className="header-content">
        <div className="header-text">
          <h1>فیلم هایی که دوست دارید را دنبال کنید</h1>
          <h1>فیلم ها را برای مشاهده در آینده ذخیره کنید</h1>
          <Button type="primary" size="large" onClick={loginPage}>
            شروع کنید
          </Button>
        </div>
        <div className="movie-list">
          <Row justify="space-rigth" align="middle">
            {movies.map((movie) => (
              <Col span={4} key={movie.id}>
                <Link to={`/movies/${movie.id}`}>
                  <div className="movie-card">
                    <img
                      src={movie.image}
                      width={185}
                      height={274}
                      alt="movie"
                    />

                    <div className="movie-content">
                      <div className="card-score">
                        <StarTwoTone twoToneColor="#FFD700" />
                        <h3>{movie.score}</h3>
                      </div>
                      <h3>{movie.name}</h3>
                    </div>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
