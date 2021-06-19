import React from "react";
import renderer from "react-test-renderer";
import UserFormCard from "../organisms/user/UserFormCard";

it("renders correctly", () => {
  const tree = renderer.create(<UserFormCard />).toJSON();
  expect(tree).toMatchSnapshot();
});

// test('Link changes the class when hovered', () => {
//   renderer.create(
//     <Layout title="" children=""/>,
//   );

// let container: HTMLDivElement
// beforeEach(() => {
//     document.body.appendChild(container = document.createElement('div'))
// })
// afterEach(() => {
//     document.body.removeChild(container)
// })

// it('should Stay Calm', () => {
//     render(<Layout title="" children=""/>, container)
//     expect(container.innerHTML).toMatchSnapshot()
// })

// it('should あばばばば', () => {
//     act(() => {
//         render(<Ababababa />, container)
//     })
//     act(() => {
//         container.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))
//         container.children[0].dispatchEvent(new MouseEvent('mouseover', { bubbles: true, cancelable: true }))
//     })
//     expect(container.innerHTML).toMatchSnapshot()
// })

// it('should あばっ', () => {
//     act(() => {
//         render(<Ababababa />, container)
//     })
//     act(() => {
//         container.children[0].dispatchEvent(new MouseEvent('mouseout', { bubbles: true }))
//         container.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }))
//     })
//     expect(container.innerHTML).toMatchSnapshot()
// })
// })
