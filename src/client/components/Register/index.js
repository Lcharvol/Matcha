import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withFormik } from 'formik';
import { compose } from 'ramda';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Logo, Container, InputButton, ErrorsContainer } from '../widgets';
import { reqRegister } from '../../request';
import { FormField } from '../../fields';
import { getValidationSchema, defaultValues, getField } from '../../forms/register';
import { errorRegister, resetRegisterErrors } from '../../actions/registerErrors';
import { getRegisterErrors } from '../../selectors/registerErrors';
import { push } from '../../history';

const Content = styled.div`
  position:relative;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width:100%;
  min-height:100vh;
`;

const RegisterFormStyled = styled.form`
  position:relative;
  display: grid;
  margin: auto;
  margin-top: 25px;
  margin-bottom: 25px;
  width: 90%;
  grid-gap: 20px;
  grid-auto-columns: calc(100% - 20px);
  grid-auto-rows: minmax(100px, auto);
  grid-template-areas: 'login' 'email' 'firstname' 'lastname' 'password' 'age' 'sexe';
  @media (min-width: 800px) {
    grid-auto-columns: calc(50% - 10px);
    grid-template-areas: 'login email' 'firstname lastname'
      'password password' 'age sexe';
  }
`;

const StyledFormField = styled(FormField)`
  grid-area: ${({ field }) => field.name};
`;

const ContainerStyled = styled(Container)`
  margin-top:45px;
  margin-bottom:45px;
  transition: all 0.3s ease-in;
  width:90%;
  @media (min-width: 800px) {
    width:700px;
  }
`;

const ButtonContainer = styled.div`
  position:relative;
  display:grid;
  margin: auto;
  width: 90%;
  margin-top:25px;
  margin-bottom:35px;
  grid-gap: 25px;
  grid-auto-columns: minmax(150px, auto);
  grid-template-areas: 'login inputbutton';
  @media (max-width: 800px) {
    grid-template-areas: 'login' 'inputbutton';
  }
`;

const LinkStyled = styled(Link)`
  grid-area: login;
  padding: 12px 12px;
  cursor: pointer;
  user-select: none;
  transition: all 60ms ease-in-out;
  text-align: center;
  white-space: nowrap;
  text-decoration: none !important;
  text-transform: none;
  text-transform: capitalize;
  color: #fff;
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
    color: #fff;
  }
  &:active {
    transition: all 60ms ease;
    box-shadow: inset 5px 5px 2px rgba(0, 0, 0, 0.2);
  }
`;


const RegisterForm = ({
    handleSubmit,
    values,
    touched,
    errors,
    setFieldTouched,
    setFieldValue,
    type,
  }) => {
    return (
      <RegisterFormStyled id="register" onSubmit={handleSubmit}>
        <StyledFormField
          field={getField('login')}
          values={values}
          errors={errors}
          touched={touched}
          setFieldTouched={setFieldTouched}
          setFieldValue={setFieldValue}
        />
        <StyledFormField
          field={getField('email')}
          values={values}
          errors={errors}
          touched={touched}
          setFieldTouched={setFieldTouched}
          setFieldValue={setFieldValue}
        />
        <StyledFormField
          field={getField('firstname')}
          values={values}
          errors={errors}
          touched={touched}
          setFieldTouched={setFieldTouched}
          setFieldValue={setFieldValue}
        />
        <StyledFormField
          field={getField('lastname')}
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
          type="password"
        />
        <StyledFormField
          field={getField('age')}
          values={values}
          errors={errors}
          touched={touched}
          setFieldTouched={setFieldTouched}
          setFieldValue={setFieldValue}
        />
        <StyledFormField
          field={getField('sexe')}
          values={values}
          errors={errors}
          touched={touched}
          setFieldTouched={setFieldTouched}
          setFieldValue={setFieldValue}
        />
      </RegisterFormStyled>
    );
  };

  RegisterForm.propTypes = {
    type: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    setFieldTouched: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
  };

const Register= ({
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
    registerErrors,
    ...props
  }) => (
    <Content>
      <ContainerStyled top='' width='650px'>
          <Logo width={200} />
          <RegisterForm
              type="add"
              handleSubmit={handleSubmit}
              values={values}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              {...props}
          />
          <ErrorsContainer errors={registerErrors}/>
          <ButtonContainer>
            <LinkStyled to={`/login`}>
              Login
            </LinkStyled>
            <InputButton type="submit" form="register" value="Register" />
          </ButtonContainer>
      </ContainerStyled>
    </Content>
);

const actions = { errorRegister, resetRegisterErrors }

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const mapStateToProps = state => ({
  registerErrors: getRegisterErrors(state),
});

const validate = (values, props) => {
  let errors = {};
  if (!values.login) {
    errors.login = 'Required';
  } else if (!/^\w{3,30}$/.test(values.login)) {
    errors.login = 'Invalid login';
  }
  if (!values.lastname) {
    errors.lastname = 'Required';
  } else if (!/^[A-Za-z ]{2,30}$/.test(values.lastname)) {
    errors.lastname = 'Invalid lastname';
  }
  if (!values.firstname) {
    errors.firstname = 'Required';
  } else if (!/^[A-Za-z ]{2,30}$/.test(values.firstname)) {
    errors.firstname = 'Invalid firstname';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (!/^(?=.*[a-zA-Z])(?=.*\W)(?=.*[0-9]).{6,25}$/.test(values.password)) {
    errors.password = 'Invalid password';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.sexe) {
    errors.sexe = 'Required';
  } else if (!/^man|woman$/i.test(values.sexe)) {
    errors.sexe = 'Invalid sexe';
  }
  if (!values.age) {
    errors.age = 'Required';
  } else if (!/^^[2-9][0-9]|[1][8-9]$/i.test(values.age)) {
    errors.age = 'Invalid age';
  }
  return errors;
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFormik({
    handleSubmit: (
      {
        login,
        email,
        firstname,
        lastname,
        password,
        age,
        sexe,
      },
      { props },
    ) => {
      const { errorRegister, resetRegisterErrors } = props;
      reqRegister({login,
        email,
        firstname,
        lastname,
        password,
        age,
        sexe})
        .then(() => {
          // JUST TELL LE EMAUL HAS BEEN SEND
          push('/login');
        }).catch(err =>  errorRegister(err.details || 'Failed to Register'))
    },
    validate: validate,
    validateOnBlur: true,
    mapPropsToValues: () => ({
      ...defaultValues,
    }),
  }),
)(Register);
