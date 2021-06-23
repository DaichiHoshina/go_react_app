import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import store from "../../store";
import Layout from "../Layout";

it("<Layout>のスナップショット", () => {
  const tree = renderer
    .create(
      <Provider store={store()}>
        <Layout title="" />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
