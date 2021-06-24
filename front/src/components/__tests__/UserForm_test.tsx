import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import store from "../../store";
import UserFormCard from "../organisms/user/UserFormCard";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

it("<UserFormCard>の編集画面スナップショット", () => {
  const tree = renderer
    .create(
      <Provider store={store()}>
        <UserFormCard isEditPage={true} />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("投稿編集ページのレンダリング", () => {
  // const handleOpen = jest.fn();

  const { getByText } = render(
    <Provider store={store()}>
      <UserFormCard isEditPage={true} />
    </Provider>
  );

  // inputのテスト
  const input = screen.getByText("name");
  userEvent.type(input, "test");

  // ボタンのテスト
  const submitButton = getByText("UPDATE!");
  expect(submitButton).toBeInTheDocument();
});
