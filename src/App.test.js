import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import App from "./App";
import Admin from "./Components/Admin";
import MultiPurposeForm from "./Components/MultiPurposeForm";
import RegistrationPage from "./Components/RegistrationPage";
import Sidebar from "./Components/Sidebar";
import UserCard from "./Components/UserCard";
import { UserProvider } from "./useYodlrContext";
import { MemoryRouter } from "react-router-dom";

let user;
beforeEach(() => {
  global.scrollTo = jest.fn();
  jest.spyOn(axios, "get").mockReturnValue({
    data: [
      {
        id: 1,
        email: "kyle@getyodlr.com",
        firstName: "Kyle",
        lastName: "White",
        state: "active",
      },
      {
        id: 2,
        email: "jane@getyodlr.com",
        firstName: "Jane",
        lastName: "Stone",
        state: "active",
      },
      {
        id: 3,
        email: "lilly@getyodlr.com",
        firstName: "Lilly",
        lastName: "Smith",
        state: "pending",
      },
      {
        id: 4,
        email: "fred@getyodlr.com",
        firstName: "Fred",
        lastName: "Miles",
        state: "pending",
      },
      {
        id: 5,
        email: "alex@getyodlr.com",
        firstName: "Alexandra",
        lastName: "Betts",
        state: "pending",
      },
    ],
  });

  user = {
    id: 1,
    email: "kyle@getyodlr.com",
    firstName: "Kyle",
    lastName: "White",
    state: "active",
  };
});

afterEach(() => jest.clearAllMocks());

describe("Admin Component", () => {
  it("Renders the Admin component", async () => {
    render(
      <UserProvider>
        <Admin />
      </UserProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Kyle")).toBeInTheDocument();
    });
  });
});

describe("UserCard Component", () => {
  it("renders the UserCard component", () => {
    render(
      <UserProvider>
        <UserCard user={user} />;
      </UserProvider>
    );

    expect(screen.getByTestId("sidebar")).not.toHaveClass("form-show");

    const updateButton = screen.getByText("Update");
    fireEvent.click(updateButton);

    expect(screen.getByTestId("sidebar")).toHaveClass("form-show");
  });
});

describe("MultiPurposeFormComponent", () => {
  it("renders the MultiPurposeFormComponent - registration version", async () => {
    render(
      <UserProvider>
        <MultiPurposeForm />
      </UserProvider>
    );

    const emailInput = screen.getByPlaceholderText("Enter your email address");
    const firstNameInput = screen.getByPlaceholderText("Enter your first name");
    const lastNameInput = screen.getByPlaceholderText("Enter your last name");
    const submitButton = screen.getByText("Submit");

    // user enters invalid email address and an error message should appear.
    fireEvent.change(emailInput, { target: { value: "me@gmail" } });
    fireEvent.change(firstNameInput, { target: { value: "Kim" } });
    fireEvent.change(lastNameInput, { target: { value: "Reynolds" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Please enter a valid email address.")
      ).toBeInTheDocument();
    });

    // user enters valid data and gets a success message.
    jest.spyOn(axios, "post").mockResolvedValueOnce({
      data: {
        email: "me@gmail.com",
        firstName: "Kim",
        lastName: "Reynolds",
      },
    });
    fireEvent.change(emailInput, { target: { value: "me@gmail.com" } });
    fireEvent.change(firstNameInput, { target: { value: "Kim" } });
    fireEvent.change(lastNameInput, { target: { value: "Reynolds" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Successfully registered!")).toBeInTheDocument();
    });
  });
});

describe("RegistrationPage Component", () => {
  it("renders the RegistrationPage component", () => {
    render(
      <UserProvider>
        <RegistrationPage />
      </UserProvider>
    );

    expect(screen.getByText("Ready to yodel?")).toBeInTheDocument();
  });
});

describe("Sidebar Component", () => {
  it("renders the Sidebar component", () => {
    render(
      <MemoryRouter>
        <Sidebar toggleSidebar={jest.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText("Where do you want to go?")).toBeInTheDocument();
  });
});

describe("App Component", () => {
  it("renders the App component", async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // the burger menu button should open the sidebar when clicked
    const burgerButton = screen.getByTestId("burgerButton");
    expect(screen.getByTestId("sidebarParent")).not.toHaveClass("sidebar-open");
    fireEvent.click(burgerButton);

    expect(screen.getByTestId("sidebarParent")).toHaveClass("sidebar-open");

    // Clicking the link below should take us to the Admin page
    const adminLink = screen.getByText("Admin");
    fireEvent.click(adminLink);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Kyle")).toBeInTheDocument();
    });

    // testing that we are able to update the user while on the Admin page
    const emailInput = screen.getAllByPlaceholderText(
      "Enter your email address"
    )[0];
    const firstNameInput = screen.getAllByPlaceholderText(
      "Enter your first name"
    )[0];
    const lastNameInput = screen.getAllByPlaceholderText(
      "Enter your last name"
    )[0];
    const submitButton = screen.getAllByText("Submit")[0];

    jest.spyOn(axios, "put").mockResolvedValueOnce({
      data: {
        id: 1,
        email: "me@gmail.com",
        firstName: "Kim",
        lastName: "Reynolds",
        state: "active",
      },
    });

    // The old first user was named Kyle, and now we are updating that
    // information to be what is shown below.
    fireEvent.change(emailInput, { target: { value: "me@gmail.com" } });
    fireEvent.change(firstNameInput, { target: { value: "Kim" } });
    fireEvent.change(lastNameInput, { target: { value: "Reynolds" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("me@gmail.com")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByText("Successfully updated user!")
      ).toBeInTheDocument();
    });
  });
});
