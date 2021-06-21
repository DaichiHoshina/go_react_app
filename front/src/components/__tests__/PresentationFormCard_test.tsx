import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import store from "../../store";
import PresentationFormCard from "../organisms/presentation/PresentationFormCard";
import { render, screen } from "@testing-library/react";

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

describe("button", () => {
  test("ボタンのテスト", () => {
    render(
      <Provider store={store()}>
        <PresentationFormCard isEditPage={true} />
      </Provider>
    );

    screen.getByText("UPDATE!");
  });
});

// describe("view", () => {
//   it("button", () => {
//     const testMock = jest.fn();

//     const wrapper = render(<Button />); // shallowWrapper取得

//     wrapper.setProps({ formik: testMock });

//     expect(wrapper.find("button").length).toBe(1);
//     // expect(wrapper.find(KeyValuePair).length).toBe(1);
//   });
// });
