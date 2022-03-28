import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";

const Login = () => {
  const [name, setName] = useState("abc");
  const [email, setEmail] = useState("abc@gmail.com");
  const [password, setPassword] = useState("abc");
  const [loading, setLoading] = useState(false);
  // state
  const {
    state: { user },
  } = useContext(Context);

  const router = useRouter();

  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table({ name, email, password });
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/register`, {
        name,
        email,
        password,
      });
      // console.log("REGISTER RESPONSE", data);
      toast("Registration successful. Please login.");
      setName("");
      setEmail("");
      setPassword("");
      setLoading(false);
    } catch (err) {
      toast(err.response.data);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="homepage-bgimage">
        <div class="login-box">
          <h2>Register</h2>

          <div className="container">
          <form onSubmit={handleSubmit}>
              <div class="user-box">
                <input
                  type="text"
                  className="form-control mb-4 p-4"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                  required
                />
              </div>

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
              <a href="#">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <button
                  type="submit"
                  className="btn btn-block btn-primary"
                  disabled={!name || !email || !password || loading}
                >
                  {loading ? <SyncOutlined spin /> : "Submit"}
                </button>
              </a>
            </form>

            <p className="text-warning p-3">
              Already registered?{" "}
              <Link href="/login">
                <a>Login</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
