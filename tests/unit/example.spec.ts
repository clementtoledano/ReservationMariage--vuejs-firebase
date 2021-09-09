import { shallowMount } from "@vue/test-utils";
import Home from "@/views/Home.vue";

let wrapper = shallowMount(Home);

describe("Home", () => {
  it("render div class home", async () => {
    const home = wrapper.find(".home");

    expect(home.text()).toBe("exemple");
  });
});
