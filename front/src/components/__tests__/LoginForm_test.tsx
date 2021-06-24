import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import store from "../../store";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginFormTemplate from "../templates/LoginFormTemplate";

it("<LoginTemplate>の新規作成画面スナップショット", () => {
  const tree = renderer
    .create(
      <Provider store={store()}>
        <LoginFormTemplate />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("ユーザー登録のレンダリングとボタン押下時", () => {
  render(
    <Provider store={store()}>
      <LoginFormTemplate />
    </Provider>
  );

  const emailInput = screen.getByText("email");
  userEvent.type(emailInput, "testtest@test.jp");

  const passwordInput = screen.getByText("password");
  userEvent.type(passwordInput, "test1234");

  const submit = screen.getByTestId("form");
  expect(submit).toHaveClass("Mui-disabled");
});
