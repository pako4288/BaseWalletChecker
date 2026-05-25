const ETH_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;

export function isValidEthAddress(address: string): boolean {
  return ETH_ADDRESS_REGEX.test(address.trim());
}

export function normalizeAddress(address: string): string {
  return address.trim().toLowerCase();
}

export function getAddressError(address: string): string | null {
  const trimmed = address.trim();
  if (!trimmed) return 'Enter a wallet address';
  if (!trimmed.startsWith('0x')) return 'Address must start with 0x';
  if (trimmed.length !== 42) return 'Address must be 42 characters (0x + 40 hex)';
  if (!isValidEthAddress(trimmed)) return 'Invalid address format';
  return null;
}
