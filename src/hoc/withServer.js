import { ServerConsumer } from "context";

const withServer = (mapServer) => (View) => {
  return (props) => {
    return (
      <ServerConsumer>
        {(server) => {
          const mappedServer = mapServer ? mapServer(server) : server;
          return <View {...props} {...mappedServer} />;
        }}
      </ServerConsumer>
    );
  };
};

export default withServer;
