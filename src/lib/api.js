const DEFAULT_TIMEOUT = (() => {
  const v = parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT_MS || '', 10);
  return Number.isFinite(v) && v > 0 ? v : 90000; // default 90s
})();

export async function generateCoverLetterAPI({ resumeFile, jobRequirements, timeoutMs = DEFAULT_TIMEOUT }) {
  const base = process.env.NEXT_PUBLIC_API_BASE || 'https://web-production-55202.up.railway.app';
  const cleanBase = base.replace(/\/$/, '');
  const primaryPath = '/generate_coverletter';
  const fallbackPath = '/generate'; // legacy / earlier expectation

  const buildFormData = () => {
    const fd = new FormData();
    if (resumeFile) fd.append('resume', resumeFile);
    // Backend expects job_description (not job_requirements)
    if (jobRequirements) fd.append('job_description', jobRequirements);
    return fd;
  };

  const attempt = async (path) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    let res;
    try {
      res = await fetch(`${cleanBase}${path}`, { method: 'POST', body: buildFormData(), signal: controller.signal });
    } catch (err) {
      clearTimeout(timer);
      if (err.name === 'AbortError') throw new Error('Request timed out. Server not reachable.');
      throw new Error('Network/CORS error: Failed to reach API. Verify CORS and server status.');
    }
    clearTimeout(timer);
    return res;
  };

  let res = await attempt(primaryPath);
  if (res.status === 404) {
    // Try fallback endpoint naming
    res = await attempt(fallbackPath);
  }

  if (!res.ok) {
    // Try extract JSON error first
    let bodyText = '';
    try { bodyText = await res.text(); } catch { /* ignore */ }
    throw new Error(`API ${res.status}: ${bodyText || res.statusText}`);
  }
  try {
    return await res.json();
  } catch {
    throw new Error('Invalid JSON response from API.');
  }
}

export async function pingAPI(baseOverride) {
  const base = (baseOverride || process.env.NEXT_PUBLIC_API_BASE || 'https://web-production-55202.up.railway.app').replace(/\/$/, '');
  try {
    const res = await fetch(base, { method: 'GET' });
    return { ok: res.ok, status: res.status };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}
