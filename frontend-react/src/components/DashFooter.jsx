
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function DashFooter() {

    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { username, status } = useAuth();

    const onGoHomeClicked = () => navigate('/dash');

    let goHomeButton = null;
    if (pathname !== '/dash') {
        goHomeButton = (
            <button className="dash-footer__button icon-button" title="Home" onClick={onGoHomeClicked}> 
                <FontAwesomeIcon icon={faHouse} />
            </button>
        );
    }

    return (
        <footer className="dash-footer">
            {goHomeButton}
            <div className="container">
                <p className="text-muted"> Current User: {username}</p>
                <p> Status: {status}</p>
            </div>
        </footer>
    );
}
export default DashFooter;