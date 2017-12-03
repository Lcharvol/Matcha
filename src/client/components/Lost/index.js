import React from 'react';
import styled from 'styled-components';
import { withFormik } from 'formik';
import { browserHistory } from 'react-router'
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router'
import queryString from 'query-string';

import { FormField } from '../../fields';
import { Logo, Container, FacebookLogin, GoogleLogin, InputButton, ErrorsContainer } from '../widgets';
import { getValidationSchema, defaultValues, getField } from '../../forms/lost';
import { reqLostPassword } from '../../request';
import { errorLogin, resetLoginErrors } from '../../actions/loginErrors';
import { getLoginErrors } from '../../selectors/loginErrors';
import { push } from '../../history';
import validate from '../../forms/validator';

const Content = styled.div`
  position:relative;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width:100%;
  min-height:100vh;
  padding-bottom:45px;
`;

const LostFormStyled = styled.form`
  display: grid;
  margin: auto;
  margin-top: 25px;
  margin-bottom: 0px;
  width: 90%;
  grid-gap: 20px;
  grid-auto-columns: minmax(70px, auto);
  grid-auto-rows: minmax(100px, auto);
  grid-template-areas: 'login';
`;

const StyledFormField = styled(FormField)`
  grid-area: ${({ field }) => field.name};
`;

const ButtonContainer = styled.div`
  position:relative;
  display:grid;
  margin: auto;
  width: 90%;
  margin-bottom:30px;
  grid-gap: 25px;
  grid-auto-columns: minmax(150px, auto);
  grid-template-areas: 'inputbutton' 'register';
`;

const ContainerStyled = styled(Container)`
  margin-top:45px;
`;

const LinkStyled = styled(Link)`
  grid-area: register;
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

const LostForm = ({
    handleSubmit,
    values,
    touched,
    errors,
    setFieldTouched,
    setFieldValue,
    type,
  }) => {
    return (
      <LostFormStyled id="lost" onSubmit={handleSubmit}>
        <StyledFormField
          field={getField('login')}
          values={values}
          errors={errors}
          touched={touched}
          setFieldTouched={setFieldTouched}
          setFieldValue={setFieldValue}
        />
      </LostFormStyled>
    );
  };

  LostForm.propTypes = {
    type: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    setFieldTouched: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
  };

const Lost = ({
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
    loginErrors,
    ...props
  }) => (
    <Content>
      <ContainerStyled top='' width='350px' height='550px'>
          <Logo width={200} />
          <LostForm
              type="add"
              id="lost"
              handleSubmit={handleSubmit}
              values={values}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              {...props}
          />
          <ErrorsContainer errors={loginErrors}/>
          <ButtonContainer>
            <LinkStyled to={`/login`}>
              Login
            </LinkStyled>
            <InputButton  type="submit" form='lost' value="Send"/>
          </ButtonContainer>
      </ContainerStyled>
    </Content>
);

const actions = { errorLogin, resetLoginErrors }

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const mapStateToProps = state => ({
  loginErrors: getLoginErrors(state),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFormik({
    handleSubmit: (
      {
        login,
      },
      { props },
    ) => {
      reqLostPassword(login).then((res) => {
        push('/login');
        localStorage.removeItem('matchaToken');
        alert('check your mail');
        resetLoginErrors();
      }).catch(err => {
        alert('NON NON NON oui oui oui il y a encore des alert en 2017');
        errorLogin(err.details || 'Failed to Authenticate');
      })
    },
    validate: validate,
    validateOnBlur: true,
    mapPropsToValues: () => ({
      ...defaultValues,
    }),
  }),
)(Lost);
