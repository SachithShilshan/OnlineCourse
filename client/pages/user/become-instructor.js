import { useContext, useState } from "react";
import { Context } from "../../context";
import { Button } from "antd";
import axios from "axios";
import {
  SettingOutlined,
  UserSwitchOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import UserRoute from "../../components/routes/UserRoute";

const BecomeInstructor = () => {
  // state
  const [loading, setLoading] = useState(false);
  const {
    state: { user },
  } = useContext(Context);

  const becomeInstructor = () => {
    // console.log("become instructor");
    setLoading(true);
    axios
      .post("/api/make-instructor")
      .then((res) => {
        console.log(res);
        window.location.href = res.data;
      })
      .catch((err) => {
        console.log(err.response.status);
        toast("Stripe onboarding failed. Try again.");
        setLoading(false);
      });
  };

  return (
    <>
      <div className="homepage-bgimage">
        <div className="login-box">
          <h2 className=" text-center"   
            >Become Instructor</h2>

          <div className="container">
            <div className="row">
              <div className="col-md-20 offset-md-20 text-center">
                <div className="pt-2">
                  <UserSwitchOutlined className="display-4 pb-1" />
                  <br />
             
                  <h>Setup payout to publish courses</h>
                  <p className="lead text-warning">
                    course partners with stripe to transfer earnings to your bank
                    account
                  </p>

                  <Button
                    className="mb-3"
                    type="primary"
                    block
                    shape="round"
                    icon={loading ? <LoadingOutlined /> : <SettingOutlined />}
                    size="large"
                    onClick={becomeInstructor}
                    disabled={
                      (user && user.role && user.role.includes("Instructor")) ||
                      loading
                    }
                  >
                    {loading ? "Processing..." : "Payout Setup"}
                  </Button>

                  <p className="text-warning ">
                    You will be redirected to stripe to complete onboarding process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BecomeInstructor;
