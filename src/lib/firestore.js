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

export async function fetchUserOrders(userId) {
  const q = query(collection(db, "orders"), where("userId", "==", userId));
  const snap = await getDocs(q);
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

// ─── CART (per-user in Firestore) ──────────────────
export async function fetchUserCart(userId) {
  const snap = await getDoc(doc(db, "carts", userId));
  if (snap.exists()) return snap.data().items || [];
  return [];
}

export async function saveUserCart(userId, items) {
  await setDoc(doc(db, "carts", userId), { items, updatedAt: new Date().toISOString() });
}

// ─── WISHLIST (per-user in Firestore) ──────────────
export async function fetchUserWishlist(userId) {
  const snap = await getDoc(doc(db, "wishlists", userId));
  if (snap.exists()) return snap.data().items || [];
  return [];
}

export async function saveUserWishlist(userId, items) {
  await setDoc(doc(db, "wishlists", userId), { items, updatedAt: new Date().toISOString() });
}

// ─── RECENTLY VIEWED (per-user in Firestore) ───────
export async function fetchUserRecentlyViewed(userId) {
  const snap = await getDoc(doc(db, "recentlyViewed", userId));
  if (snap.exists()) return snap.data().items || [];
  return [];
}

export async function saveUserRecentlyViewed(userId, items) {
  await setDoc(doc(db, "recentlyViewed", userId), { items, updatedAt: new Date().toISOString() });
}

// ─── NEWSLETTER ────────────────────────────────────
export async function saveNewsletterSubscription(email) {
  const q = query(collection(db, "newsletter"), where("email", "==", email));
  const snap = await getDocs(q);
  if (!snap.empty) return { exists: true };
  const ref = await addDoc(collection(db, "newsletter"), {
    email,
    subscribedAt: new Date().toISOString(),
    active: true,
  });
  return { id: ref.id };
}

// ─── REWARDS ───────────────────────────────────────
export async function fetchUserRewards(userId) {
  const snap = await getDoc(doc(db, "rewards", userId));
  if (snap.exists()) return snap.data();
  // Initialize rewards for new user
  const initial = {
    points: 0,
    tier: "Member",
    history: [],
    createdAt: new Date().toISOString(),
  };
  await setDoc(doc(db, "rewards", userId), initial);
  return initial;
}

export async function addRewardsPoints(userId, points, description) {
  const current = await fetchUserRewards(userId);
  const entry = {
    points,
    description,
    date: new Date().toISOString(),
    type: points > 0 ? "earned" : "redeemed",
  };
  const newTotal = Math.max(0, (current.points || 0) + points);
  // Tier calculation: Member < 500, Silver 500-1499, Gold 1500-2999, Platinum 3000+
  let tier = "Member";
  const lifetimeEarned = (current.history || [])
    .filter(h => h.type === "earned")
    .reduce((s, h) => s + h.points, 0) + (points > 0 ? points : 0);
  if (lifetimeEarned >= 3000) tier = "Platinum";
  else if (lifetimeEarned >= 1500) tier = "Gold";
  else if (lifetimeEarned >= 500) tier = "Silver";

  await setDoc(doc(db, "rewards", userId), {
    points: newTotal,
    tier,
    history: [...(current.history || []), entry],
    updatedAt: new Date().toISOString(),
    createdAt: current.createdAt || new Date().toISOString(),
  });
  return { points: newTotal, tier };
}

export async function redeemRewardsPoints(userId, points, description) {
  return addRewardsPoints(userId, -points, description || "Points redeemed");
}

// ─── SITE OFFERS (announcement bar) ───────────────
export async function fetchSiteOffers() {
  const snap = await getDocs(collection(db, "siteOffers"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function addSiteOffer(offer) {
  const ref = await addDoc(collection(db, "siteOffers"), offer);
  return { id: ref.id, ...offer };
}

export async function updateSiteOffer(id, updates) {
  await updateDoc(doc(db, "siteOffers", id), updates);
}

export async function deleteSiteOffer(id) {
  await deleteDoc(doc(db, "siteOffers", id));
}
