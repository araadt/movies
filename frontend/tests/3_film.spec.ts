import { test, expect } from '@playwright/test';

test('film page has expected content', async ({ page }) => {
    await page.goto('http://localhost:3000/film/1114894');

    // Wait for the page to load
    await page.waitForLoadState('networkidle');

    // Wait for the hero title to be visible first
    await page.locator('h1[data-title]').waitFor({ state: 'visible', timeout: 10000 });

    // Expect the movie title to be visible and correct
    const titleElement = page.locator('h1[data-title]');
    await expect(titleElement).toBeVisible();
    const titleText = await titleElement.textContent();
    // console.log('Found title text:', titleText); // Debug log
    await expect(titleElement).toHaveText('Star Trek: Section 31');

    // Expect the genres to include "Science Fiction"
    const genresElement = page.getByTestId('media-genres');
    await expect(genresElement).toBeVisible();
    const genresText = await genresElement.textContent();
    expect(genresText?.toLowerCase()).toContain('science fiction');

    // Expect the release date to match its data-title attribute
    const releaseDateElement = page.getByTestId('media-release-date');
    if (await releaseDateElement.isVisible()) {
        const dataTitle = await releaseDateElement.getAttribute('data-title');
        const textContent = await releaseDateElement.textContent();
        expect(textContent?.trim()).toBe(dataTitle?.trim());
    }

    // Wait for the top-level crew details section to load
    await page.getByTestId('top-level-crew-details').waitFor({ state: 'visible', timeout: 10000 });

    // Debug: Log all credit titles found
    // const allCreditTitles = await page.locator('[data-testid="credit-title"]').all();
    // console.log('Found credit titles:', await Promise.all(allCreditTitles.map(el => el.textContent())));

    // Debug: Log all credit roles found
    // const allCreditRoles = await page.locator('[data-testid^="credit-cast-role-"]').all();
    // console.log('Found cast credit roles:', await Promise.all(allCreditRoles.map(async el => {
    //     const testId = await el.getAttribute('data-testid');
    //     const content = await el.textContent();
    //     return { testId, content };
    // })));

    // const allCrewCreditRoles = await page.locator('[data-testid^="credit-crew-role-"]').all();
    // console.log('Found crew credit roles:', await Promise.all(allCrewCreditRoles.map(async el => {
    //     const testId = await el.getAttribute('data-testid');
    //     const content = await el.textContent();
    //     return { testId, content };
    // })));

    // Wait for credits to load - wait for the first instance of the character role in cast details
    await page.locator('#cast-details-1114894').getByTestId('credit-cast-role-philippa-georgiou').first().waitFor({ state: 'visible', timeout: 10000 });

    // Expect credit titles to match their data-title attributes
    const creditTitles = await page.locator('[data-testid="credit-title"]').all();
    for (const creditTitle of creditTitles) {
        const dataTitle = await creditTitle.getAttribute('data-title');
        const textContent = await creditTitle.textContent();
        expect(textContent?.trim()).toBe(dataTitle?.trim());
    }

    // Check for director if it exists
    const directorSection = page.getByTestId('top-level-crew-details').getByTestId('credit-crew-role-director');
    if (await directorSection.isVisible()) {
        const directorContent = await directorSection.textContent();
        expect(directorContent?.toLowerCase()).toContain('olatunde osunsanmi');
    }

    // Expect Michelle Yeoh to be in the cast section
    const michelleYeohRole = page.locator('#cast-details-1114894').getByTestId('credit-cast-role-philippa-georgiou').first();
    await expect(michelleYeohRole).toBeVisible();
    const michelleYeohContent = await michelleYeohRole.textContent();
    expect(michelleYeohContent?.toLowerCase()).toContain('michelle yeoh');

    // Expect a Roddenberry to be listed as an executive producer, it's probably a given that there will be one
    const executiveProducerSection = page.getByTestId('top-level-crew-details').getByTestId('credit-crew-role-executive-producer');
    await expect(executiveProducerSection).toBeVisible();
    const executiveProducerContent = await executiveProducerSection.textContent();
    expect(executiveProducerContent?.toLowerCase()).toContain('roddenberry');
});
