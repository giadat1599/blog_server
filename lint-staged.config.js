/**
 * @type {import('lint-staged').Configuration}
 */
module.exports = {
  '*.ts': ['npm run lint', 'npm run lint:fix', 'git add .']
}
