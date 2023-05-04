import { useNavigate } from "react-router-dom";

const MainPage = () => { 
    let navigate = useNavigate();
  
    const loginPage = () => {
        navigate("/login")
    }
    return (
        <div>
            <h1>main page</h1>
            <button onClick={loginPage}>
                login page
            </button>
        </div>
    )
 }

export default MainPage