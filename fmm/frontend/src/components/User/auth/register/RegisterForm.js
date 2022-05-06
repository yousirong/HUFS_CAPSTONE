import * as Yup from 'yup'
import * as React from 'react'
import { useState } from 'react'
import { useFormik, Form, FormikProvider } from 'formik'
import { useNavigate } from 'react-router-dom'
// import NumberFormat from 'react-number-format';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material'
import { LoadingButton } from '@mui/lab'
// component
import Iconify from '../../../Home/Dashboard/Iconify'
// register page 관련 form 출력함수

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate()
  // default는 ******* 처럼 안보임 -> 클릭시 본인이 적은 비밀번호 확인가능
  const [showPassword, setShowPassword] = useState(false)
  // 빨간색 글씨로 오류 처리하는 부분
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(1, '너무 짧습니다.')
      .max(50, '너무 깁니다.')
      .required('이름은 필수 항목입니다.'),
    lastName: Yup.string()
      .min(1, '너무 짧습니다.')
      .max(50, '너무 깁니다.')
      .required('성은 필수 항목입니다.'),
    email: Yup.string()
      .email('이메일은 유효한 이메일 형식이어야 합니다.')
      .required('이메일은 필수 항목입니다.'),
    password: Yup.string().required('비밀번호는 필수 항목입니다.'),
    phonenumber: Yup.string().required('핸드폰 번호는 필수 항목입니다.'),
    // firstName: Yup.string().min(1, 'Too Short!').max(50, 'Too Long!').required('First name required'),
    // lastName: Yup.string().min(1, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    // email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    // password: Yup.string().required('Password is required'),
    // phonenumber: Yup.string().required('Phone number is required'),
  })
  // register 변수
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      //   re_enter_password: '',
      phonenumber: '',
    },
    validationSchema: RegisterSchema,
    // register 확인될 경우 dashboard로 navigate
    onSubmit: () => {
      navigate('/dashboard', { replace: true })
    },
  })
  // error handler 및 유저 선택적 api 변수
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              lang="ko"
              fullWidth
              label="이름"
              //   label="First name"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              lang="ko"
              fullWidth
              label="성"
              //   label="Last name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <TextField
            lang="ko"
            fullWidth
            autoComplete="username"
            type="email"
            label="이메일"
            // label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            lang="ko"
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="비밀번호"
            // label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <Iconify
                      icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <TextField
            lang="ko"
            fullWidth
            label="핸드폰 번호"
            // label="Phone number"
            {...getFieldProps('phonenumber')}
            error={Boolean(touched.phonenumber && errors.phonenumber)}
            helperText={touched.phonenumber && errors.phonenumber}
          />
          <LoadingButton
            lang="ko"
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            계정 생성
            {/* Create Account */}
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  )
}
