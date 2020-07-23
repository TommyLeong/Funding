import React from "react";
import ReactDOM from "react-dom";
import ActionButton from "./ActionButton";

import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import renderer from "react-test-renderer";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ActionButton />, div);
});

it("renders button correctly", () => {
  const { getByTestId } = render(
    <ActionButton
      onClick={() => {
        console.log("UnitTest clicked me");
      }}
      buttonName="UnitTest"
    />
  );

  expect(getByTestId("testActionButton")).toHaveTextContent("UnitTest");
});

it("renders button correctly", () => {
  const { getByTestId } = render(
    <ActionButton
      onClick={() => {
        console.log("UnitTest clicked me");
      }}
      buttonName="gg"
    />
  );

  expect(getByTestId("testActionButton")).toHaveTextContent("gg");
});

it("matches snapshot", () => {
  const item = renderer
    .create(
      <ActionButton
        onClick={() => {
          console.log("UnitTest clicked me");
        }}
        buttonName="UnitTest"
      />
    )
    .toJSON();

  expect(item).toMatchSnapshot();
});
