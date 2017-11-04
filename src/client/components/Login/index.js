import React from 'react';
import { Logo, Container, FacebookLogin, GoogleLogin } from '../widgets';
import styled from 'styled-components';
import { FormField } from '../../fields';
import { getField } from '../../forms/login';
import { withFormik } from 'formik';
import { compose } from 'ramda';
import PropTypes from 'prop-types';
import { Link } from 'react-router'
import { getValidationSchema, defaultValues } from '../../forms/login';


const Content = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width:100%;
  height:100vh;
`;

const LoginFormStyled = styled.form`
  display: grid;
  margin: auto;
  margin-top: 25px;
  margin-bottom: 25px;
  width: 90%;
  grid-gap: 20px;
  grid-auto-columns: minmax(70px, auto);
  grid-auto-rows: minmax(70px, auto);
  grid-template-areas: 'login' 'password';
`;

const StyledFormField = styled(FormField)`
  grid-area: ${({ field }) => field.name};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
`;

const LinkStyled = styled(Link)`
  padding: 12px 12px;
  max-width:120px;
  cursor: pointer;
  user-select: none;
  transition: all 60ms ease-in-out;
  text-align: center;
  white-space: nowrap;
  text-decoration: none !important;
  text-transform: none;
  text-transform: capitalize;
  color: #fff;
  border: 0 none;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.3;
  -webkit-appearance: none;
  -moz-appearance:    none;
  appearance:         none;
  justify-content: center;
  align-items: center;
  flex: 0 0 160px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.15);
  color: #FFFFFF;
  background: linear-gradient( 160deg, rgba(244, 92, 67, 0.7) -200%, #EA5555  200%);
  opacity: .95;
  &:hover {
    transition: all 60ms ease;
    opacity: .8;
  }
`;

const LoginForm = ({
    handleSubmit,
    values,
    touched,
    errors,
    setFieldTouched,
    setFieldValue,
    type,
  }) => {
    return (
      <LoginFormStyled id="login" onSubmit={handleSubmit}>
        <StyledFormField
          field={getField('login')}
          values={values}
          errors={errors}
          touched={touched}
          setFieldTouched={setFieldTouched}
          setFieldValue={setFieldValue}
        />
        <StyledFormField
          field={getField('password')}
          values={values}
          errors={errors}
          touched={touched}
          setFieldTouched={setFieldTouched}
          setFieldValue={setFieldValue}
        />
      </LoginFormStyled>
    );
  };
  
  LoginForm.propTypes = {
    type: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    setFieldTouched: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
  };

const Login = ({
    values,
    isSubmitting,
    isValid,
    dirty,
    handleSubmit,
    handleReset,
    setFieldTouched,
    setFieldValue,
    isCancelDialogOpen,
    showCancelDialog,
    cancel,
    requestCancel,
    ...props
  }) => (
    <Content>
      <Container top='' width='350px'>
          <Logo width={200} />
          <LoginForm
              type="add"
              handleSubmit={handleSubmit}
              values={values}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              {...props}
          />
          <ButtonContainer>
            <LinkStyled to={`/register`}>
              Register
            </LinkStyled>
            <LinkStyled to={`/home`}>
              Login
            </LinkStyled>
          </ButtonContainer>
      </Container>
      <FacebookLogin />
      <GoogleLogin />
    </Content>
);

export default compose(
  withFormik({
    handleSubmit: (
      {
        login,
      },
      { props },
    ) => {
      console.log('Login')
    },
    validationSchema: getValidationSchema(),
    mapPropsToValues: () => ({
      ...defaultValues,
    }),
  }),
)(Login);
