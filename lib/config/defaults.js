module.exports = {
  memory: {
    type: 'git',
    remote: 'git@github.com:elda-ai/memory-training.git',
    local: process.cwd() + '/memory',
    user: {
      name: 'elda-ai',
      email: 'elda-ai@mkv25.net'
    }
  }
};
