import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import store from "../../store";
import Layout from "../Layout";
import LoginFormTemplate from "../templates/LoginFormTemplate";

it("<Layout>のスナップショット", () => {
  const tree = renderer
    .create(
      <Provider store={store()}>
        <Layout title="" children="" />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("<LoginFormTemplete>のスナップショット", () => {
  const tree = renderer
    .create(
      <Provider store={store()}>
        <LoginFormTemplate />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
