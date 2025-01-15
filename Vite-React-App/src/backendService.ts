export async function fetchHashedKey(): Promise<string> {
    // Simulate fetching the hashed key (replace with real backend logic)
    const simulatedHashedKey = await new Promise<string>((resolve) => {
      setTimeout(() => resolve('$2a$10$examplehashedkey1234567890'), 1000);
    });
    return simulatedHashedKey;
  }
  