import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import store from "../../store";
import Layout from "../Layout";
import SideMenuArea from "../templates/SideMenuArea";

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

it("<SideMenuArea>のスナップショット", () => {
  const tree = renderer
    .create(
      <Provider store={store()}>
        <SideMenuArea />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
