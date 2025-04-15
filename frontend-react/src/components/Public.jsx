import { Link } from "react-router-dom"

function Public() {

    return (
        <section className="public">
            <header>
                <h1>
                    Welcome to <span className="nowrap"> Ed D. Repairs! </span>
                </h1>
            </header>
            <main className="public__main">
                <p>
                    Located in Beautiful Downtown Foo City, Ed D. Repairs provides a trained staff ready to meet your tech repair needs.
                </p>
                <address className="public__address">
                    Ed D. Repairs <br />
                    1234 Foo St. <br />
                    Foo City, FC 12345 <br />
                    <a href="tell:+1234567890">(123) 456-7890</a>
                </address>
                <br />
                <p>Owner: Eddie Nguyen</p>
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>
    );
}

export default Public;