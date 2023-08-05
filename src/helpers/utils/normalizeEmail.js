const PLUS_ONLY = /\+.*$/;
const PLUS_AND_DOT = /\.|\+.*$/g;
const normalizeableProviders = {
  'gmail.com': {
    cut: PLUS_AND_DOT,
  },
  'googlemail.com': {
    cut: PLUS_AND_DOT,
    aliasOf: 'gmail.com',
  },
  'hotmail.com': {
    cut: PLUS_ONLY,
  },
  'live.com': {
    cut: PLUS_ONLY,
  },
  'outlook.com': {
    cut: PLUS_ONLY,
  },
};

const normalizeEmail = (emailArg) => {
  if (typeof emailArg !== 'string') {
    throw new TypeError('normalize email expects a string');
  }

  const email = emailArg.toLowerCase();
  const emailParts = email.split(/@/);

  if (emailParts.length !== 2) {
    return emailArg;
  }

  let username = emailParts[0];
  let domain = emailParts[1];

  if (domain in normalizeableProviders) {
    if ('cut' in normalizeableProviders[domain]) {
      username = username.replace(normalizeableProviders[domain].cut, '');
    }
    if ('aliasOf' in normalizeableProviders[domain]) {
      domain = normalizeableProviders[domain].aliasOf;
    }
  }

  return `${username}@${domain}`;
};

module.exports = normalizeEmail;
