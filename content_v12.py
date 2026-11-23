# v12 (23 Nov 2026): chairman name spelling as requested by IBT management,
# documentaries page, Q&A video series, richer activity and about pages.
def _fixname(o):
    if isinstance(o, dict): return {k: _fixname(v) for k, v in o.items()}
    if isinstance(o, list): return [_fixname(v) for v in o]
    if isinstance(o, str):
        o = o.replace("Manzur-e-Elahi", "Monzur-E-Elahi").replace("Manzur-E-Elahi", "Monzur-E-Elahi")
        o = o.replace("প্রফেসর ড. মোহাম্মদ মানজুরে ইলাহী", "ড. মোহাম্মদ মানজুরে ইলাহী")
    return o
C = _fixname(C)
U = C["ui"]
C["chairman"]["name"] = T("ড. মোহাম্মদ মানজুরে ইলাহী", "Prof. Dr. Mohammad Monzur-E-Elahi", "الأستاذ الدكتور محمد منظور إلهي")
U["nav_docs"] = T("ডকুমেন্টারি", "Documentaries", "الأفلام الوثائقية")
