import makeApp from './makeApp';

const port = 4100;

const app = makeApp();

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
