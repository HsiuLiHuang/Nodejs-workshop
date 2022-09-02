import { useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/config";

const Register = () => {
  const[member, setMember]=useState({
    email:'lily@gmail.com',
    name:'lilyhuang',
    password:'123456',
    confirmPassword:'123456',
  }); //以html來講value是有改變，但很快被react的render掉
  //物件不能直接set它

  function handleChange(e) {
    //自行檢查log看看
    console.log('handleChange', e.target.name, e.target.value);
    let newMember = { ...member };
    // newMember['name']
    // newMember['email']
    newMember[e.target.name] = e.target.value;
    setMember(newMember);
  }


  async function handleSubmit(e) {
    // 把預設行為關掉
    e.preventDefault();
    try {
      let response = await axios.post(`${API_URL}/auth/register`, member);
      console.log(response.data);
    } catch (e) {
      console.error('register', e);
    }
  }
  return (
    <form className="bg-purple-100 h-screen md:h-full md:my-20 md:mx-16 lg:mx-28 xl:mx-40 py-16 md:py-8 px-24 text-gray-800 md:shadow md:rounded flex flex-col md:justify-center">
      <h2 className="flex justify-center text-3xl mb-6 border-b-2 pb-2 border-gray-300">註冊帳戶</h2>
      <div className="mb-4 text-2xl">
        <label htmlFor="name" className="flex mb-2 w-32">
          Email
        </label>
        <input className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2"
         type="text" id="email" name="email" value={member.email}
        //  onChange={(e)=>{
        //   console.log(e.target.value) //原生的html有改變
        //不能直接動state狀態
        //  member.email =e.target.value 不可行
        //把原本的member複製一個出來
        //   let newMember ={...member};
        //   newMember.email =e.target.value
        //   setMember(newMember)
        //  }}
        onChange={handleChange}
         
          />
      </div>
      <div className="mb-4 text-2xl">
        <label htmlFor="name" className="flex mb-2 w-32">
          姓名
        </label>
        <input className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2" 
        type="text" id="name" name="name"value={member.name}
        onChange={handleChange}

        />
      </div>
      <div className="mb-4 text-2xl">
        <label htmlFor="password" className="flex mb-2 w-16">
          密碼
        </label>
        <input className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2" 
        type="password" id="password" name="password" value={member.password} 
        onChange={handleChange}
        />
      </div>
      <div className="mb-8 text-2xl">
        <label htmlFor="password" className="flex mb-2 w-32">
          確認密碼
        </label>
        <input
          className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={member.confirmPassword}
          onChange={handleChange}
        />
      </div>
      <div className="mb-8 text-2xl">
        <label htmlFor="photo" className="flex mb-2 w-32">
          圖片
        </label>
        <input className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2" type="file" id="photo" name="photo" />
      </div>
      <button className="text-xl bg-indigo-300 px-4 py-2.5 rounded hover:bg-indigo-400 transition duration-200 ease-in" onClick={handleSubmit}>註冊</button>
    </form>
  );
};

export default Register;
