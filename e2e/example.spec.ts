import { test, expect, _electron, ElectronApplication } from '@playwright/test';

// let electronApp: Awaited<ReturnType<typeof _electron.launch>>
let electronApp: ElectronApplication
let mainPage: Awaited<ReturnType<typeof electronApp.firstWindow>>


test.beforeEach(async () => {
  electronApp = await _electron.launch({
    args: ['.'],
    env: { NODE_ENV: 'dev' }
  })
  mainPage = await electronApp.firstWindow()
})

test.afterEach(async () => {
  await electronApp.close()
})

// test('Should show chart on initial load', async ({ page }) => {
//   const chart = await page.getByTestId('chart')
//   await expect(chart).toBeVisible()

// })

test('Should create a custom menu', async () => {
  const menu = await electronApp.evaluate(electron => {
    return electron.Menu.getApplicationMenu()
  })

  expect(menu).not.toBeNull();
  expect(menu?.items).toHaveLength(3)
  expect(menu?.items[0].submenu?.items).toHaveLength(1)
  expect(menu?.items[1].submenu?.items).toHaveLength(3)
  expect(menu?.items[1].label).toBe("View")
})