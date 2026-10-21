import cv2
import requests
import time
from ultralytics import YOLO

# 1. Load your fine-tuned YOLO model
model = YOLO('yolov8n.pt')  # Replace with path to your fine-tuned weights (e.g., 'best.pt')

# 2. RTSP Camera Stream or Video File
RTSP_URL = "rtsp://admin:password@192.168.1.100:554/stream1"  # Or use a local video: "test_cctv.mp4"
BACKEND_API = "http://localhost:5000/api/reports"

cap = cv2.VideoCapture(RTSP_URL)
last_alert_time = 0
COOLDOWN_SECONDS = 10  # Prevent flooding backend with 30 alerts per second

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    # Run YOLO detection on frame
    results = model(frame, conf=0.6)

    # Check if any litter items were detected in current frame
    if len(results[0].boxes) > 0:
        current_time = time.time()

        # Send alert if cooldown period has passed
        if current_time - last_alert_time > COOLDOWN_SECONDS:
            confidence = float(results[0].boxes.conf[0])

            # HERE IS YOUR PAYLOAD & POST REQUEST
            payload = {
                "title": "Automated CCTV Litter Detection",
                "location": "Camera 01 - Main Gate",
                "source": "cctv_ai",
                "confidenceScore": round(confidence, 2),
                "description": "Plastic waste detected on walkway via RTSP feed"
            }

            try:
                response = requests.post(BACKEND_API, json=payload)
                if response.status_code == 201:
                    print("Alert sent successfully to Express backend!")
            except Exception as e:
                print("Error connecting to backend:", e)

            last_alert_time = current_time

cap.release()