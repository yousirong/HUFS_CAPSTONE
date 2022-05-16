import { useState, useCallback, useEffect } from "react";
import axios from "axios";

const MainPage = () => {
  const [ping, setPing] = useState(false);

  const getPing = useCallback(async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/ping`);
      setPing(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    getPing();
    return () => {
      setPing(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <h2>메인화면</h2>
      <div>{!ping && <p>서버 연결 불가</p>}</div>
      {ping && (
        <>
          <p>서버 환경: {ping.env}</p>
          <p>서버 이름: {ping.name}</p>
          <p>서버 버전: {ping.version}</p>
        </>
      )}
    </div>
  );
};

export default MainPage;
