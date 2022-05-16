import { useState, useCallback, useEffect } from "react";
import axios from "axios";

const LoginPage = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [userNo, setUserNo] = useState(-1);

  const handleLoginChange = useCallback((e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "email") setLogin((prev) => ({ ...prev, email: value }));
    else setLogin((prev) => ({ ...prev, password: value }));
  }, []);

  const userSignIn = useCallback(async () => {
    try {
      const { data } = await axios.post(`http://localhost:3000/api/login`, {
        ...login,
      });
      setUserNo(data.user_no);
    } catch (err) {
      console.error(err);
    }
  }, [login]);

  useEffect(() => {
    return () => {
      setLogin({
        email: "",
        password: "",
      });
      setUserNo(-1);
    };
  }, []);

  return (
    <div className="App">
      <h2>로그인 화면</h2>
      <input
        type="email"
        value={login.email}
        name="email"
        onChange={handleLoginChange}
        placeholder="이메일"
      />
      <input
        type="password"
        value={login.password}
        name="password"
        onChange={handleLoginChange}
        placeholder="비밀번호"
      />
      <button onClick={userSignIn}>로그인</button>
      {userNo !== -1 && <h3>로그인 성공</h3>}
    </div>
  );
};

export default LoginPage;
