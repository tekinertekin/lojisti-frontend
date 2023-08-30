import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import { Slide, Zoom } from "react-awesome-reveal";
import { ContactProps, ValidationTypeProps } from "./types";
import { useForm } from "../../common/utils/useForm";
import validate from "../../common/utils/validationRules";
import { Button } from "../../common/Button";
import Block from "../Block";
import Input from "../../common/Input";
import { ContactContainer, FormGroup, Span, ButtonContainer } from "./styles";
import axiosInstance from '../../axios';
import { useState } from "react";
import { ErrorContainer } from '../../common/utils/generalError';

const Login = ({ title, content, id, t }: ContactProps) => {
  const { values, errors, handleChange } = useForm(
    validate
  ) as any;

  const ValidationType = ({ type }: ValidationTypeProps) => {
    const ErrorMessage = errors[type];
    return (
      <Zoom direction="left">
        <Span erros={errors[type]}>{ErrorMessage}</Span>
      </Zoom>
    );
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
		e.preventDefault();
		console.log(email);
    console.log(password);

		axiosInstance
			.post(`token/`, {
				email: email,
				password: password,
			})
			.then((res) => {
        setShowError(false);
				localStorage.setItem('access_token', res.data.access);
				localStorage.setItem('refresh_token', res.data.refresh);
				axiosInstance.defaults.headers['Authorization'] = 'JWT ' + localStorage.getItem('access_token');
        window.location.href = '/home'
			})
      .catch((error) => {
        setShowError(true);
      });
	};


  return (
    <ContactContainer id={id}>
      <Row justify="space-between" align="middle">
        <Col lg={12} md={11} sm={24} xs={24}>
          <Slide direction="left">
            <Block title={title} content={content} />
          </Slide>
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <Slide direction="right">
            <FormGroup autoComplete="off" onSubmit={handleSubmit}>
              <Col span={24}>
                <Input
                  type="text"
                  id="email"
                  name="E-Posta"
                  placeholder="E-Posta"
                  onChange={event => setEmail(event.target.value)}
                  value={email}
                />
                <ValidationType type="email" />
              </Col>
              <Col span={24}>
                <Input
                  type="password"
                  id="password"
                  name="Şifre"
                  placeholder="Şifre"
                  onChange={event => setPassword(event.target.value)}
                  value={password}
                />
                <ValidationType type="email" />
              </Col>
              <div id="errorMessage" style={{display : showError ? "" : "none"}}>
                <ErrorContainer>
                  <span style={{color : "white", padding:"10px", fontSize: "1.1em", fontFamily: "Motiva Sans Bold"}}>Kullanıcı adı ya da şifre yanlış.</span>
                </ErrorContainer>
              </div>
              <ButtonContainer>
                <Button name="submit">{t("Giriş")}</Button>
              </ButtonContainer>
            </FormGroup>
          </Slide>
        </Col>
      </Row>
    </ContactContainer>
  );
};

export default withTranslation()(Login);
