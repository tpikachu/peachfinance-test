import makeApp from '../makeApp';

describe('makeApp', () => {
  test('does not blow up', (done) => {
    const app = makeApp();
    const server = app.listen(4101);
    setTimeout(() => {
      expect(() => {
        server.close();
      }).not.toThrow();
      done();
    }, 100);
  });
});
