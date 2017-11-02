import React from 'react';
import { Header, Container, Avatar } from '../widgets';
import { FormField } from '../../fields';
import { withFormik } from 'formik';
import { connect } from 'react-redux';
import { withHandlers, withStateHandlers } from 'recompose';
import { bindActionCreators } from 'redux';
import { compose } from 'ramda';
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
  grid-template-areas: 'lookingFor' 'bio' 'interest' 'pictures';
  @media (min-width: 700px) {
    grid-template-areas: 'lookingFor' 'bio' 'interest' 'pictures';
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
        <Avatar avatar={user.avatar}/>
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
    mapPropsToValues: () => ({
      ...defaultValues,
    }),
  }),
)(EditProfil);