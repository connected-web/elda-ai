var tempDir = process.cwd() + '/temp';

module.exports = {
  memory: {
    local: tempDir,
    remote: 'git@github.com:connected-web/remote-test.git',
    user: {
      name: 'Elda Test',
      email: 'elda-ai@mkv25.net'
    }
  }
};
