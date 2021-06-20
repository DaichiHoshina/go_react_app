import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import store from "../../store";
import PresentationFormCard from "../organisms/presentation/PresentationFormCard";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// import KeyValuePair from "../organisms/common/KeyValuePair";
import { createShallow } from "@material-ui/core/test-utils";
// import CreateOrEditButton from "../atoms/share/CreateOrEditButton";

configure({ adapter: new Adapter() });
const shallow = createShallow();

it("<PresentationFormCard>の新規作成画面スナップショット", () => {
  const tree = renderer
    .create(
      <Provider store={store()}>
        <PresentationFormCard isEditPage={false} />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("<PresentationFormCard>の編集画面スナップショット", () => {
  const tree = renderer
    .create(
      <Provider store={store()}>
        <PresentationFormCard isEditPage={true} />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

describe("view", () => {
  test("button", () => {
    const wrapper = shallow(
      <Provider store={store()}>
        <PresentationFormCard isEditPage={true} />
      </Provider>
    ); // shallowWrapper取得
    expect(wrapper.find("div").length).toBe(1);
    // expect(wrapper.find(KeyValuePair).length).toBe(1);
  });
});
