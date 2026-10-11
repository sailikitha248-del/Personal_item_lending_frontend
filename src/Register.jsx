
import axios from "axios";
import { useState } from "react";

function Register(){
      const [formdata,setFormdata] = useState({
            name:"",
            role:"",
            email:"",
            password:""
      });
      function handleChange(e){
            setFormdata({
                  ...formdata,
                  [e.target.name]:e.target.value
            });
      }
      async function hogaya(e){
            e.preventDefault();
            const response = await axios.post("http://localhost:8080/employee/add",formdata).then((response)=>{
                  console.log(response.data);
            }).catch((error)=>{
                  console.log(error);
            });

            setFormdata({
                  name:"",
                  role:"",
                  email:"",
                  password:""
            })
      }
      return(
            <>
                  <h1>Register Here</h1>
            <form onSubmit={hogaya}>
                  <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formdata.name}
                  onChange={handleChange}/>
                  <br/>
                  <input
                  type="text"
                  name="role"
                  placeholder="Enter your role"
                  value={formdata.role}
                  onChange={handleChange}/>
                  <br/>
                  <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formdata.email}
                  onChange={handleChange}
                  />
                  <br/>
                  <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formdata.password}
                  onChange={handleChange}
                  />
                  <br/>
                  <button type="submit">Register</button>
            </form>
            </>
      )
}
export default Register;











import Register from "./Register";
function App(){
  return(
    <>
      <Register/>
    </>
  );
}
export default App