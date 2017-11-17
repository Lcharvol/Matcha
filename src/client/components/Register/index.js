import React from 'react';
import { Logo, Container, InputButton} from '../widgets';
import styled from 'styled-components';
import { FormField } from '../../fields';
import { withFormik } from 'formik';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'ramda';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { getValidationSchema, defaultValues, getField } from '../../forms/register';

const Content = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width:100%;
  height:100vh;
`;

const RegisterFormStyled = styled.form`
    display: grid;
    margin: auto;
    margin-top: 25px;
    margin-bottom: 25px;
    width: 90%;
    grid-gap: 20px;
    grid-auto-columns: minmax(70px, auto);
    grid-auto-rows: minmax(70px, auto);
    grid-template-areas: 'login' 'email' 'firstname' 'lastname' 'password' 'age' 'sexe';
    @media (min-width: 700px) {
      grid-template-areas: 'login email' 'firstname lastname'
        'password password' 'age sexe';
    }
`;

const StyledFormField = styled(FormField)`
  grid-area: ${({ field }) => field.name};
`;

const ContainerStyled = styled(Container)`
  width:350px;
  @media (min-width: 700px) {
    width:550px;
  }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (min-width: 700px) {
      margin: 25px;
    }
    margin: 18px;
`;

const LinkStyled = styled(Link)`
  padding: 12px 12px;
  max-width:120px;
  min-width:120px;
  @media (min-width: 700px) {
    max-width:215px;
    min-width:215px;
  }
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
          field={getField('email')}
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
    ...props
  }) => (
    <Content>
      <ContainerStyled top='' width='350px'>
          <Logo width={200} />
          <RegisterForm
              type="add"
              handleSubmit={handleSubmit}
              values={values}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              {...props}
          />
          <ButtonContainer>
            <LinkStyled to={`/login`}>
              Login
            </LinkStyled>
            <InputButton type="submit" form="register">
            </InputButton>
          </ButtonContainer>
      </ContainerStyled>
    </Content>
);

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default compose(
  connect(null, mapDispatchToProps),
  withFormik({
    handleSubmit: (
      {
        login,
        email,
      },
      { props },
    ) => {
      // reqRegister({});
    },
    validationSchema: getValidationSchema(),
    mapPropsToValues: () => ({
      ...defaultValues,
    }),
  }),
)(Register);
