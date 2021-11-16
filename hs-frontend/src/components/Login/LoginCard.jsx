  import { Formik } from 'formik'
  import LoginForm from './LoginForm';
  import { AuthContext } from '../../contexts/AuthContext'
  import { useContext } from 'react';
  
  const LoginCard = () => {
    const {signIn} = useContext(AuthContext)

    const setSubmit = async (values, actions) =>
    {
        if(await signIn(values.email,values.password)){
            console.log('login successful')
        }else{
            console.log('login failed')
        }
        actions.setSubmitting(false);
    }
    
    return (
        <Formik 
        initialValues = {{
            email: '',
            password: ''
        }}
        onSubmit = {setSubmit}
        >
        {(props) => (
            <LoginForm {...props} />
        )}
        </Formik>
        )
}
  export default LoginCard;
  