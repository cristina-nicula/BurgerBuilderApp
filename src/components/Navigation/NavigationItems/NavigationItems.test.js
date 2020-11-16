import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavigationItem from "./NavigationItem/NavigationItem";
import NavigationItems from "./NavigationItems";

configure({ adapter: new Adapter() });

describe("<NavigationItems />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });
  it("should render two <NavigationItem /> elements if not autheticated", () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it("should render three <NavigationItem /> elements if autheticated", () => {
    wrapper.setProps({ isAutheticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it("an exact logout button", () => {
    wrapper.setProps({ isAutheticated: true });

    expect(
      wrapper.contains(<NavigationItem link="/logout">Log out</NavigationItem>)
    ).toEqual(true);
  });
});
