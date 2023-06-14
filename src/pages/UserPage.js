import NavBar from "../components/navBar";
import { Row, Col, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../App";
import { StarTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";

const UserPage = () => {
  const [watchlist, setWatchlist] = useState([]);

  const { state } = useContext(AuthContext);
  useEffect(() => {
    (async () => {
      try {
        const headers = state.isAuthenticated? {"Authorization": state.token} : {}
        const response = await axios.get("https://cinemashelf.ir/api/movie/watchlist/", { headers: headers });
        setWatchlist(response.data)
      } catch (error) {}
    })();
  }, [state.isAuthenticated, state.token]);
  return (
    <>
      <div>
        <div className="site-header-bg"></div>
        <NavBar />
      </div>
      <div className="profile">
        <Row align="left" className="profile-content">
          <Col span={4}>
            <Avatar
              style={{ backgroundColor: "#21262c" }}
              shape="square"
              size={100}
              icon={<UserOutlined />}
            />
          </Col>
          <Col span={16}>
            <div className="text-right">
              <h1>{state.user}</h1>
            </div>
          </Col>
          <Col span={6}></Col>
        </Row>
        <div className="watchlist">
          <h2>لیست علاقمندی ها</h2>
          <Row justify="space-rigth" align="middle">
            {watchlist.map((movie) => (
              <Col span={4} key={movie.id}>
                <div className="movie-card-watchlist">
                  <img src={movie.logo} width={185} height={274} alt="movie" />

                  <div className="movie-content">
                    <div className="card-score">
                      <StarTwoTone twoToneColor="#FFD700" />
                      <h3>{movie.imdb_rating}</h3>
                    </div>
                    <Link to={`/movies/${movie.id}`}>
                      <h3>{movie.name}</h3>
                    </Link>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
};

export default UserPage;
