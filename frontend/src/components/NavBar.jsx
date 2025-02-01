import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {

    const navigate = useNavigate();

    return (
        <div>
            <div>
                {/* <a onClick={() => navigate("/Home")}>
                    <div><img src={"/SiteLogo.png"} h={"80px"} width={"100px"}/></div>
                </a> */}
                <button onClick={() => navigate("/home")}>HOME</button>
            </div>
            <main><Outlet/></main>
        </div>
    )
};

export default NavBar;