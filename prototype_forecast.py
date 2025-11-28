import urllib.request
import json
import sys

def calculate_tick_risk(temp_f, humidity_percent, base_risk_multiplier=1.0):
    """
    Calculates the Tick Activity Index (0-10) based on temperature and humidity.
    """
    risk_score = 0
    
    print(f"Calculating risk for: Temp={temp_f}F, Humidity={humidity_percent}%")

    # Temperature Factor (0-5 points)
    if 45 <= temp_f <= 85:
        risk_score += 5  # Optimal questing temp
        print("  +5 Temperature is optimal (45-85F)")
    elif 35 <= temp_f < 45 or 85 < temp_f <= 95:
        risk_score += 2  # Sub-optimal but possible
        print("  +2 Temperature is sub-optimal (35-45F or 85-95F)")
    else:
        risk_score += 0  # Dormant/Hiding
        print("  +0 Temperature is extreme (<35F or >95F)")

    # Humidity Factor (0-5 points)
    if humidity_percent >= 85:
        risk_score += 5  # Ideal hydration
        print("  +5 Humidity is ideal (>=85%)")
    elif 60 <= humidity_percent < 85:
        risk_score += 3
        print("  +3 Humidity is moderate (60-84%)")
    elif 45 <= humidity_percent < 60:
        risk_score += 1
        print("  +1 Humidity is low (45-59%)")
    else:
        risk_score = 0   # Too dry, ticks retreat (Override)
        print("  OVERRIDE: Humidity is too low (<45%). Risk set to 0.")
        return 0

    # Final Calculation
    total_risk = risk_score * base_risk_multiplier
    final_score = min(10, total_risk)
    print(f"  Base Score: {risk_score}, Multiplier: {base_risk_multiplier}, Final Score: {final_score}")
    return final_score

def get_json(url):
    headers = {
        'User-Agent': '(tick-forecast-app-prototype, contact@example.com)',
        'Accept': 'application/json'
    }
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            return json.loads(response.read().decode())
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

def get_weather_forecast(latitude, longitude):
    """
    Fetches weather data from NWS API using urllib.
    """
    # 1. Get grid points
    points_url = f"https://api.weather.gov/points/{latitude},{longitude}"
    print(f"Fetching grid points from: {points_url}")
    
    data = get_json(points_url)
    if not data:
        return None
        
    forecast_url = data['properties']['forecastHourly']

    # 2. Get hourly forecast
    print(f"Fetching forecast from: {forecast_url}")
    forecast_data = get_json(forecast_url)
    if not forecast_data:
        return None
        
    return forecast_data['properties']['periods'][0] # Return current hour

def main():
    # Example: Central Park, NY
    lat = 40.7829
    lon = -73.9654
    
    print(f"--- Tick Forecast Prototype ---")
    print(f"Location: {lat}, {lon}")
    
    current_weather = get_weather_forecast(lat, lon)
    
    if current_weather:
        temp_f = current_weather['temperature']
        humidity = current_weather['relativeHumidity']['value']
        short_forecast = current_weather['shortForecast']
        
        print(f"\nCurrent Weather: {short_forecast}")
        print(f"Temp: {temp_f}F")
        print(f"Humidity: {humidity}%")
        
        risk = calculate_tick_risk(temp_f, humidity)
        
        print(f"\nTick Activity Index: {risk}/10")
        
        if risk < 3:
            print("Status: LOW RISK 🟢")
        elif risk < 7:
            print("Status: MODERATE RISK 🟡")
        else:
            print("Status: HIGH RISK 🔴")
    else:
        print("Failed to get weather data.")

if __name__ == "__main__":
    main()
