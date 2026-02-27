import Temple from "../model/temple.model.js";

export async function listTemples(_req, res) {
  try {
    const results = await Temple.find().lean();
    return res.json(results);
  } catch (e) {
    return res.status(500).json({ error: "Failed to fetch temples", detail: e.message });
  }
}

export async function addTemple(req, res) {
  const { name, location, image, description } = req.body || {};
  if (!name || !location || !image) return res.status(400).json({ error: "Missing fields" });
  try {
    const t = await Temple.create({ name, location, image, description: description || "" });
    return res.status(201).json(t);
  } catch (e) {
    return res.status(500).json({ error: "Failed to add temple", detail: e.message });
  }
}

export async function updateTemple(req, res) {
  const { id } = req.params;
  try {
    const t = await Temple.findByIdAndUpdate(id, req.body, { new: true });
    if (!t) return res.status(404).json({ error: "Not found" });
    return res.json(t);
  } catch (e) {
    return res.status(500).json({ error: "Failed to update temple", detail: e.message });
  }
}

export async function deleteTemple(req, res) {
  const { id } = req.params;
  try {
    const r = await Temple.findByIdAndDelete(id);
    if (!r) return res.status(404).json({ error: "Not found" });
    return res.json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: "Failed to delete temple", detail: e.message });
  }
}

