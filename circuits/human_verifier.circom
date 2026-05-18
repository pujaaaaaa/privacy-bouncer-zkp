# 1. Compile the circuit you wrote earlier to WebAssembly
circom circuits/human_verifier.circom --wasm --r1cs -o circuits/

# 2. Start the "Trusted Setup" (Downloads the mathematical curve)
npx snarkjs powersoftau new bn128 12 pot12_0000.ptau -v
npx snarkjs powersoftau contribute pot12_0000.ptau pot12_0001.ptau --name="First contribution" -v

# 3. Generate the Proving Key (.zkey) for the frontend
npx snarkjs groth16 setup circuits/human_verifier.r1cs pot12_0001.ptau circuit_final.zkey

# 4. Export the Verification Key (.json) for your backend
npx snarkjs zkey export verificationkey circuit_final.zkey verification_key.json
