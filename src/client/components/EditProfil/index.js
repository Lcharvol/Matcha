import React, { Component } from 'react';
import { withFormik } from 'formik';
import { isEmpty, isNil, upperFirst } from 'lodash';
import { connect } from 'react-redux';
import { withHandlers, withStateHandlers } from 'recompose';
import { bindActionCreators } from 'redux';
import { compose, map, join } from 'ramda';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router';

import { Header, Container, Avatar, InputButton } from '../widgets';
import { FormField } from '../../fields';
import { reqUpdateUser, reqDeleteUser } from '../../request';
import { getValidationSchema, defaultValues, getField } from '../../forms/editProfil';
import { getUser } from '../../selectors/user';
import validate from '../../forms/validator';

const MainContainer = styled.div`
  display:flex;
  flex-direction:column;
  min-height:100vh;
  background-color:rgb(240,240,240);
`;

const Content = styled.div`
  min-height:100%;
  width:100%;
  margin-top:65px;
  background-color:white;
  border-radius:0px;
  display: grid;
  grid-auto-columns: minmax(70px, auto);
  grid-auto-rows: minmax(70px, auto);
  grid-template-areas: 'profil' 'suggestion';
`;

const EditProfilFormStyled  = styled.form`
  display: grid;
  margin: auto;
  margin-top: 25px;
  margin-bottom: 25px;
  width: 80%;
  grid-gap: 20px;
  grid-auto-columns: minmax(70px, auto);
  grid-auto-rows: minmax(70px, auto);
  grid-template-areas: 'firstname' 'lastname' 'email' 'sexe' 'zipcode' 'sexualorientation' 'age' 'interest' 'bio';
  @media (min-width: 700px) {
    grid-template-areas: 'firstname lastname' 'email sexe' 'sexualorientation age' 'zipcode interest' 'bio bio';
  }
`;

const HeaderContainer = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex:1;
  min-height:300px;
`;

const Name = styled.p`
  font-size: 1.3em;
  color:white;
  margin-top:20px;
`;

const ProfilHeader = styled.div`
  display:flex;
  flex-direction:wrap;
  justify-content: center;
  align-items: center;
  width:100%;
  background:${({ background }) => `url(${background}.jpg)`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Title = styled.p`
  margin: 15px;
  color:#EA5555;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
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
  box-shadow: 2px 5px 10px rgba($dark, .1);
  &:hover {
  transition: all 60ms ease;
  opacity: .85;
  }
  color: #FFFFFF;
  background: #EA5555;
`;

const StyledFormField = styled(FormField)`
  grid-area: ${({ field }) => field.name};
`;

const LostLink = styled(Link)`
  margin:auto;
  color: rgba(244, 92, 67, 0.85);
`;

const EditProfilForm = ({
  handleSubmit,
  values,
  touched,
  errors,
  setFieldTouched,
  setFieldValue,
  type,
}) => {
  return (
    <EditProfilFormStyled  id="editProfil" onSubmit={handleSubmit}>
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
        field={getField('zipcode')}
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
      <StyledFormField
        field={getField('sexualorientation')}
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
        field={getField('interest')}
        values={values}
        errors={errors}
        touched={touched}
        setFieldTouched={setFieldTouched}
        setFieldValue={setFieldValue}
      />
      <StyledFormField
        field={getField('bio')}
        values={values}
        errors={errors}
        touched={touched}
        setFieldTouched={setFieldTouched}
        setFieldValue={setFieldValue}
      />
    </EditProfilFormStyled >
  );
};

const handleDeleteAccount =  (evt) => {
  evt.preventDefault();
  const resp = confirm("Press Ok if you sure you want to delete your account");
  if (resp) {
    reqDeleteUser()
      .then(resp => {
        localStorage.removeItem('matchaToken');
        location.reload();
      }).catch(err => {
        console.log('err');
      });
  }
};
class EditProfil extends Component {
  render () {
    const {
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
      user,
      ...props
    } = this.props;

    if(!user) return null;
    return (
      <MainContainer>
        <Header
          displaySearchBar={false}
        />
        <Content>
            <ProfilHeader background={user.pictures[0]}>
              <HeaderContainer>
                  <Avatar user={user}/>
                  <Name>{`${upperFirst(user.firstname)} ${upperFirst(user.lastname)}`}</Name>
              </HeaderContainer>
            </ProfilHeader>
            <EditProfilForm
              type="edit"
              handleSubmit={handleSubmit}
              values={values}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              {...props}
            />
            <LostLink to={`/lost`}>Change my password</LostLink>
            <LostLink onClick={handleDeleteAccount}>Delete My account</LostLink>
            <ButtonContainer>
              <InputButton type="submit" form="editProfil" value="Update" />
            </ButtonContainer>
        </Content>
      </MainContainer>
    );
  };
};

const mapStateToProps = state => ({
  user: getUser(state),
});

const actions = {};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const formatInterest = compose(
  map(tag => tag.value),
);

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFormik({
    handleSubmit: (user,
      { props },
    ) => {
     const {
       bio,
       age,
       email,
       firstname,
       interest,
       sexe,
       lastname,
       lookingFor,
       sexualorientation,
       city,
       zipcode,
      } = user;
      reqUpdateUser(({
        bio,
        age,
        email,
        firstname,
        sexe,
        interest: formatInterest(interest).join() || '',
        lastname,
        lookingFor,
        sexualorientation,
        city,
        postal_code: zipcode,
      })).then((res) => {
        location.assign('/profil');
      }).catch(err => {
      })
    },
    validate: validate,
    validateOnBlur: true,
    mapPropsToValues: ({ user = {} }) => {
      const tags = user.interest;
      if ( isEmpty(user) || isNil(user)) {
        return ({});
      }
      return ({
      ...user,
      firstname: user.firstname,
      lastname: user.lastname,
      sexe: user.sexe,
      lookingFor: user.sexualorientation,
      bio: user.bio || '',
      city: user.city,
      zipcode: user.postal_code,
      interest: map(tag => ({ value: tag, label: tag }), tags),
    })
  },
  }),
)(EditProfil);
