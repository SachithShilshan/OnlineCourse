import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("@gmail.com");
  const [password, setPassword] = useState("rrrrrr");
  const [loading, setLoading] = useState(false);

  // state
  const {
    state: { user },
    dispatch,
  } = useContext(Context);
  // const { user } = state;

  // router
  const router = useRouter();

  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table({ name, email, password });
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/login`, {
        email,
        password,
      });
      // console.log("LOGIN RESPONSE", data);
      dispatch({
        type: "LOGIN",
        payload: data,
      });
      // save in local storage
      window.localStorage.setItem("user", JSON.stringify(data));
      // redirect
      router.push("/");
      // setLoading(false);
    } catch (err) {
      toast(err.response.data);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="homepage-bgimage">
        <div class="login-box">
          <h2>Login</h2>

          <div className="container ">
          <form onSubmit={handleSubmit}>
              <div class="user-box">
                <input
                  type="email"
                  className="form-control mb-4 p-4"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  required
                />
              </div>
              <div class="user-box">
                <input
                  type="password"
                  className="form-control mb-4 p-4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>
              <a>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                
                <button
                type="submit"
                className="btn btn-block btn-primary"
                disabled={!email || !password || loading}
              >
                {loading ? <SyncOutlined  /> : "Submit"}
              </button>
               
              </a>
            </form>

            <p className="text-warning pt-3">
              Not yet registered?{" "}
              <Link href="/register">
                <a>Register</a>
              </Link>
            </p>

            <p className="text-center">
              <Link href="/forgot-password">
                <a className="text-danger">Forgot password</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
