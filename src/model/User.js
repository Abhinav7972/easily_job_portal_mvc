import crypto from 'crypto';

const users = [];

const hashPassword = (password, salt) =>
  crypto.scryptSync(password, salt, 64).toString('hex');

export const createUser = ({ name, email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();
  if (findByEmail(normalizedEmail)) return null;

  const salt = crypto.randomBytes(16).toString('hex');
  const user = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: normalizedEmail,
    passwordHash: hashPassword(password, salt),
    salt,
  };
  users.push(user);
  return toSafeUser(user);
};

export const findByEmail = (email) =>
  users.find((user) => user.email === email.trim().toLowerCase());

export const findById = (id) => users.find((user) => user.id === id);

export const getAllUsers = () => users.map(toSafeUser);

export const verifyCredentials = (email, password) => {
  const user = findByEmail(email);
  if (!user) return null;
  const suppliedHash = hashPassword(password, user.salt);
  const matches = crypto.timingSafeEqual(
    Buffer.from(suppliedHash, 'hex'),
    Buffer.from(user.passwordHash, 'hex'),
  );
  return matches ? toSafeUser(user) : null;
};

export const toSafeUser = ({ passwordHash, salt, ...user }) => user;
