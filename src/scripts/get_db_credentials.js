/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

module.exports = async () => {
  const databaseCredentialsUrlPath = path.join(
    __dirname,
    '../../database_credentials',
  );

  if (!fs.existsSync(databaseCredentialsUrlPath)) {
    throw new Error(
      `Database credentials file not found. Please create one at ${databaseCredentialsUrlPath}`,
    );
  }

  const databaseCredentialsUrl = await fs.promises.readFile(
    databaseCredentialsUrlPath,
    'utf8',
  );

  const databaseCredentials = databaseCredentialsUrl
    .toString()
    .trim()
    .split('\n')
    .find(line => line.includes('dbname'));

  if (!databaseCredentials) {
    throw new Error('Could not find database credentials');
  }

  const databaseCredentialsWithNamesChanged = databaseCredentials
    .replace('dbname', 'DATABASE')
    .replace('host', 'HOST')
    .replace('port', 'PG_PORT')
    .replace('user', 'USERNAME')
    .replace('password', 'PASSWORD');

  const removeQuotationMarks = databaseCredentialsWithNamesChanged.replace(
    /['"]/g,
    '',
  );

  const databaseCredentialsParsed = removeQuotationMarks.trim();

  // Remove old database credentials
  await fs.promises.unlink(databaseCredentialsUrlPath);

  // Write new database credentials
  await fs.promises.writeFile(
    databaseCredentialsUrlPath,
    databaseCredentialsParsed,
    'utf8',
  );

  return databaseCredentialsParsed;
};
