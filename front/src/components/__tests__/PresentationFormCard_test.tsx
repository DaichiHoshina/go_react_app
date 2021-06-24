import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import store from "../../store";
import PresentationFormCard from "../organisms/presentation/PresentationFormCard";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

test("投稿編集ページのレンダリング", () => {
  // const handleOpen = jest.fn();

  const { getByText } = render(
    <Provider store={store()}>
      <PresentationFormCard isEditPage={true} />
    </Provider>
  );

  // inputのテスト
  const input = screen.getByText("discription");
  userEvent.type(input, "test");

  // ボタンのテスト
  const submitButton = getByText("UPDATE!");
  expect(submitButton).toBeInTheDocument();
});

test("新規投稿ページのレンダリング", () => {
  const { getByText } = render(
    <Provider store={store()}>
      <PresentationFormCard isEditPage={false} />
    </Provider>
  );

  // inputのテスト
  const input = screen.getByText("discription");
  userEvent.type(input, "test");

  // ボタンが押下可能かどうか
  const submitButton = getByText("CREATE!");
  expect(submitButton).toBeInTheDocument();
});
