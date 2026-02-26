from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating to http://localhost:5173")
            page.goto("http://localhost:5173")
            page.wait_for_load_state("networkidle")

            print("Scrolling down to About section...")
            page.evaluate("window.scrollTo(0, 1000)")
            time.sleep(2)

            screenshot_path = "verification/verification.png"
            page.screenshot(path=screenshot_path)
            print(f"Screenshot saved to {screenshot_path}")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
