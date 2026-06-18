
export interface CMSContent {
  section: string;
  data: any;
}

// Keep a local in-memory cache/sync trigger
const CMS_STORAGE_KEY = 'medicare_cms_data';

const getStorage = () => {
  const stored = localStorage.getItem(CMS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
};

const updateStorage = (section: string, data: any) => {
  const current = getStorage();
  current[section] = data;
  localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(current));
  window.dispatchEvent(new Event('storage'));
};

export const subscribeToCMS = (section: string, callback: (data: any) => void) => {
  // 1. Check local storage first for speed
  const current = getStorage();
  if (current[section]) {
    callback(current[section]);
  }

  // 2. Query from backend database for real-time accuracy and server synchronization
  fetch(`/api/cms/${section}`)
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error('CMS API offline');
    })
    .catch(() => current[section]) // fallback to local cache
    .then((data) => {
      if (data) {
        callback(data);
        updateStorage(section, data);
      }
    });

  const handler = () => {
    const fresh = getStorage();
    if (fresh[section]) {
      callback(fresh[section]);
    }
  };

  // Keep responsive triggers alive for tab interactions
  window.addEventListener('storage', handler);
  return () => window.removeEventListener('storage', handler);
};

export const updateCMS = async (section: string, data: any) => {
  // Update local storage instantly for snappy UX
  updateStorage(section, data);

  // Send over API connection to store in persistent backend JSON file
  try {
    await fetch(`/api/cms/${section}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.error('Failed to update backend CMS:', err);
  }
};

export const seedCMS = async () => {
  const existing = localStorage.getItem(CMS_STORAGE_KEY);
  
  // Seed the backend and local structures
  try {
    const res = await fetch('/api/cms');
    if (res.ok) {
      const serverCMS = await res.json();
      localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(serverCMS));
      return;
    }
  } catch (err) {
    console.warn('Backend CMS seeding check offline, falling back only to local setup.');
  }

  if (existing) return;

  const sections = {
    hero: {
      heroTitle: 'Your Health, Our Priority.',
      heroSubtitle: 'Access world-class healthcare from the comfort of your home. Connect with certified specialists in minutes.',
      ctaText: 'Start Consultation'
    },
    testimonials: [
      { id: 1, name: 'Sarah Jenkins', content: 'The booking process was incredibly smooth. I found a top specialist and scheduled a call within minutes. Life-changing!', rating: 5, role: 'Patient' },
      { id: 2, name: 'Dr. Michael Chen', content: 'As a doctor, this platform helps me manage my patients efficiently. The interface is intuitive and professional.', rating: 5, role: 'Specialist' },
      { id: 3, name: 'Robert Miller', content: 'Finally, a medical app that actually works. The secure payment and verified doctor tags give me total confidence.', rating: 4, role: 'Patient' }
    ],
    faq: [
      { id: 1, question: 'How do I book an appointment?', answer: 'Simply search for a doctor and click Book.' },
      { id: 2, question: 'Is it covered by insurance?', answer: 'We accept most major insurance providers.' }
    ],
    services: [
      { id: 1, title: '24/7 Virtual Care', description: 'Immediate access to doctors anytime, anywhere.', icon: 'Zap' },
      { id: 2, title: 'Specialist Consultation', description: 'Expert advice for complex health conditions.', icon: 'Stethoscope' }
    ]
  };

  localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(sections));
};
