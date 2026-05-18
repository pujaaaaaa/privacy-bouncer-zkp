pragma circom 2.0.0;

template HumanVerifier() {
    // 1. The Private Data (This stays on the user's phone, NEVER sent to the server)
    signal input privateEnclaveKey; 
    
    // 2. The Public Data (The random "challenge" sent by your server to prevent replay attacks)
    signal input publicChallenge;   
    
    // 3. The Output (The mathematical proof result)
    signal output proofHash;              

    // 4. The Core Logic: We mathematically bind the secret key to the server's challenge.
    // (For this MVP, we use simple multiplication. In production, this would be a SHA256 or MiMC hash).
    proofHash <== privateEnclaveKey * publicChallenge;
}

// We explicitly tell the system that ONLY the challenge is public.
// The privateEnclaveKey remains mathematically hidden.
component main {public [publicChallenge]} = HumanVerifier();
