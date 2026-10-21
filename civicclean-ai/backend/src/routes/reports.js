import express from 'express';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// In-Memory Storage for Demo Data
let reports = [
  {
    id: "1",
    title: "Illegal Garbage Dump",
    description: "Accumulated plastic and organic waste near main gate",
    location: "Zone 3 - Ward 12",
    status: "Pending",
    source: "cctv_ai",
    confidenceScore: 0.92,
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    title: "Public Littering Detected",
    description: "Plastic bottles thrown on sidewalk",
    location: "Market Area Cam 2",
    status: "Resolved",
    source: "cctv_ai",
    confidenceScore: 0.88,
    createdAt: new Date().toISOString()
  }
];

// GET /api/reports
router.get('/', (req, res) => {
  res.json(reports);
});

// POST /api/reports
router.post('/', upload.single('image'), (req, res) => {
  const newReport = {
    id: String(reports.length + 1),
    title: req.body.title || 'Civic Issue Report',
    description: req.body.description || '',
    location: req.body.location || 'Unknown Location',
    status: 'Pending',
    source: req.body.source || 'citizen',
    confidenceScore: req.body.confidenceScore ? parseFloat(req.body.confidenceScore) : 0,
    imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
    createdAt: new Date().toISOString()
  };

  reports.unshift(newReport); // Add to top of list
  res.status(201).json(newReport);
});

// PATCH /api/reports/:id/status
router.patch('/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const report = reports.find(r => r.id === id);
  if (report) {
    report.status = status;
    return res.json(report);
  }
  res.status(404).json({ error: "Report not found" });
});

export default router;