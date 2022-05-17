import { useState, useCallback, useEffect } from 'react'
import axios from 'axios'

const SignUpPage = () => {
  const [signUp, setSignUp] = useState({
    email: '',
    password: '',
    phone: '',
    name: '',
  })
  const [checkEmail, setCheckEmail] = useState(false)

  const handleSignUpChange = useCallback((e) => {
    const name = e.target.name
    const value = e.target.value
    switch (name) {
      case 'email':
        setSignUp((prev) => ({
          ...prev,
          email: value,
        }))
        setCheckEmail(false)
        break
      case 'password':
        setSignUp((prev) => ({
          ...prev,
          password: value,
        }))
        break
      case 'phone':
        setSignUp((prev) => ({
          ...prev,
          phone: value,
        }))
        break
      case 'name':
        setSignUp((prev) => ({
          ...prev,
          name: value,
        }))
        break
      default:
    }
  }, [])

  const handleCheckEmailClick = useCallback(async () => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    if (!signUp.email.match(emailRegex))
      return alert('이메일을 정확히 입력하세요!')
    try {
      await axios.get(`http://15.165.215.193/api/check`, {
        params: { email: signUp.email },
      })
      setCheckEmail(true)
    } catch (err) {
      if (err?.response?.status === 401) {
        setCheckEmail(false)
        return alert('이미 가입된 이메일 입니다.')
      }
      console.error(err)
    }
  }, [signUp])

  const userSignUp = useCallback(async () => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    if (!signUp.email.match(emailRegex))
      return alert('이메일을 정확히 입력하세요!')
    if (!checkEmail) return alert('이메일 중복 확인 후 진행하세요!')
    if (signUp.password.length < 8)
      return alert('비밀번호를 8자리 이상 입력하세요!')
    if (signUp.phone.length < 9 && signUp.phone.length > 11)
      return alert('휴대폰 번호를 정확히 입력하세요!')
    if (signUp.name.length < 2) return alert('성함을 정확히 입력하세요!')
    try {
      await axios.post(`http://15.165.215.193/api/register`, { ...signUp })
      setSignUp({
        email: '',
        password: '',
        phone: '',
        name: '',
      })
      setCheckEmail(false)
      alert('영업자 계정이 생성되었습니다.')
    } catch (err) {
      console.error(err)
    }
  }, [checkEmail, signUp])

  useEffect(() => {
    setSignUp({
      email: '',
      password: '',
      phone: '',
      name: '',
    })
    setCheckEmail(false)
  }, [])

  return (
    <div className="App">
      <h2>영업자 계정 추가</h2>
      <div>
        <input
          type="email"
          value={signUp.email}
          name="email"
          placeholder="이메일"
          onChange={handleSignUpChange}
        />
        <button onClick={handleCheckEmailClick}>중복 확인</button>
      </div>
      {signUp.email.length > 5 && checkEmail && (
        <span style={{ color: `green`, fontWeight: `bold` }}>
          사용가능한 이메일
        </span>
      )}
      <input
        type="password"
        value={signUp.password}
        name="password"
        placeholder="비밀번호"
        onChange={handleSignUpChange}
      />
      <input
        type="tel"
        value={signUp.phone}
        name="phone"
        placeholder="휴대폰번호"
        onChange={handleSignUpChange}
      />
      <input
        type="text"
        value={signUp.name}
        name="name"
        placeholder="성함"
        onChange={handleSignUpChange}
      />
      <button onClick={userSignUp}>영업자 계정 추가</button>
    </div>
  )
}

export default SignUpPage
