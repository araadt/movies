import { test, expect } from '@playwright/test';

test('home page has a title', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Films/);
});

test('home page has a hero section', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    // Expect the hero to be visible.
    await expect(page.getByTestId('hero')).toBeVisible();

    // Expect the hero title to be visible.
    await expect(page.getByTestId('hero-title')).toBeVisible();

    // Expect the hero description to be visible.
    await expect(page.getByTestId('hero-description')).toBeVisible();

    // Expect the hero title to have the text "Andy's Films".
    await expect(page.getByTestId('hero-title')).toHaveText('Andy\'s Films');

    // Expect the hero description to have the text "Browse, search, and discover. Movies and TV for everyone."
    await expect(page.getByTestId('hero-description')).toHaveText('Browse, search, and discover. Movies and TV for everyone.');
});

test('home page only displays a centralized search bar', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    // Expect the nav search bar to be hidden
    await expect(page.locator('#nav-bar').getByTestId('search-bar')).toBeHidden();

    // Expect the main search bar to be visible
    await expect(page.getByTestId('hero').getByTestId('search-bar')).toBeVisible();

    // Expect the main search bar input to have a placeholder
    await expect(page.getByTestId('hero').getByTestId('search-bar').getByRole('textbox')).toHaveAttribute('placeholder', 'Search');

    // Expect the main search bar to have a button
    await expect(page.getByTestId('hero').getByTestId('search-bar-button')).toBeVisible();
});

test('search page only displays a centralized search bar', async ({ page }) => {
    await page.goto('http://localhost:3000/search/');

    // Expect the nav search bar to be hidden
    await expect(page.locator('#nav-bar').getByTestId('search-bar')).toBeHidden();

    // Expect the main search bar to be visible
    await expect(page.getByTestId('hero').getByTestId('search-bar')).toBeVisible();

    // Expect the main search bar input to have a placeholder
    await expect(page.getByTestId('hero').getByTestId('search-bar').getByRole('textbox')).toHaveAttribute('placeholder', 'Search');

    // Expect the main search bar to have a button
    await expect(page.getByTestId('hero').getByTestId('search-bar-button')).toBeVisible();
});