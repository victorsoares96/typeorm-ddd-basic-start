/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

module.exports = async () => {
  const dbBackupInfoPath = path.join(__dirname, '../../db_backup_info');

  if (!fs.existsSync(dbBackupInfoPath)) {
    throw new Error(
      `Database backup info file not found. Please create one at ${dbBackupInfoPath}`,
    );
  }

  const dbBackupInfo = await fs.promises.readFile(dbBackupInfoPath, 'utf8');

  const [firstLine] = dbBackupInfo.split('\n');
  const [, , backupId] = firstLine.split(' ');

  await fs.promises.unlink(dbBackupInfoPath);

  return backupId;
};
