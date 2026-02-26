import sys
import os
from unittest.mock import MagicMock

# Add the root directory to sys.path to allow importing from scripts/
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Mock dependencies that are not installed
sys.modules["requests"] = MagicMock()
sys.modules["numpy"] = MagicMock()
sys.modules["matplotlib"] = MagicMock()
sys.modules["matplotlib.pyplot"] = MagicMock()
sys.modules["tifffile"] = MagicMock()

# Now import the function to test
# Note: we import it after mocking the dependencies
from scripts.generate_topo import fetch_elevation_data

import unittest

class TestFetchElevationData(unittest.TestCase):
    def test_fetch_elevation_data_timeout(self):
        # Setup mock
        mock_requests = sys.modules["requests"]
        mock_response = MagicMock()
        mock_requests.get.return_value = mock_response

        # Call the function
        # We wrap it in a try-except because it might fail on response.raise_for_status()
        # or other subsequent calls, which we don't care about for this test.
        try:
            fetch_elevation_data(-81.85, 41.38, -81.80, 41.42)
        except Exception:
            pass

        # Verify requests.get was called
        mock_requests.get.assert_called()

        # Verify timeout was passed correctly
        found_timeout = False
        for call in mock_requests.get.call_args_list:
            args, kwargs = call
            if kwargs.get("timeout") == 30:
                found_timeout = True
                break

        self.assertTrue(found_timeout, "requests.get was called without timeout=30")

if __name__ == "__main__":
    unittest.main()
