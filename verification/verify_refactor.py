from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context(viewport={"width": 1280, "height": 800})
    page = context.new_page()

    try:
        page.goto("http://localhost:5173/")

        # Wait for load
        page.wait_for_load_state("networkidle")

        # Verify Theme Toggle
        theme_toggle = page.get_by_label("Toggle hybridization theme")
        if theme_toggle.is_visible():
            print("Theme Toggle is visible.")
        else:
            print("Theme Toggle is NOT visible.")

        # Take screenshot of the top
        page.screenshot(path="verification/top_screenshot.png")

        # Scroll to bottom
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")

        # Wait for scrolling to finish or for footer to be visible
        page.wait_for_timeout(2000)

        # Verify Footer
        footer = page.locator("footer")
        if footer.is_visible():
            print("Footer is visible.")
        else:
            print("Footer is NOT visible.")

        # Verify Back To Top
        # Back to top button appears after scrolling
        back_to_top = page.get_by_label("Back to top")
        if back_to_top.is_visible():
            print("Back To Top is visible.")
        else:
            print("Back To Top is NOT visible.")

        # Take screenshot of the bottom
        page.screenshot(path="verification/bottom_screenshot.png")

    except Exception as e:
        print(f"Error: {e}")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
