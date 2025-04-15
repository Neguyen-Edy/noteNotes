
import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import useTitle from "../../hooks/useTitle";

function Welcome() {
    
    const date = new Date();
    const today = new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "long" }).format(date);
    const { username, isManager, isAdmin } = useAuth();
    useTitle(`notesNote: ${username}`)

    return (
        <section className="welcome">
            <p> {today} </p>

            <h1>Welcome {username}!</h1>

            <p><Link to="/dash/notes">View Notes</Link></p>

            <p><Link to="/dash/notes/new">Add New Note</Link></p>

            {(isManager || isManager) && <p><Link to="/dash/users">View User Settings</Link></p>}

            {(isManager || isManager) && <p><Link to="/dash/users/new">Add New User</Link></p>}
        </section>
    );
}

export default Welcome;
