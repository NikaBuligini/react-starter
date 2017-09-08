// @flow

const DEFAULT_LANGUAGE = 'en';
const ALLOWED_LANGUAGES = ['en', 'ka'];
const COOKIE_MAX_AGE = 1000 * 3600 * 24 * 7; // 7 days

export default function validateLocale(
  req: express$Request,
  res: express$Response,
  next: Function,
) {
  const { locale } = req.cookies;

  if (!locale || ALLOWED_LANGUAGES.indexOf(locale) === -1) {
    req.cookies.locale = DEFAULT_LANGUAGE;
    res.cookie('locale', DEFAULT_LANGUAGE, {
      maxAge: COOKIE_MAX_AGE,
    });
  }

  next();
}
