import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  addDoc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  getDocFromServer
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// Test Firestore Connection
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test_connection', 'ping'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Please check your Firebase configuration or network status.");
    }
  }
}
testConnection();

// Operation Types for error tracing
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

// Error Handler conformant with guidelines
export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
      isAnonymous: auth.currentUser?.isAnonymous || null,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// --- Real-time Synchronized Collection Helpers ---

/**
 * Syncs appointments database to/from Firestore or localStorage.
 */
export const syncAppointmentsRealtime = (
  filters: { userId?: string; doctorEmail?: string } | null,
  onUpdate: (appointments: any[]) => void
) => {
  const collRef = collection(db, 'appointments');
  let q = query(collRef, orderBy('createdAt', 'desc'));

  if (filters?.userId) {
    q = query(collRef, where('userId', '==', filters.userId), orderBy('createdAt', 'desc'));
  } else if (filters?.doctorEmail) {
    q = query(collRef, where('doctorEmail', '==', filters.doctorEmail), orderBy('createdAt', 'desc'));
  }

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const appointments: any[] = [];
      snapshot.forEach((docSnap) => {
        appointments.push({ id: docSnap.id, ...docSnap.data() });
      });
      onUpdate(appointments);
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, 'appointments');
    }
  );

  return unsubscribe;
};

/**
 * Creates/Adds a new appointment to Firestore
 */
export const createAppointmentRealtime = async (appointmentData: any) => {
  const path = 'appointments';
  try {
    const collRef = collection(db, path);
    const docId = appointmentData.id || `apt_${Math.random().toString(36).substring(2, 11)}`;
    const docRef = doc(collRef, docId);
    
    const dataToSave = {
      ...appointmentData,
      id: docId,
      status: appointmentData.status || 'Pending',
      createdAt: appointmentData.createdAt || Date.now(),
      notes: appointmentData.notes || '',
      prescriptionUrl: appointmentData.prescriptionUrl || '',
    };
    
    await setDoc(docRef, dataToSave);
    return dataToSave;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
};

/**
 * Updates an appointment in Firestore
 */
export const updateAppointmentRealtime = async (id: string, updatedFields: any) => {
  const path = `appointments/${id}`;
  try {
    const docRef = doc(db, 'appointments', id);
    await updateDoc(docRef, {
      ...updatedFields,
      updatedAt: Date.now()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
};

/**
 * Real-time active medications/prescriptions sync for a patient
 */
export const syncMedicationsRealtime = (
  patientEmail: string,
  onUpdate: (meds: any[]) => void
) => {
  const path = 'medications';
  const collRef = collection(db, path);
  const q = query(collRef, where('patientEmail', '==', patientEmail));

  return onSnapshot(
    q,
    (snapshot) => {
      const meds: any[] = [];
      snapshot.forEach((docSnap) => {
        meds.push({ id: docSnap.id, ...docSnap.data() });
      });
      onUpdate(meds);
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
};

/**
 * Creates a medication prescription/refill item
 */
export const createMedicationRealtime = async (medData: any) => {
  const path = 'medications';
  try {
    const collRef = collection(db, path);
    const docId = medData.id || `med_${Math.random().toString(36).substring(2, 11)}`;
    const docRef = doc(collRef, docId);
    const dataToSave = {
      ...medData,
      id: docId,
      createdAt: medData.createdAt || Date.now()
    };
    await setDoc(docRef, dataToSave);
    return dataToSave;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
};

/**
 * Syncs real-time chat between two users in a dedicated room/collection
 */
export const syncChatRealtime = (
  user1: string,
  user2: string,
  onUpdate: (messages: any[]) => void
) => {
  const path = 'messages';
  const collRef = collection(db, path);
  // Real-time chat uses combination queries. To avoid index requirements, we can fetch all where 'participants' contains user1
  // and filter locally, OR query with an OR condition if Firestore supported it, or query and combine, or just fetch the filtered conversation.
  // A clean schema for scaling chat is storing message in a subcollection, or query on participant arrays.
  // Since we want raw real-time chat messages between two people:
  const q = query(
    collRef,
    orderBy('timestamp', 'asc')
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const messages: any[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (
          (data.from === user1 && data.to === user2) ||
          (data.from === user2 && data.to === user1)
        ) {
          messages.push({ id: docSnap.id, ...data });
        }
      });
      onUpdate(messages);
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
};

export const sendChatMessageRealtime = async (msgData: {
  from: string;
  fromName: string;
  to: string;
  message: string;
  timestamp: string;
}) => {
  const path = 'messages';
  try {
    const collRef = collection(db, path);
    const docRef = await addDoc(collRef, msgData);
    return { id: docRef.id, ...msgData };
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
};
