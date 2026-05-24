import { useState } from "react";
import axios from "axios";

function RegisterPage() {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const submitHandler = async (
    e
  ) => {
    e.preventDefault();

    try {
      const { data } =
        await axios.post(
          "http://localhost:5000/api/auth/register",
          {
            name,
            email,
            password,
          }
        );

      alert(
        "Registration Successful"
      );

      console.log(data);
    } catch (error) {
      alert(
        "Registration Failed"
      );
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>

      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button
          className="btn"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;