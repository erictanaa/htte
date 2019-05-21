const utils = require('../utils');
const os = require('os');

utils.useColors = false;

let stdoutWrite = (process.stdout.write = jest.fn());

afterEach(() => jest.clearAllMocks());

describe('color', function() {
  test('wrap string in color code', function() {
    utils.useColors = true;
    expect(utils.color('title', '%s')).toBe('\u001b[0m%s\u001b[0m');
    utils.useColors = false;
    expect(utils.color('title', '%s')).toBe('%s');
  });
});

function mockUnit(index, state, debug) {
  let unit = {
    session: { state, req: { url: `/p${index}`, body: `req${index}` } },
    ctx: { module: `module${index}`, groups: [`root`, `grp${index}`] },
    describe: `describe${index}`,
    name: `name${index}`,
    metadata: { debug }
  };
  if (state === 'pass') {
    unit.session.res = { body: `res${index}` };
  } else if (state === 'fail') {
    unit.session.err = { parts: ['req', 'body'], message: `err${index}` };
  }
  return unit;
}

describe('speed', function() {
  test('class the speed of unit', function() {
    expect(utils.speed(1001, 1000)).toBe('slow');
    expect(utils.speed(1000, 1000)).toBe('medium');
    expect(utils.speed(501, 1000)).toBe('medium');
    expect(utils.speed(500, 1000)).toBe('fast');
  });
});

describe('epilogue', function() {
  test('list statistics', function() {
    let units = [
      mockUnit(1, 'pass'),
      mockUnit(2, 'fail'),
      mockUnit(3, 'pass'),
      mockUnit(4, 'skip'),
      mockUnit(5, 'pass', true),
      mockUnit(6, 'fail', true),
      mockUnit(7, 'skip', true)
    ];
    utils.epilogue({ units, duration: 4000 });
    expect(stdoutWrite.mock.calls.join('')).toMatchSnapshot();
  });
});
