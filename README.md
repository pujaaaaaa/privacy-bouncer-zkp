# ⬡ privacy-bouncer-zkp

> **Stateless Identity Attestation Gateway Built on a Simulated Groth16 zk-SNARK Protocol Engine**

---

## 🎯 The Core Problem & High-Stakes Vision
Modern web networks are experiencing an existential crisis: **advanced AI agents and bot farms are outmaneuvering traditional defensive walls (like CAPTCHAs) with ease.** Alternative mitigation layers rely heavily on centralized identity surveillance—forcing users to surrender data vectors like government IDs, facial scans, or biometric tracking.

**privacy-bouncer-zkp** implements a decentralized, privacy-preserving paradigm shift: **Prove human authenticity, hide personal identity.** By leveraging a stateless verification architecture, this protocol allows client networks to run a mathematical check on cryptographic proofs. It instantly confirms that a user request originated from an authentic, hardware-bound human enclave without acquiring, tracking, or caching a single byte of Personally Identifiable Information (PII).

---

## ⚙️ Mathematical Protocol & Cryptographic Flow

The platform utilizes a zero-knowledge challenge-response model mimicking an elliptic-curve pairing architecture:

[ Client Enclave / WASM Circuit ]                          [ Stateless Verifier Node (Express) ]
│                                                            │
│ 1. Compile Circuit (age_verifier.wasm)                     │
├───────────────────────────────────────┐                    │
│                                       │                    │
│ 2. Compute Witness (Find Poly Roots)  │                    │
│<──────────────────────────────────────┘                    │
│                                                            │
│ 3. Generate Elliptic Curve Points                          │
│    [ πA, πB, πC ] via Groth16 Prover                       │
│                                                            │
│ 4. Transmit Proof Payload & Public Signals (POST)          │
├───────────────────────────────────────────────────────────>│
│                                                            │
│                               5. Execute Pairing Check     │
│                                  e(πA, πB) == e(πC, G)...  │
│                                                            │
│ 6. Return 200 OK Authenticated / 401 Block                 │
│<───────────────────────────────────────────────────────────┤


1. **WASM Circuit Computation:** The client dashboard acts as the local device hardware, simulating the compilation of a circuit file (`age_verifier.wasm`) and calculating the mathematical witness.
2. **Groth16 Proof Generation:** The client compiles a valid `snarkProof` containing real polynomial coordinate arrays representing points on an elliptic curve ($\pi_A$, $\pi_B$, $\pi_C$) over the **bn128** curve configuration.
3. **Stateless Biliptic Pairing Check:** The TypeScript/Express backend stands as an immutable Verifier. It maps the incoming parameters directly against a trusted setup `VERIFICATION_KEY`. If the pairing evaluation matches, it guarantees the validity of the proof deterministically.

---

## 🛠️ Deep Technical Stack
- **Backend Runtime Infrastructure:** Node.js, Express, TypeScript (`ts-node`)
- **ZK Protocol Standard:** Groth16 (Simulated zk-SNARK cryptographic pipeline)
- **Mathematical Curve Setting:** `bn128` Elliptic Curve parameters
- **User Interface Interface:** HTML5 Semantic Engine, CSS3 Variables, Asynchronous JavaScript Engine (Promises & WebAssembly Simulation Loops)

---

## 🔧 Installation & Local Deployment

```bash
# 1. Clone the repository
git clone [https://github.com/pujaaaaaa/privacy-bouncer-zkp.git](https://github.com/pujaaaaaa/privacy-bouncer-zkp.git)

# 2. Navigate to project root
cd privacy-bouncer-zkp

# 3. Clean install production and type-safety packages
npm install

# 4. Fire up the Verifier Engine
npx ts-node server.ts
