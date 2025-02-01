import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {

    const navigate = useNavigate();

    return (
        <div>
            <div>
                <button onClick={() => navigate("/home")}>HOME</button>
                <button>PAGE 1</button>
                <button>PAGE 2</button>
            </div>
        </div>
    )
};

export default NavBar;