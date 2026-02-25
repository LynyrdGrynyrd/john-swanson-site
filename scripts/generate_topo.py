import os
import requests
import numpy as np
import matplotlib.pyplot as plt
import tifffile
from io import BytesIO

def fetch_elevation_data(min_lon, min_lat, max_lon, max_lat):
    print(f"Fetching elevation data for bbox: {min_lon}, {min_lat}, {max_lon}, {max_lat}...")
    
    # USGS 3DEP WCS endpoint
    url = "https://elevation.nationalmap.gov/arcgis/services/3DEPElevation/ImageServer/WCSServer"
    
    # 1/3 arc-second resolution (~10 meters)
    res = 0.000092592592593
    
    params = {
        "request": "GetCoverage",
        "service": "WCS",
        "version": "1.0.0",
        "coverage": "3DEPElevation",
        "bbox": f"{min_lon},{min_lat},{max_lon},{max_lat}",
        "crs": "EPSG:4326",
        "format": "GeoTIFF",
        "resx": res,
        "resy": res
    }
    
    response = requests.get(url, params=params)
    response.raise_for_status()
    
    print("Data fetched successfully.")
    return response.content

def generate_topo_svg(tiff_data, output_path):
    print("Processing GeoTIFF data...")
    
    # Read the GeoTIFF data from memory
    with tifffile.TiffFile(BytesIO(tiff_data)) as tif:
        elevation = tif.asarray()
    
    # The elevation data might have nodata values (e.g., -32768 or very large negative numbers)
    # We can mask them out or set them to the minimum valid elevation
    valid_mask = elevation > -10000
    if not np.any(valid_mask):
        raise ValueError("No valid elevation data found in the requested area.")
    
    min_elev = np.min(elevation[valid_mask])
    elevation[~valid_mask] = min_elev
    
    # Create a grid for plotting
    height, width = elevation.shape
    x = np.linspace(0, width, width)
    y = np.linspace(0, height, height)
    X, Y = np.meshgrid(x, y)
    
    print("Generating contour lines...")
    
    # Create the plot
    # Adjust figsize to match the aspect ratio of the bounding box
    # bbox: width = 0.05 degrees, height = 0.04 degrees
    # aspect ratio = width / height = 1.25
    fig, ax = plt.subplots(figsize=(10, 8))
    
    # Turn off axis
    ax.axis('off')
    
    # Generate contours
    # Determine contour levels based on min and max elevation
    max_elev = np.max(elevation)
    
    # Create contour levels every 5 meters (adjust as needed for density)
    levels = np.arange(np.floor(min_elev), np.ceil(max_elev), 5)
    
    # Plot contours
    # We use a single color (e.g., white or black) with a thin linewidth
    cs = ax.contour(X, Y, elevation, levels=levels, colors='black', linewidths=0.5)
    
    # Save to SVG
    print(f"Saving SVG to {output_path}...")
    
    # Ensure the directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    plt.savefig(output_path, format='svg', bbox_inches='tight', pad_inches=0, transparent=True)
    plt.close()
    
    print(f"Successfully generated {output_path}")

if __name__ == "__main__":
    # Rocky River Reservation, Cleveland, Ohio
    # Approx bounding box
    min_lon = -81.85
    min_lat = 41.38
    max_lon = -81.80
    max_lat = 41.42
    
    output_file = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'public', 'topo.svg')
    
    try:
        tiff_data = fetch_elevation_data(min_lon, min_lat, max_lon, max_lat)
        generate_topo_svg(tiff_data, output_file)
    except Exception as e:
        print(f"Error: {e}")
