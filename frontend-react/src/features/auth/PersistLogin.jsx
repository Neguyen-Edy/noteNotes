
import { Outlet, Link } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import { useRefreshMutation } from "./authApiSlice"
import usePersist from "../../hooks/usePersist"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "./authSlice"

function PersistLogin() {
    const [persist] = usePersist();
    const token = useSelector(selectCurrentToken);
    const effectRanRef = useRef(false);

    const [trueSuccess, setTrueSuccess] = useState(false);

    const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] = useRefreshMutation();

    useEffect(() => {
        console.log(token);
        if (effectRanRef.current === true || process.env.NODE_ENV !== 'development') {
            const verifyRefreshToken = async () => {
                console.log('verifying refresh token')
                try {
                    //const response =
                    await refresh();

                    //const { accessToken } = response.data;
                    setTrueSuccess(true);
                } catch(err) {
                    console.error(err);
                }
            }

            if (persist) {
                verifyRefreshToken();
            }
        }

        return () => {
            effectRanRef.current = true;
            console.log('effect ran cleanup');
        }

        // eslint-disable-next-line
    }, []);

    let content;
    if (!persist) {
        console.log('no persist');
        content = <Outlet />;
    }
    else if (isLoading) { //persist: yes, token: no
        console.log('loading');
        content = <PulseLoader color={"#FFF"} />;
    }
    else if (isError) { //persist: yes, token: no
        console.log('error');
        content = (
            <p className="errmsg">
                {`${error?.data?.message} - `}
                <Link to="/login">Please login again</Link>
            </p>
        );
    }
    else if (isSuccess && trueSuccess) { //persist: yes, token: yes
        console.log('success');
        content = <Outlet />;
    }
    else if (isSuccess && isUninitialized) { //persist: yes, token: yes
        console.log('token and uninit');
        console.log(isUninitialized);
        content = <Outlet />;
    }

    return content;
}

export default PersistLogin;
