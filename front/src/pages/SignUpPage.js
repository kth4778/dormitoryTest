import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup, clearError, clearMessage } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    studentNum: '',
    college: '',
    major: '',
  });
  const [passwordMismatchError, setPasswordMismatchError] = useState(null);
  const [studentNumError, setStudentNumError] = useState(null);
  const [emailError, setEmailError] = useState(null); // 이메일 오류 상태 추가
  const [passwordFormatError, setPasswordFormatError] = useState(null); // 비밀번호 형식 오류 상태 추가

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (message === '회원가입 성공') {
      alert('회원가입이 성공적으로 완료되었습니다. 로그인 페이지로 이동합니다.');
      navigate('/login');
    }
    return () => {
      dispatch(clearError());
      dispatch(clearMessage());
    };
  }, [message, navigate, dispatch]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    // 비밀번호 또는 비밀번호 재확인 필드가 변경될 때마다 불일치 오류 초기화
    if (id === 'password' || id === 'confirmPassword') {
      setPasswordMismatchError(null);
      setPasswordFormatError(null); // 비밀번호 형식 오류도 초기화
    }
    // 학번 필드가 변경될 때마다 학번 오류 초기화
    if (id === 'studentNum') {
      setStudentNumError(null);
    }
    // 이메일 필드가 변경될 때마다 이메일 오류 초기화
    if (id === 'email') {
      setEmailError(null);
    }
  };

  // 이메일 유효성 검사 (onBlur)
  const handleEmailBlur = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setEmailError('유효한 이메일 주소를 입력해주세요.');
    } else {
      setEmailError(null);
    }
  };

  // 비밀번호 유효성 검사 (onBlur)
  const handlePasswordBlur = () => {
    // 8자 이상, 영문, 숫자, 특수문자 포함
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setPasswordFormatError('비밀번호는 8자 이상이며, 영문, 숫자, 특수문자를 모두 포함해야 합니다.');
    } else {
      setPasswordFormatError(null);
    }
  };

  // 비밀번호 재확인 필드에서 포커스를 잃었을 때 유효성 검사
  const handleConfirmPasswordBlur = () => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordMismatchError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordMismatchError(null);
    }
  };

  // 학번 필드에서 포커스를 잃었을 때 유효성 검사
  const handleStudentNumBlur = () => {
    if (formData.studentNum.length !== 7) {
      setStudentNumError('학번은 7자리여야 합니다.');
    } else {
      setStudentNumError(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 최종 제출 전 모든 유효성 검사
    handleEmailBlur();
    handlePasswordBlur();
    handleConfirmPasswordBlur();
    handleStudentNumBlur();

    if (emailError || passwordFormatError || passwordMismatchError || studentNumError) {
      return; // 유효성 검사 오류가 있으면 제출하지 않음
    }

    // 비밀번호 재확인 필드는 백엔드로 보내지 않음
    const { confirmPassword, ...dataToSend } = formData;
    dispatch(signup(dataToSend));
  };

  return (
    <div className="signup-page">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">이메일:</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleEmailBlur} // onBlur 이벤트 추가
            placeholder="예: example@example.com"
            required
          />
          {emailError && formData.email.length > 0 && (
            <p className="error-message">{emailError}</p>
          )}
        </div>
        <div>
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handlePasswordBlur} // onBlur 이벤트 추가
            placeholder="8자 이상, 영문, 숫자, 특수문자 포함"
            required
          />
          {passwordFormatError && formData.password.length > 0 && (
            <p className="error-message">{passwordFormatError}</p>
          )}
        </div>
        <div>
          <label htmlFor="confirmPassword">비밀번호 재확인:</label>
          <input
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleConfirmPasswordBlur}
            placeholder="비밀번호를 다시 입력하세요"
            required
          />
          {passwordMismatchError && formData.confirmPassword.length > 0 && (
            <p className="error-message">{passwordMismatchError}</p>
          )}
        </div>
        <div>
          <label htmlFor="name">이름:</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="실명 입력"
            required
          />
        </div>
        <div>
          <label htmlFor="phone">휴대폰 번호:</label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="숫자만 입력 (예: 01012345678)"
            required
          />
        </div>
        <div>
          <label htmlFor="studentNum">학번:</label>
          <input
            type="text"
            id="studentNum"
            value={formData.studentNum}
            onChange={handleChange}
            onBlur={handleStudentNumBlur}
            placeholder="학번 7자리 입력 (예: 2023123)"
            maxLength="7"
            required
          />
          {studentNumError && formData.studentNum.length > 0 && (
            <p className="error-message">{studentNumError}</p>
          )}
        </div>
        <div>
          <label htmlFor="college">단과대학:</label>
          <input
            type="text"
            id="college"
            value={formData.college}
            onChange={handleChange}
            placeholder="소속 단과대학 입력"
            required
          />
        </div>
        <div>
          <label htmlFor="major">전공:</label>
          <input
            type="text"
            id="major"
            value={formData.major}
            onChange={handleChange}
            placeholder="전공 입력"
            required
          />
        </div>
        <button type="submit" disabled={isLoading || emailError || passwordFormatError || passwordMismatchError || studentNumError}>
          {isLoading ? '가입 중...' : '회원가입'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {message && message !== '회원가입 성공' && <p className="success-message">{message}</p>}
      <p>
        이미 계정이 있으신가요? <a href="/login">로그인</a>
      </p>
    </div>
  );
}

export default SignUpPage;
