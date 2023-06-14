import {useState, useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button } from "antd";
import header from "../images/eastwood.jpg";
import { StarTwoTone, PlusOutlined, CheckOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import NavBar from "../components/navBar";
import axios from "axios";
import { AuthContext } from "../App";

const MainPage = () => {
  let navigate = useNavigate();
  const { state } = useContext(AuthContext);

  const [movies, setMovies] = useState([]);

  const [movieButtonLoadings, setMovieButtonLoadings] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const headers = state.isAuthenticated? {"Authorization": state.token} : {}
        const response = await axios.get("https://cinemashelf.ir/api/movie/", { headers: headers });
        setMovies(response.data);
      } catch (error) {}
    })();
  }, [state.isAuthenticated, state.token]);

  useEffect(() => {
    console.log(state);
  }, [state]);

  useEffect(() => {
    setMovieButtonLoadings(movies.map(_ => false))
  }, [movies]);

  const clickButton = () => {
    console.log(state.isAuthenticated);
    if (state.isAuthenticated) {
      navigate("/user");
    } else {
      navigate("/login");
    }
  };

  async function addToWatchList (movie, index) {
    if (movie.is_in_watchlist) {
      return
    }
    if (!state.isAuthenticated) {
      navigate("/login")
    }
    const headers = {"Authorization": state.token}
    setMovieButtonLoadings(movieButtonLoadings.map((value, i) => i === index? true : value))
    try {
      await axios.post(
        `https://cinemashelf.ir/api/movie/${movie.id}/watchlist/`,
        {},
        {headers: headers}
      );
    } catch (error) {
      return
    }
    setMovieButtonLoadings(movieButtonLoadings.map((value, i) => i === index? false : value))
    movie.is_in_watchlist = true
  }

  async function removeFromWatchList (movie, index) {
    if (!movie.is_in_watchlist)
      return
    if (!state.isAuthenticated) {
      navigate("/login")
    }
    const headers = {"Authorization": state.token}
    setMovieButtonLoadings(movieButtonLoadings.map((value, i) => i === index? true : value))
    try {
      await axios.delete(
        `https://cinemashelf.ir/api/movie/${movie.id}/watchlist/`,
        {headers: headers}
      );
    } catch (error) {
      return
    }
    setMovieButtonLoadings(movieButtonLoadings.map((value, i) => i === index? false : value))
    movie.is_in_watchlist = false
  }

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
          <Button type="primary" size="large" onClick={clickButton}>
            شروع کنید
          </Button>
        </div>
        <div className="movie-list">
          <Row justify="space-rigth" align="middle">
            {movies.map((movie, index) => {
              return (<Col span={4} key={movie.id}>
                  <div className="movie-card">
                    <img src={movie.logo} width={185} height={274} alt="movie"/>

                    <div className="movie-content">
                      <div className="card-score">
                        <StarTwoTone twoToneColor="#FFD700"/>
                        <h3>{movie.imdb_rating}</h3>
                      </div>
                      <Link to={`/movies/${movie.id}`}>
                        <h3 dir="ltr">{movie.name}</h3>
                      </Link>
                    </div>
                    <Button
                      type="primary"
                      loading={movieButtonLoadings[index]}
                      icon={movie.is_in_watchlist ? <CheckOutlined/> : <PlusOutlined/>}
                      onClick={() => !movie.is_in_watchlist? addToWatchList(movie, index) : removeFromWatchList(movie, index)}
                      block
                      className="watchlist-button"
                    >
                      علاقمندی
                    </Button>
                  </div>
                </Col>
              )
            })}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
