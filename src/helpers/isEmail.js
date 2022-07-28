const EMAIL_REG_EXP =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

const isEmail = (text) => EMAIL_REG_EXP.test(text);

export default isEmail;
