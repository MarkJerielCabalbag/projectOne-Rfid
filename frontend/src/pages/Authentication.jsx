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
      <div className="container-sm vh-100 d-flex justify-content-center align-items-center">
        <div className="bg-white p-5 rounded text-black d-flex align-items-center gap-5">
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
          <div className="w-75 d-flex flex-column align-items-center text-center">
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
