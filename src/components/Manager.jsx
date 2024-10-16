import React from "react";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';
uuidv4(); 

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  
  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    passwordRef.current.type = "text";
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      passwordRef.current.type = "text";
      ref.current.src = "icons/eyecross.png";
    }
  };

  const copyText = (text) => {
    toast("Copy to Clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    // alert("Copy to clipboard")
    navigator.clipboard.writeText(text);
  };

  const savePassword = () => {
    if (form.site.length>3&& form.username.length>3&&form.password.length>3){
    setpasswordArray([...passwordArray, {...form,id:uuidv4()}]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id:uuidv4()}]));
    
    setForm({ site: "", username: "", password: "" })
    toast("Password saved!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });}
    else{ setForm({ site: "", username: "", password: "" })
    toast("Error: Password not saved!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });}
  };
  const editPassword = (id) => {
    // console.log("Editing password with id ",id);
   setForm(passwordArray.filter(item=>item.id===id)[0])
    setpasswordArray(passwordArray.filter(item=>item.id!==id))
  };
  const deletePassword = (id) => {
    // console.log("Deleting password with id :", id);
   const c = confirm("Do you really want to delete this password")
    if(c){
      setpasswordArray(passwordArray.filter(item=>item.id!==id));
    localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)));
    }
    toast("Password deleted!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
 
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition="Bounce"
      />

      <ToastContainer />

      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-500 opacity-20 blur-[100px]"></div>
      </div>
      <div className="  p-2 md:py-0  md:mycontainer min-h-[77.5vh]">
        <h1 className="text-4xl text text-center font-bold mt-10">
          <span className="text-green-700"> &lt;</span>Pass<span></span>
          <span className="text-green-700"> OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-center text-lg ">
          Your own Password Manager
        </p>
        <div className="text-black flex gap-8 flex-col p-4 items-center sm:min-w-full">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row gap-8 w-full sm:min-w-full">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer "
                onClick={showPassword}
              >
                <img
                  className="p-1"
                  ref={ref}
                  width={26}
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center bg-green-500 hover:bg-green-400 rounded-full px-3 py-1 w-fit border border-green-950"
          >
            <lord-icon
              src="https://cdn.lordicon.com/sbnjyzil.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#121331,secondary:#00000b"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your passwords</h2>
          {passwordArray.length === 0 && <div>No password to show</div>}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="  py-2 border border-white text-center ">
                        <div className="flex items-center justify-center mx-2">
                          <span>
                            {" "}
                            <a href={item.site} target="_blank">
                              {item.site}
                            </a>{" "}
                          </span>
                          <div
                            className="copybutton size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <img
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="icons/copy.gif"
                              alt=""
                            />
                          </div>
                        </div>
                      </td>
                      <td className="  py-2 border border-white text-center ">
                        <div className="flex items-center justify-center mx-2">
                          <span> {item.username}</span>
                          <div
                            className="copybutton size-7 cursor-pointer "
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <img
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="icons/copy.gif"
                              alt=""
                            />
                          </div>
                        </div>
                      </td>
                      <td className="   py-2 border border-white text-center ">
                        <div className="flex items-center justify-center mx-2">
                          <span> {item.password}</span>
                          <div
                            className="copybutton size-7 cursor-pointer "
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <img
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="icons/copy.gif"
                              alt=""
                            />
                          </div>
                        </div>
                      </td>
                      <td className=" justify-center py-2 border border-white text-center ">
                        <span className="cursor-pointer mx-1"onClick={() => {editPassword(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/exymduqj.json"
                            trigger="hover"
                            stroke="bold"
                            state="hover-line"
                            colors="primary:#121331,secondary:#000000"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                        <span className="cursor-pointer mx-1"  onClick={() => {deletePassword(item.id)}} >
                          <lord-icon
                              src="https://cdn.lordicon.com/hwjcdycb.json"
                            trigger="hover"
                            stroke="bold"
                            state="hover-line"
                            colors="primary:#121331,secondary:#000000"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
