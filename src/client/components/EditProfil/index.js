import React from 'react';
import { Header, Container, Avatar } from '../widgets';
import { FormField } from '../../fields';
import { withFormik } from 'formik';
import { connect } from 'react-redux';
import { withHandlers, withStateHandlers } from 'recompose';
import { bindActionCreators } from 'redux';
import { compose } from 'ramda';
import { Link } from 'react-router';
import { getValidationSchema, defaultValues, getField } from '../../forms/editProfil';
import styled from 'styled-components';

const EditProfilFormStyled  = styled.form`
  display: grid;
  margin: auto;
  margin-top: 25px;
  margin-bottom: 25px;
  width: 90%;
  grid-gap: 20px;
  grid-auto-columns: minmax(70px, auto);
  grid-auto-rows: minmax(70px, auto);
  grid-template-areas: 'sexe' 'lookingFor' 'bio' 'interest' 'pictures';
  @media (min-width: 700px) {
    grid-template-areas: 'sexe' 'lookingFor' 'bio' 'interest' 'pictures';
  }
`;

const FormHeader = styled.div`
  display:flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  padding:25px;
`;

const ContainerStyled = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  margin-top:25px;
  color:rgb(25,25,25);
`;

const Title = styled.p`
  margin: 15px;
  color:#EA5555;
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
          field={getField('sexe')}
          values={values}
          errors={errors}
          touched={touched}
          setFieldTouched={setFieldTouched}
          setFieldValue={setFieldValue}
        />
       <StyledFormField
          field={getField('lookingFor')}
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
        <StyledFormField
          field={getField('interest')}
          values={values}
          errors={errors}
          touched={touched}
          setFieldTouched={setFieldTouched}
          setFieldValue={setFieldValue}
        />
        <StyledFormField
          field={getField('pictures')}
          values={values}
          errors={errors}
          touched={touched}
          setFieldTouched={setFieldTouched}
          setFieldValue={setFieldValue}
        />
    </EditProfilFormStyled >
  );
};

const EditProfil= ({
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
}) => (
  <div>
    <Header />
    <ContainerStyled>
      <FormHeader>
        <Avatar user={user}/>
        <Title>{`${user.firstName} ${user.lastName}`}</Title>
      </FormHeader>
      <EditProfilForm
          type="add"
          handleSubmit={handleSubmit}
          values={values}
          setFieldTouched={setFieldTouched}
          setFieldValue={setFieldValue}
          {...props}
      />
      <ButtonContainer>
          <LinkStyled to={'/'}>
            Update
          </LinkStyled>
        </ButtonContainer>
    </ContainerStyled>
  </div>
);

const mapStateToProps = state => ({
  user: state.user,
});

const actions = {
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFormik({
    handleSubmit: (
      {
        login,
      },
      { props },
    ) => {
      console.log('Edit Profil')
    },
    validationSchema: getValidationSchema(),
    mapPropsToValues: ({ user}) => ({
      sexe: user.sexe,
      lookingFor: user.sexualOrientation,
      bio: user.bio,
      interest: user.interest,
    }),
  }),
)(EditProfil);