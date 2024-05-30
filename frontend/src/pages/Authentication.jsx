import { useState } from "react";
import Form from "../components/Form";
import RegisterContent from "../content/RegisterContent";
import logo from "../assets/logo.png";
import { Toaster } from "react-hot-toast";
import LoginContent from "../content/LoginContent";

function Authentication() {
  const [isRegister, setIsRegister] = useState(false);
  const toggleForm = () => setIsRegister(!isRegister);

  return (
    <>
      <div className="container-sm container-md container-lg d-flex justify-content-center align-items-center vh-100">
        <div className="container-fluid d-sm-flex flex-sm-column-reverse align-items-sm-center justify-content-sm-center d-md-flex flex-md-row align-items-md-center justify-content-md-center gap-3">
          <Form
            className={"text-center"}
            formContent={
              <>
                {isRegister ? (
                  <RegisterContent
                    setIsRegister={setIsRegister}
                    changeForm={
                      <button
                        className="btn btn-primary w-100"
                        onClick={toggleForm}
                      >
                        {isRegister
                          ? "Already have an account? Login here"
                          : "No account? Register here"}
                      </button>
                    }
                  />
                ) : (
                  <LoginContent
                    changeForm={
                      <button
                        className="btn btn-primary w-100"
                        onClick={toggleForm}
                      >
                        {isRegister
                          ? "Already have an account? Login here"
                          : "No account? Register here"}
                      </button>
                    }
                  />
                )}
              </>
            }
          />
          <div className="w-100 d-flex flex-column align-items-center text-center">
            <img src={logo} className="img-fluid" alt="Logo" />
            <h1>Radio Frequency Identification</h1>
            <p>RFID Solutions for Classroom Security and Access Control!</p>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default Authentication;
