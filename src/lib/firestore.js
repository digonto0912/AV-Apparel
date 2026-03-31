import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "./firebase";

// ─── PRODUCTS ──────────────────────────────────────
export async function fetchProducts() {
  const snap = await getDocs(collection(db, "products"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function fetchProductBySlug(slug) {
  const q = query(collection(db, "products"), where("slug", "==", slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() };
}

export async function addProduct(product) {
  const ref = await addDoc(collection(db, "products"), product);
  return { id: ref.id, ...product };
}

export async function updateProduct(id, updates) {
  await updateDoc(doc(db, "products", id), updates);
}

export async function deleteProduct(id) {
  await deleteDoc(doc(db, "products", id));
}

// ─── ORDERS ────────────────────────────────────────
export async function fetchOrders() {
  const snap = await getDocs(collection(db, "orders"));
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
}

export async function createOrder(order) {
  const ref = await addDoc(collection(db, "orders"), order);
  return { id: ref.id, ...order };
}

export async function updateOrderStatus(orderId, status) {
  await updateDoc(doc(db, "orders", orderId), { status });
}

// ─── USERS ─────────────────────────────────────────
export async function fetchUsers() {
  const snap = await getDocs(collection(db, "users"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function updateUserRole(uid, role) {
  await updateDoc(doc(db, "users", uid), { role });
}

export async function disableUser(uid) {
  await updateDoc(doc(db, "users", uid), { disabled: true });
}

export async function enableUser(uid) {
  await updateDoc(doc(db, "users", uid), { disabled: false });
}

// ─── PROMO CODES ───────────────────────────────────
export async function fetchPromoCodes() {
  const snap = await getDocs(collection(db, "promoCodes"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function addPromoCode(promo) {
  const ref = await addDoc(collection(db, "promoCodes"), promo);
  return { id: ref.id, ...promo };
}

export async function updatePromoCode(id, updates) {
  await updateDoc(doc(db, "promoCodes", id), updates);
}

export async function deletePromoCode(id) {
  await deleteDoc(doc(db, "promoCodes", id));
}

// ─── INVENTORY (update stock on product variants) ──
export async function updateProductStock(productId, variants) {
  await updateDoc(doc(db, "products", productId), { variants });
}
