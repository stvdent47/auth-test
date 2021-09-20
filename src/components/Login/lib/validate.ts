interface ValidateValues extends React.FormEvent<Element> {
  username: string;
  password: string;
}
interface ValidateErrors {
  username?: string;
  password?: string;
}

export const validate = (values: ValidateValues): ValidateErrors => {
  const errors: ValidateErrors = {};
  if (!values.username) {
    errors.username = 'Необходимо заполнить!';
  }
  if (!values.password) {
    errors.password = 'Необходимо заполнить!';
  }

  return errors;
};
