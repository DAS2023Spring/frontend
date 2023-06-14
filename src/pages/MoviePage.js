import NavBar from "../components/navBar";
import {Row, Col, List, Input, Button} from "antd";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {CheckOutlined, PlusOutlined, StarTwoTone} from "@ant-design/icons";
import {AuthContext} from "../App";

const { TextArea } = Input;

const MoviePage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [movie, setMovie] = useState()
  const [userRating, setUserRating] = useState(1)
  const [userRatingHover, setUserRatingHover] = useState()
  const { state } = useContext(AuthContext);
  const [watchListButtonLoading, setWatchListButtonLoading] = useState(false)

  async function rateEnterPress(event) {
    event.preventDefault()
    const comment = event.target.value
    try {
      const headers = state.isAuthenticated? {"Authorization": state.token} : {}
      await axios.post(
        `https://cinemashelf.ir/api/movie/${id}/rating/`,
        {
          rating: userRating,
          comment: comment,
        },
        { headers: headers }
      );
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  function shouldBeGreen(i) {
    if (userRatingHover !== undefined) {
      return i < userRatingHover
    } else {
      return i < userRating
    }
  }

  async function addToWatchList () {
    if (movie.is_in_watchlist) {
      return
    }
    if (!state.isAuthenticated) {
      navigate("/login")
    }
    const headers = {"Authorization": state.token}
    setWatchListButtonLoading(true)
    try {
      await axios.post(
        `https://cinemashelf.ir/api/movie/${movie.id}/watchlist/`,
        {},
        {headers: headers}
      );
    } catch (error) {
      return
    }
    setWatchListButtonLoading(false)
    movie.is_in_watchlist = true
    setMovie(movie)
  }

  async function removeFromWatchList () {
    if (!movie.is_in_watchlist)
      return
    if (!state.isAuthenticated) {
      navigate("/login")
    }
    const headers = {"Authorization": state.token}
    setWatchListButtonLoading(true)
    try {
      await axios.delete(
        `https://cinemashelf.ir/api/movie/${movie.id}/watchlist/`,
        {headers: headers}
      );
    } catch (error) {
      return
    }
    setWatchListButtonLoading(false)
    movie.is_in_watchlist = false
    setMovie(movie)
  }

  useEffect(() => {
    (async () => {
      try {
        const headers = state.isAuthenticated? {"Authorization": state.token} : {}
        const response = await axios.get(`https://cinemashelf.ir/api/movie/${id}/`, {
            headers: headers
        });
        setMovie(response.data);
      } catch (error) {}
    })();
  }, [id, state.isAuthenticated, state.token]);
  return (movie && (
    <div>
      <div>
        <div className="site-header-bg"></div>
        <NavBar />
      </div>

      <div className="header-wrapper">
        <img src={movie.header_image} alt="header" className="header-image" />
        <div className="backdropmask"></div>
      </div>
      <div className="film-content">
        <Row align="left" className="movie-info">
          <Col span={8}>
            <img src={movie.logo} alt="poster" className="poster" />
          </Col>
          <Col span={10}>
            <div className="movie-story">
              <div className="movie-name">
                <h1 dir="ltr">{movie.name}</h1>
                <Button
                  type="primary"
                  loading={watchListButtonLoading}
                  icon={movie.is_in_watchlist ? <CheckOutlined/> : <PlusOutlined/>}
                  onClick={() => !movie.is_in_watchlist ? addToWatchList() : removeFromWatchList()}
                >
                  علاقمندی
                </Button>
              </div>
              <h3>{movie.created_year}</h3>
              <h3>امتیاز: {movie.imdb_rating} از 100</h3>
              {movie.overall_rating?
                (<h3>امتیاز در سینماشلف: {movie.overall_rating} از 5</h3>):undefined
              }
              <div dir="ltr">{movie.story}</div>
            </div>
          </Col>
          <Col span={6}>
            {/* <img src={movie.poster} alt="poster" className="poster" /> */}
          </Col>
        </Row>
        <Row className="movie-info">
            <h1>دیدگاه‌ها</h1>
        </Row>
          {movie.can_rate? (
              <Row className="movie-info rating">
                  <div className="comment-container">
                      <div className="comment-user">
                          <h3 dir="ltr">@{state.user}</h3>
                          <div className="star-container">
                              {[...Array(5)].map((_, i) => (
                                  <StarTwoTone
                                    key={i}
                                    twoToneColor={shouldBeGreen(i)? "green":"white"}
                                    onClick={() => setUserRating(i + 1)}
                                    onMouseEnter={() => setUserRatingHover(i + 1)}
                                    onMouseLeave={() => setUserRatingHover(undefined)}
                                  />
                              ))}
                          </div>
                      </div>
                      <div className="comment-content" style={{"width": "100%"}} >
                          <TextArea
                            onPressEnter={rateEnterPress}
                            rows={4}
                            style={{"background": "transparent", color: "white"}}
                            placeholder="نظر خود را اضافه کنید."
                            bordered={false}
                            className="white-placeholder"
                          />
                      </div>
                  </div>
              </Row>
          ) : ""}
        <List
          itemLayout="horizontal"
          dataSource={movie.ratings}
          renderItem={(rating) => (
              <List.Item className="rating">
                  <div className="comment-container">
                      <div className="comment-user">
                          <h3 dir="ltr">@{rating.username}</h3>
                          <div className="star-container">
                              {[...Array(5)].map((_, i) => (
                                  <StarTwoTone key={i} twoToneColor={i < rating.rating? "green":"white"} />
                              ))}
                          </div>
                      </div>
                      <div className="comment-content">
                          {rating.comment}
                      </div>
                  </div>
              </List.Item>
          )} />
      </div>
    </div>
  ));
};

export default MoviePage;
