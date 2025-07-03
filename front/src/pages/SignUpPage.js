import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup, clearError, clearMessage } from '../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';

function SignUpPage() {
  const [step, setStep] = useState('terms'); // 'terms', 'signupForm'
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [agreeToPrivacy, setAgreeToPrivacy] = useState(false);

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
  const [emailError, setEmailError] = useState(null);
  const [passwordFormatError, setPasswordFormatError] = useState(null);

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
    if (id === 'password' || id === 'confirmPassword') {
      setPasswordMismatchError(null);
      setPasswordFormatError(null);
    }
    if (id === 'studentNum') {
      setStudentNumError(null);
    }
    if (id === 'email') {
      setEmailError(null);
    }
  };

  const handleEmailBlur = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setEmailError('유효한 이메일 주소를 입력해주세요.');
    } else {
      setEmailError(null);
    }
  };

  const handlePasswordBlur = () => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setPasswordFormatError('비밀번호는 8자 이상이며, 영문, 숫자, 특수문자를 모두 포함해야 합니다.');
    } else {
      setPasswordFormatError(null);
    }
  };

  const handleConfirmPasswordBlur = () => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordMismatchError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordMismatchError(null);
    }
  };

  const handleStudentNumBlur = () => {
    if (formData.studentNum.length !== 7) {
      setStudentNumError('학번은 7자리여야 합니다.');
    } else {
      setStudentNumError(null);
    }
  };

  const handleProceedToPhoneVerification = () => {
    // 실제 앱에서는 여기서 휴대폰 인증 로직을 트리거합니다.
    // 현재는 약관 동의 후 바로 회원가입 폼으로 이동합니다.
    setStep('signupForm');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleEmailBlur();
    handlePasswordBlur();
    handleConfirmPasswordBlur();
    handleStudentNumBlur();

    if (emailError || passwordFormatError || passwordMismatchError || studentNumError) {
      return;
    }

    const { confirmPassword, ...dataToSend } = formData;
    dispatch(signup(dataToSend));
  };

  if (step === 'terms') {
    return (
      <div className="signup-page">
        <h2>회원가입 약관 동의</h2>
        <div>
          <label>
            <input
              type="checkbox"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
            />
            서비스 이용약관 동의 (필수)
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={agreeToPrivacy}
              onChange={(e) => setAgreeToPrivacy(e.target.checked)}
            />
            개인정보 수집 및 이용 동의 (필수)
          </label>
        </div>
        <button
          onClick={handleProceedToPhoneVerification}
          disabled={!agreeToTerms || !agreeToPrivacy}
        >
          휴대폰 인증
        </button>
        <p>
          이미 계정이 있으신가요? <Link to="/login">로그인</Link>
        </p>
      </div>
    );
  }

  // step이 'signupForm'일 때 렌더링될 내용
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
            onBlur={handleEmailBlur}
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
            onBlur={handlePasswordBlur}
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
        이미 계정이 있으신가요? <Link to="/login">로그인</Link>
      </p>
    </div>
  );
}

export default SignUpPage;