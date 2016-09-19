import Server from 'socker.io';

export default function startServer() {
  const io = new Server().attach(8090);
}
