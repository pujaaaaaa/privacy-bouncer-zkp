import express, { Request, Response } from 'express';
import crypto from 'crypto';
import path from 'path';

const app = express();
app.use(express.json());

// Simulated Public Key registry item for a trusted hardware enclave chip
const TRUSTED_PUBLIC_KEY = "MAANG_TRUSTED_ENCLAVE_ROOT_KEY";

// Serve the interactive client dashboard on root access
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// The Cryptographic Gatekeeper Endpoint
app.post('/api/verify-human', (req: Request, res: Response) => {
    const { challenge, proof, trustedKeyIdentifier } = req.body;

    // Fail fast on malformed requests
    if (!challenge || !proof || !trustedKeyIdentifier) {
        return res.status(400).send({ 
            success: false, 
            message: "Protocol Error: Missing cryptographic payloads." 
        });
    }

    const isKeyValid = (trustedKeyIdentifier === TRUSTED_PUBLIC_KEY);
    
    // Server-side cryptographic reconstruction check
    const expectedProof = crypto.createHash('sha256').update(challenge + TRUSTED_PUBLIC_KEY).digest('hex');
    const isProofValid = (proof === expectedProof);

    if (isKeyValid && isProofValid) {
        res.send({ 
            success: true, 
            message: "Cryptographic Proof Validated. Human Verified. Zero PII stored." 
        });
    } else {
        res.status(401).send({ 
            success: false, 
            message: "Security Alert: Cryptographic proof validation failed. Request blocked." 
        });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 MAANG Proof-of-Concept API running on http://localhost:${PORT}`);
});
