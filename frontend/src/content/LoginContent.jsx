import { departmentOptions } from "../components/objects/departmentOptions";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useLoginAccount } from "../hooks/useRegisterAccount";
import ButtonSpinner from "../components/ButtonSpinner.jsx";
function LoginContent({ changeForm }) {
  const navigate = useNavigate();

  const [selectedDepartment, setSelectedDepartment] = useState(
    departmentOptions[0].department
  );
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, department, password } = user;
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleResetInputValue = () => {
    setUser({
      email: "",
      password: "",
    });
    setSelectedDepartment("");
  };
  const onSuccess = (data) => {
    handleResetInputValue();
    toast.success("Login Successfully");
    console.log(data);
    localStorage.setItem("dean", JSON.stringify(data));
    navigate("/dashboard/home");
  };

  const onError = (error) => {
    toast.error(`${error.message}`);
    handleResetInputValue();
  };
  const { mutateAsync, error, isLoading, isSuccess, isPending } =
    useLoginAccount({ onSuccess, onError });

  useEffect(() => {
    if (isLoading) toast.loading("Pending");
    if (isSuccess) toast.success("Login Successfully");
  }, [isLoading, isSuccess]);

  return (
    <>
      <h1>Login</h1>
      <input
        type="email"
        name="email"
        placeholder="Enter your Email"
        value={email}
        onChange={handleChange}
        className="form-control mt-3 mb-3"
      />
      <select
        name="department"
        className="form-select  mt-3 mb-3"
        value={selectedDepartment}
        onChange={(e) => setSelectedDepartment(e.target.value)}
      >
        {departmentOptions.map((department) => (
          <option key={department.id} value={department.department}>
            {department.department}
          </option>
        ))}
      </select>

      <input
        type="password"
        name="password"
        placeholder="Enter your Password"
        value={password}
        onChange={handleChange}
        className="form-control  mt-3 mb-3"
      />
      <ButtonSpinner
        className={
          isLoading || isPending ? "spinner-border spinner-border-sm " : ""
        }
        btnClassname={`btn btn-outline-secondary w-100 my-3`}
        buttonContent={`${isLoading || isPending ? "Logging in " : "Log-in "}`}
        onClick={async (e) => {
          e.preventDefault();
          try {
            await mutateAsync({
              email,
              department: selectedDepartment,
              password,
            });
          } catch (err) {
            console.log(err);
          }
        }}
      />

      {changeForm}
    </>
  );
}

export default LoginContent;
