import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer";
import { withRouter } from "../../test/utils";
import { Route } from "react-router-dom";
import SearchHeader from "../SearchHeader";

describe("SearchHeader", () => {
  it("renders correctly", () => {
    const component = renderer.create(
      withRouter(<Route path="/" element={<SearchHeader />} />)
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("renders with keyword correctly", async () => {
    render(
      withRouter(
        <Route path="/:keyword" element={<SearchHeader />} />,
        "/classic"
      )
    );
    expect(screen.getByDisplayValue("classic")).toBeInTheDocument();
  });

  it("navigates to results page on search button click", () => {
    const searchKeyword = "fake-keyword";

    render(
      withRouter(
        <>
          <Route path="/home" element={<SearchHeader />} />
          <Route
            path={`/videos/${searchKeyword}`}
            element={<p>{`Search result for ${searchKeyword}`}</p>}
          />
        </>,
        "/home"
      )
    );

    const searchInput = screen.getByRole("textbox");
    const searchButton = screen.getByRole("button");

    userEvent.type(searchInput, searchKeyword);
    userEvent.click(searchButton);

    expect(
      screen.getByText(`Search result for ${searchKeyword}`)
    ).toBeInTheDocument();
  });
});
