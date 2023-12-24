const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { render } = require("@testing-library/react");
const Movie = require("../../client/src/screens/MoviePortal/Movie/Movie");

let driver;

beforeAll(async () => {
  // Set up Selenium WebDriver for Brave
  const options = new chrome.Options().setBinary(
    "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe"
  ); // Adjust the path based on your Brave installation
  driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();
});

afterAll(async () => {
  // Quit the WebDriver after all tests
  await driver.quit();
});

test("renders all movies and popular movies sections", async () => {
  // Render the component
  const { getByText } = render(<Movie />);

  // Check if the "All Movies" section is rendered
  expect(getByText("All Movies")).toBeInTheDocument();

  // You can continue your testing logic here

  // Example: Navigate to a page using Selenium WebDriver
  await driver.get("http://localhost:3000"); // Assuming your app is running locally on port 3000

  // Example: Wait for an element using Selenium WebDriver
  const popularMoviesTitle = await driver.wait(
    until.elementLocated(By.xpath('//h3[text()="Popular Movies"]')),
    5000
  );
  expect(await popularMoviesTitle.getText()).toBe("Popular Movies");
});
