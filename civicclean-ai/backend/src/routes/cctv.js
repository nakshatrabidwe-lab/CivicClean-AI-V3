import express from 'express';
const router = express.Router();

// In-Memory Storage for CCTV Stream Configurations
let cctvStreams = [
  {
    id: "cam-1",
    name: "Main Gate Camera",
    location: "Zone 1 - Main Gate",
    streamUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    status: "Active",
    addedAt: new Date().toISOString()
  }
];

// GET /api/cctv - List all cameras
router.get('/', (req, res) => {
  res.json(cctvStreams);
});

// POST /api/cctv - Connect new CCTV camera via link
router.post('/', (req, res) => {
  const { name, location, streamUrl } = req.body;

  if (!streamUrl) {
    return res.status(400).json({ error: "Camera stream URL is required" });
  }

  const newCamera = {
    id: `cam-${Date.now()}`,
    name: name || `Camera ${cctvStreams.length + 1}`,
    location: location || "General Zone",
    streamUrl: streamUrl,
    status: "Active",
    addedAt: new Date().toISOString()
  };

  cctvStreams.unshift(newCamera);
  res.status(201).json(newCamera);
});

// DELETE /api/cctv/:id - Remove camera stream
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  cctvStreams = cctvStreams.filter(cam => cam.id !== id);
  res.json({ message: "Camera disconnected successfully", id });
});

export default router;