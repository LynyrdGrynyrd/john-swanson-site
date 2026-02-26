from playwright.sync_api import sync_playwright
import time

def verify_data_extraction():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Wait for server to be ready
        max_retries = 10
        for i in range(max_retries):
            try:
                page.goto("http://localhost:5173", timeout=3000)
                break
            except:
                time.sleep(1)
                if i == max_retries - 1:
                    print("Failed to connect to localhost:5173")
                    return

        # Wait for content to load
        page.wait_for_selector("h1")

        # Verify Navigation Links (loaded from data.js)
        nav_links = ["About", "Philosophy", "Experience", "Impact", "Digital R&D", "Publications", "Contact"]
        for link in nav_links:
            # Check desktop nav
            assert page.locator(f".nav-links-desktop button:has-text('{link}')").is_visible()

        # Verify Philosophy Items (loaded from data.js)
        # Scroll to philosophy section
        page.locator("#philosophy").scroll_into_view_if_needed()
        assert page.locator("text=Leave it better than you found it").is_visible()

        # Verify Footer (loaded from data.js)
        footer = page.locator("footer")
        footer.scroll_into_view_if_needed()

        # Verify text content
        # Note: The middot might be represented differently in text content depending on browser rendering,
        # but we check for "John P. Swanson" and "Lakewood, Ohio"
        assert "John P. Swanson" in footer.inner_text()
        assert "Lakewood, Ohio" in footer.inner_text()
        assert "This site was designed in conversation with Claude" in footer.inner_text()

        # Take screenshot of the footer
        page.screenshot(path="verification/verification.png")
        print("Verification successful, screenshot saved to verification/verification.png")

        browser.close()

if __name__ == "__main__":
    verify_data_extraction()
