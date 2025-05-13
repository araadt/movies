import { test, expect } from '@playwright/test';

test('film page has a search bar in the nav bar', async ({ page }) => {
  await page.goto('http://localhost:3000/film/1114894');

  // Expect the nav search bar to be visible
  await expect(page.locator('#nav-bar').getByTestId('search-bar')).toBeVisible();

  // Expect the main search bar to be hidden
  await expect(page.getByTestId('hero').getByTestId('search-bar')).toBeHidden();
});

test('search returns results', async ({ page }) => {
  await page.goto('http://localhost:3000/search/');

  // Wait for the search bar to be visible
  const searchBar = page.getByTestId('hero').getByTestId('search-bar');
  await searchBar.waitFor({ state: 'visible' });

  // Fill in the search input
  const searchInput = searchBar.getByRole('textbox');
  await searchInput.fill('Star Trek');

  // Debug: Log the current URL before submitting
  console.log('URL before submit:', await page.url());

  // Submit the form and wait for navigation with more flexible URL pattern
  try {
    await Promise.all([
      // Wait for navigation to complete
      page.waitForLoadState('networkidle'),
      // Submit the form
      searchInput.press('Enter')
    ]);

    // After navigation, verify we're on the correct page
    const currentUrl = await page.url();
    console.log('Current URL after navigation:', currentUrl);

    if (!currentUrl.includes('/search/Star')) {
      throw new Error(`Expected URL to contain '/search/Star', got: ${currentUrl}`);
    }
  } catch (error) {
    console.log('Navigation error:', error);
    // If navigation fails, try clicking the submit button instead
    const submitButton = searchBar.getByRole('button');
    await Promise.all([
      page.waitForLoadState('networkidle'),
      submitButton.click()
    ]);
  }

  // Debug: Log the current URL to verify we're on the search page
  console.log('Current URL:', await page.url());

  // Debug: Log all elements with data-testid attributes
  // const elements = await page.locator('[data-testid]').all();
  // console.log('Found elements with data-testid:', await Promise.all(elements.map(async el => {
  //   const testId = await el.getAttribute('data-testid');
  //   const isVisible = await el.isVisible();
  //   return { testId, isVisible };
  // })));

  // Wait for the search results container to be visible with retry
  const resultsList = page.getByTestId('search-results-list');
  try {
    await resultsList.waitFor({ state: 'visible', timeout: 10000 });
  } catch (error) {
    console.log('Error waiting for results list:', error);
    // Log the page content for debugging
    console.log('Page content:', await page.content());
    throw error;
  }

  // Expect the search results (server rendered) to have a title
  const header = page.getByTestId('search-results-header');
  await header.waitFor({ state: 'visible', timeout: 300000 });
  await expect(header).toHaveText('I think STAR TREK is a great idea');

  // Expect the query to be in the title
  const queryElement = page.getByTestId('search-results-title-query');
  await queryElement.waitFor({ state: 'visible', timeout: 10000 });
  await expect(queryElement).toHaveText('STAR TREK');

  // Expect there to be a movie section visible
  await expect(page.getByTestId('movie-results-heading')).toBeVisible();

  // Expect there to be a tv section visible
  await expect(page.getByTestId('tv-results-heading')).toBeVisible();

  // Expect the search results to have a list of results
  await expect(page.getByTestId('search-results-list')).toBeVisible();

  // Expect at least one film card to be visible
  await expect(page.getByTestId('media-title').first()).toBeVisible();

  // Expect at least one film card to contain "Star Trek" in its title
  const filmCardTitles = await page.getByTestId('media-title').allTextContents();
  expect(filmCardTitles.some(title => title.toLowerCase().includes('star trek'))).toBeTruthy();
});
