import * as Yup from 'yup';

export const ValidationSchemas = {
    signInSchema: Yup.object().shape({
        email: Yup.string()
          .email('Nieprawidłowy format email')   
      }),
      signUpSchema: Yup.object().shape({
        firstName: Yup.string()
            .min(2, 'Zbyt krótkie imię')
            .max(255, 'Zbyt długie imię'),
        lastName: Yup.string()
            .min(2, 'Zbyt krótkie nazwisko')
            .max(255, 'Zbyt długie nazwisko'),
        email: Yup.string()
          .email('Nieprawidłowy format email'),
        phoneNumber: Yup.string().matches(/^\d{9}$/, 'Nieprawidłowy numer telefonu'),
        password: Yup.string()
          .min(6, 'Zbyt krótkie hasło'),
        confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Hasła muszą się zgadzać'),
      })
}