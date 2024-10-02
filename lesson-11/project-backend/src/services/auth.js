import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import { randomBytes } from "crypto";

import UserCollection from "../db/models/User.js";
import SessionCollection from "../db/models/Session.js";

import sendEmail from "../utils/sendEmail.js";
import { env } from "../utils/env.js";

import {
  accessTokenLifeTime,
  refreshTokenLifeTime,
} from "../constants/users.js";

export const createSession = () => {
  const accessToken = randomBytes(30).toString("base64");
  const refreshToken = randomBytes(30).toString("base64");
  const accessTokenValidUntil = new Date(Date.now() + accessTokenLifeTime);
  const refreshTokenValidUntil = new Date(Date.now() + refreshTokenLifeTime);

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  };
};

const appDomain = env("APP_DOMAIN");

export const signup = async (payload) => {
  const { email, password } = payload;
  const user = await UserCollection.findOne({ email });

  if (user) {
    throw createHttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const data = await UserCollection.create({
    ...payload,
    password: hashPassword,
  });

  delete data._doc.password;

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${appDomain}/auth/verify?token=">Click verify email</a>`,
  };
  await sendEmail(verifyEmail);

  return data._doc;
};

export const signin = async (payload) => {
  const { email, password } = payload;

  const user = await UserCollection.findOne({ email });
  if (!user) {
    throw createHttpError(401, "Email or password invalid");
  }

  if (!user.verify) {
    throw createHttpError(401, "Email not verify");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw createHttpError(401, "Email or password invalid");
  }

  await SessionCollection.deleteOne({ userId: user._id });

  const sessionData = createSession();

  const userSession = await SessionCollection.create({
    userId: user._id,
    ...sessionData,
  });

  return userSession;
};

export const findSessionByAccessToken = (accessToken) =>
  SessionCollection.findOne({ accessToken });

export const refreshSession = async ({ refreshToken, sessionId }) => {
  const oldSession = await SessionCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!oldSession) {
    throw createHttpError(401, "Session not found");
  }

  if (new Date() > oldSession.refreshTokenValidUntil) {
    throw createHttpError(401, "Session token expired");
  }

  await SessionCollection.deleteOne({ _id: sessionId });

  const sessionData = createSession();

  const userSession = await SessionCollection.create({
    userId: oldSession._id,
    ...sessionData,
  });

  return userSession;
};

export const signout = async (sessionId) => {
  await SessionCollection.deleteOne({ _id: sessionId });
};

export const findUser = (filter) => UserCollection.findOne(filter);
