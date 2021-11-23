  import { Formik } from 'formik'
  import RegisterForm from './RegisterForm';
  import { AuthContext } from '../../contexts/AuthContext'
  import { useContext } from 'react';
  
  const RegisterCard = () => {
    const {signUp} = useContext(AuthContext)

    const setSubmit = async (values, actions) =>
    {
        if(await signUp(values.firstName, values.lastName, values.email, values.phoneNumber, values.password)){
            console.log('registration successful')
        }else{
            console.log('registration failed')
        }
        actions.setSubmitting(false);
        console.log(values)
    }
    
    return (
        <Formik 
        initialValues = {{
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            password: '',
            confirmPassword: ''
        }}
        onSubmit = {setSubmit}
        >
        {(props) => (
            <RegisterForm {...props} />
        )}
        </Formik>
        )
}
  export default RegisterCard;
  