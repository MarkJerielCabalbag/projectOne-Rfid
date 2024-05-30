import { departmentOptions } from "../components/objects/departmentOptions";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRegisterAccount } from "../hooks/useRegisterAccount";
import ButtonSpinner from "../components/ButtonSpinner";

function RegisterContent({ changeForm, setIsRegister }) {
  const [selectedDepartment, setSelectedDepartment] = useState(
    departmentOptions[0].department
  );

  const [user, setUser] = useState({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    password2: "",
  });
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const { email, firstname, lastname, department, password, password2 } = user;

  const handleResetInputValue = () => {
    setUser({
      email: "",
      password: "",
      password2: "",
    });
    setSelectedDepartment("");
  };

  const onSuccess = (data) => {
    handleResetInputValue();
    toast.success("Registered Successfully");
    console.log(data);
    localStorage.setItem("dean", JSON.stringify(data));
  };

  const onError = (error) => {
    toast.error(`${error.message}`);
    handleResetInputValue();
  };

  const { mutateAsync, error, isLoading, isPending } = useRegisterAccount({
    onSuccess,
    onError,
  });

  useEffect(() => {
    if (isLoading) toast.loading("Loading");
  }, [isLoading]);

  return (
    <>
      <h1>Register</h1>
      <input
        type="email"
        name="email"
        placeholder="Enter your Email"
        value={email}
        onChange={handleChange}
        className="form-control mt-3 mb-3"
      />
      <input
        type="text"
        name="firstname"
        placeholder="Enter your Firstname"
        value={firstname}
        onChange={handleChange}
        className="form-control mt-3 mb-3"
      />
      <input
        type="text"
        name="lastname"
        placeholder="Enter your Lastname"
        value={lastname}
        onChange={handleChange}
        className="form-control  mt-3 mb-3"
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

      <input
        type="password"
        name="password2"
        placeholder="Confirm your Password"
        value={password2}
        onChange={handleChange}
        className="form-control  mt-3 mb-3"
      />
      <ButtonSpinner
        className={
          isLoading || isPending ? "spinner-border spinner-border-sm " : ""
        }
        btnClassname={`btn btn-outline-secondary w-100 my-3`}
        buttonContent={`${
          isLoading || isPending ? "Registering " : "Register "
        }`}
        onClick={async (e) => {
          e.preventDefault();
          try {
            setIsRegister(false);
            if (password === password2) {
              const formData = {
                email,
                firstname,
                lastname,
                department: selectedDepartment,
                password,
              };
              await mutateAsync(formData);
            } else {
              toast.error("Your password did not match try again");
            }
          } catch (err) {
            console.log(error.message);
          }
        }}
      />

      {changeForm}
    </>
  );
}

export default RegisterContent;
