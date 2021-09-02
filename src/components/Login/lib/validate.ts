interface validateValues extends React.FormEvent<Element> {
  username: string;
  password: string;
}
interface validateErrors {
  username?: string;
  password?: string;
}

const validate = (values: validateValues): validateErrors => {
  const errors: validateErrors = {};
  if (!values.username) {
    errors.username = 'Необходимо заполнить!';
  }
  if (!values.password) {
    errors.password = 'Необходимо заполнить!';
  }

  return errors;
};

export default validate;
